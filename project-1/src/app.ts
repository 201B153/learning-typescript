// OOPs apraoch for making form visble as templates don't show html until rendered by js

// Project Management Class
class ProjectState {
  private listeners: any[] = [];
  private projects: any[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenerFn: Function) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = {
      id: Math.random().toString(),
      title: title,
      description: description,
      people: numOfPeople,
    };
    this.projects.push(newProject);
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

// ProjectList Class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: any[];

  constructor(private type: 'active' | 'finished') {
    this.templateElement = document.getElementById(
      'project-list'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
    this.assignedProjects = [];

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    projectState.addListener((projects: any[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement('li');
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS';
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}

// Main class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElemnt: HTMLInputElement;
  descriptionInputElemnt: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    // const templateEl = document.getElementById('project-input');
    // if (templateEl) {
    //     this.templateElement = templateEl;
    // }
    // OR just put ! at end
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    // Here we render template tag
    // importNode() is used to import content of HTML tags in ts globally
    // true is for all nesting inside the content of following tag possible
    const importNode = document.importNode(this.templateElement.content, true);
    this.element = importNode.firstElementChild as HTMLFormElement;
    // Direct interaction with element using ids
    this.element.id = 'user-input';

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
    this.attach();
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

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
    // this.element.addEventListener('submit', this.submitHandler.bind(this));
    // To make submitHandler work we can use bind() on it to make it refer to the class OR use autobind decorator
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
    // insertAdjacentElement inserts a given node at a given position relative to element in question
  }
}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
