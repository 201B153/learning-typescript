// OOPs apraoch for making form visble as templates don't show html until rendered by js
// Drag & drop projects
interface Draggable {
  dragStartHamdler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

// Project Types
// This is to make all project types autocomplete and be vary of error
enum ProjectStatus {
  Active,
  Finished,
}
class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

// Project Management Class

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    // Other way
    // const newProject = {
    //   id: Math.random().toString(),
    //   title: title,
    //   description: description,
    //   people: numOfPeople,
    // };
    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

// const projectState = new ProjectState();
// Or we can use private constructor
const projectState = ProjectState.getInstance();

// validtaion
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === 'string'
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === 'string'
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === 'number'
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === 'number'
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}

// AutoBind Decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjustedDescriptor;
}

// Main Class for Main Componenets
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hosteElementId: string,
    insetAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hosteElementId)! as T;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach(insetAtStart);
  }
  private attach(insertAtBegining: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBegining ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
  // we can make configure as optional method
  abstract configure(): void;
  abstract renderContent(): void;
}

// project Item Class
class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  // getters check no. of emebers assigned
  get members() {
    if (this.project.people === 1) {
      return '1 member';
    } else {
      return `${this.project.people} memebers`;
    }
  }

  constructor(hostID: string, project: Project) {
    super('single-project', hostID, false, project.id);
    this.project = project;

    this.configure();
    this, this.renderContent();
  }
  @autobind
  dragStartHamdler(event: DragEvent) {
    console.log(event);
    event.dataTransfer!.setData('text/plain', this.project.id);
    // telling that data is moved
    event.dataTransfer!.effectAllowed = 'move';
  }
  @autobind
  dragEndHandler(_: DragEvent) {
    console.log('DragEnd');
  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHamdler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }
  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.members + ' assigned';
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}

// ProjectList Class
class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }
  @autobind
  dragLeaveHandler(event: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }
  @autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      // default is to not allow dropping in JS
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }
  @autobind
  dropHandler(event: DragEvent) {
    console.log(event.dataTransfer!.getData('text/plain'));
    const prjId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(
      prjId,
      this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  configure() {
    //eventListeners
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('drop', this.dropHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = '';
    // for (const prjItem of this.assignedProjects) {
    //   const listItem = document.createElement('li');
    //   listItem.textContent = prjItem.title;
    //   listEl.appendChild(listItem);
    // }
    // Other Way
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
    }
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS';
  }
}

// Main class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElemnt: HTMLInputElement;
  descriptionInputElemnt: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    // To call constructor of base class
    super('project-input', 'app', true, 'user-input');

    // const templateEl = document.getElementById('project-input');
    // if (templateEl) {
    //     this.templateElement = templateEl;
    // }
    // OR just put ! at end
    // this.templateElement = document.getElementById(
    //   'project-input'
    // )! as HTMLTemplateElement;
    // this.hostElement = document.getElementById('app')! as HTMLDivElement;

    // Here we render template tag
    // importNode() is used to import content of HTML tags in ts globally
    // true is for all nesting inside the content of following tag possible
    // const importNode = document.importNode(this.templateElement.content, true);
    // this.element = importNode.firstElementChild as HTMLFormElement;
    // Direct interaction with element using ids
    // this.element.id = 'user-input';

    // input description
    this.titleInputElemnt = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElemnt = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;

    this.configure();
  }

  renderContent(): void {}
  configure() {
    this.element.addEventListener('submit', this.submitHandler);
    // this.element.addEventListener('submit', this.submitHandler.bind(this));
    // To make submitHandler work we can use bind() on it to make it refer to the class OR use autobind decorator
  }

  // telling ts that insidde the userInput there are three variable two are string and one is number
  private gatherUserInput(): [string, string, number] | void {
    const enetredTitle = this.titleInputElemnt.value;
    const enetredDescription = this.descriptionInputElemnt.value;
    const enetredPeaople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enetredTitle,
      required: true,
    };
    const descriptionValidatble: Validatable = {
      value: enetredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: +enetredPeaople,
      required: true,
      min: 1,
      max: 5,
    };

    // validation using validation method
    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatble) ||
      !validate(peopleValidatable)
    ) {
      alert('Invalid Input');
      return;
    } else {
      return [enetredTitle, enetredDescription, +enetredPeaople];
    }
    // This Validation is insufficient so use validation method
    // if (
    //   enetredTitle.trim().length === 0 ||
    //   enetredDescription.trim().length === 0 ||
    //   enetredPeaople.trim().length === 0
    // ) {
    //   alert('Invalid input');
    //   return;
    // } else {
    //   return [enetredTitle, enetredDescription, +enetredPeaople];
    // we can use parseFloat() or + before people to make it number
    // }
  }

  private clearInput() {
    this.titleInputElemnt.value = '';
    this.descriptionInputElemnt.value = '';
    this.peopleInputElement.value = '';
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElemnt.value);
    const userInput = this.gatherUserInput();

    // to check if data is tuple (they are simply a form of array)
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      console.log(title, desc, people);
      this.clearInput();
    }
  }

  // insertAdjacentElement inserts a given node at a given position relative to element in question
}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
