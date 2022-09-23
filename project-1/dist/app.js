"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// OOPs apraoch for making form visble as templates don't show html until rendered by js
// Project Types
// This is to make all project types autocomplete and be vary of error
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active);
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
    }
}
// const projectState = new ProjectState();
// Or we can use private constructor
const projectState = ProjectState.getInstance();
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}
// AutoBind Decorator
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjustedDescriptor;
}
// Main Class for Main Componenets
class Component {
    constructor(templateId, hosteElementId, insetAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hosteElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insetAtStart);
    }
    attach(insertAtBegining) {
        this.hostElement.insertAdjacentElement(insertAtBegining ? 'afterbegin' : 'beforeend', this.element);
    }
}
// ProjectList Class
class ProjectList extends Component {
    constructor(type) {
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    configure() {
        projectState.addListener((projects) => {
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
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = '';
        for (const prjItem of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem);
        }
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent =
            this.type.toUpperCase() + ' PROJECTS';
    }
}
// Main class
class ProjectInput extends Component {
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
        this.titleInputElemnt = this.element.querySelector('#title');
        this.descriptionInputElemnt = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
    }
    renderContent() { }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
        // this.element.addEventListener('submit', this.submitHandler.bind(this));
        // To make submitHandler work we can use bind() on it to make it refer to the class OR use autobind decorator
    }
    // telling ts that insidde the userInput there are three variable two are string and one is number
    gatherUserInput() {
        const enetredTitle = this.titleInputElemnt.value;
        const enetredDescription = this.descriptionInputElemnt.value;
        const enetredPeaople = this.peopleInputElement.value;
        const titleValidatable = {
            value: enetredTitle,
            required: true,
        };
        const descriptionValidatble = {
            value: enetredDescription,
            required: true,
            minLength: 5,
        };
        const peopleValidatable = {
            value: +enetredPeaople,
            required: true,
            min: 1,
            max: 5,
        };
        // validation using validation method
        if (!validate(titleValidatable) ||
            !validate(descriptionValidatble) ||
            !validate(peopleValidatable)) {
            alert('Invalid Input');
            return;
        }
        else {
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
    clearInput() {
        this.titleInputElemnt.value = '';
        this.descriptionInputElemnt.value = '';
        this.peopleInputElement.value = '';
    }
    submitHandler(event) {
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
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
