"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DragDropApp;
(function (DragDropApp) {
    let ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = DragDropApp.ProjectStatus || (DragDropApp.ProjectStatus = {}));
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    DragDropApp.Project = Project;
})(DragDropApp || (DragDropApp = {}));
// Project state namespace
var DragDropApp;
(function (DragDropApp) {
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
            const newProject = new DragDropApp.Project(Math.random().toString(), title, description, numOfPeople, DragDropApp.ProjectStatus.Active);
            this.projects.push(newProject);
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find((prj) => prj.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
    }
    DragDropApp.ProjectState = ProjectState;
    DragDropApp.projectState = ProjectState.getInstance();
})(DragDropApp || (DragDropApp = {}));
// validtaion namespace
var DragDropApp;
(function (DragDropApp) {
    function validate(validatableInput) {
        let isValid = true;
        if (validatableInput.required) {
            isValid =
                isValid && validatableInput.value.toString().trim().length !== 0;
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
    DragDropApp.validate = validate;
})(DragDropApp || (DragDropApp = {}));
// AutoBind Decorator interfce
var DragDropApp;
(function (DragDropApp) {
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
    DragDropApp.autobind = autobind;
})(DragDropApp || (DragDropApp = {}));
// base Componenets namespace
var DragDropApp;
(function (DragDropApp) {
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
    DragDropApp.Component = Component;
})(DragDropApp || (DragDropApp = {}));
// Input class namespace
/// <reference path="base.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../util/validation.ts" />
/// <reference path="../state/project-state.ts" />
var DragDropApp;
(function (DragDropApp) {
    class ProjectInput extends DragDropApp.Component {
        constructor() {
            // To call constructor of base class
            super('project-input', 'app', true, 'user-input');
            this.titleInputElemnt = this.element.querySelector('#title');
            this.descriptionInputElemnt = this.element.querySelector('#description');
            this.peopleInputElement = this.element.querySelector('#people');
            this.configure();
        }
        renderContent() { }
        configure() {
            this.element.addEventListener('submit', this.submitHandler);
        }
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
            if (!DragDropApp.validate(titleValidatable) ||
                !DragDropApp.validate(descriptionValidatble) ||
                !DragDropApp.validate(peopleValidatable)) {
                alert('Invalid Input');
                return;
            }
            else {
                return [enetredTitle, enetredDescription, +enetredPeaople];
            }
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
            if (Array.isArray(userInput)) {
                const [title, desc, people] = userInput;
                DragDropApp.projectState.addProject(title, desc, people);
                console.log(title, desc, people);
                this.clearInput();
            }
        }
    }
    __decorate([
        DragDropApp.autobind
    ], ProjectInput.prototype, "submitHandler", null);
    DragDropApp.ProjectInput = ProjectInput;
})(DragDropApp || (DragDropApp = {}));
// ProjectList Class namespace
/// <reference path="base.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/project-state.ts" />
/// <reference path="../models/drag-drop.ts" />
/// <reference path="../models/project.ts" />
var DragDropApp;
(function (DragDropApp) {
    class ProjectList extends DragDropApp.Component {
        constructor(type) {
            super('project-list', 'app', false, `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        dragLeaveHandler(event) {
            const listEl = this.element.querySelector('ul');
            listEl.classList.remove('droppable');
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                // default is to not allow dropping in JS
                event.preventDefault();
                const listEl = this.element.querySelector('ul');
                listEl.classList.add('droppable');
            }
        }
        dropHandler(event) {
            console.log(event.dataTransfer.getData('text/plain'));
            const prjId = event.dataTransfer.getData('text/plain');
            DragDropApp.projectState.moveProject(prjId, this.type === 'active' ? DragDropApp.ProjectStatus.Active : DragDropApp.ProjectStatus.Finished);
        }
        configure() {
            //eventListeners
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('drop', this.dropHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
            DragDropApp.projectState.addListener((projects) => {
                const relevantProjects = projects.filter((prj) => {
                    if (this.type === 'active') {
                        return prj.status === DragDropApp.ProjectStatus.Active;
                    }
                    return prj.status === DragDropApp.ProjectStatus.Finished;
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`);
            listEl.innerHTML = '';
            for (const prjItem of this.assignedProjects) {
                new DragDropApp.ProjectItem(this.element.querySelector('ul').id, prjItem);
            }
        }
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector('ul').id = listId;
            this.element.querySelector('h2').textContent =
                this.type.toUpperCase() + ' PROJECTS';
        }
    }
    __decorate([
        DragDropApp.autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    __decorate([
        DragDropApp.autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        DragDropApp.autobind
    ], ProjectList.prototype, "dropHandler", null);
    DragDropApp.ProjectList = ProjectList;
})(DragDropApp || (DragDropApp = {}));
// ______-------_______------______----______------_______------_____-----//
// to import namespace
/// <reference path="models/drag-drop.ts" />
/// <reference path="models/project.ts" />
/// <reference path="state/project-state.ts" />
/// <reference path="util/validation.ts" />
/// <reference path="decorators/autobind.ts" />
/// <reference path="components/input.ts" />
/// <reference path="components/list.ts" />
// to make second module of namespace work we need to change module in tsconfig file to amd and make outdir a single file.
// now make a namespace that will conatin whole code in it like
var DragDropApp;
(function (DragDropApp) {
    new DragDropApp.ProjectInput();
    new DragDropApp.ProjectList('active');
    new DragDropApp.ProjectList('finished');
})(DragDropApp || (DragDropApp = {}));
// the only issue is that we will get runtime error while we will not get comiplation error
// make it hard to check.
// project Item Class namespace
/// <reference path="base.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/drag-drop.ts" />
/// <reference path="../models/project.ts" />
var DragDropApp;
(function (DragDropApp) {
    class ProjectItem extends DragDropApp.Component {
        constructor(hostID, project) {
            super('single-project', hostID, false, project.id);
            this.project = project;
            this.configure();
            this, this.renderContent();
        }
        get members() {
            if (this.project.people === 1) {
                return '1 member';
            }
            else {
                return `${this.project.people} memebers`;
            }
        }
        dragStartHamdler(event) {
            console.log(event);
            event.dataTransfer.setData('text/plain', this.project.id);
            event.dataTransfer.effectAllowed = 'move';
        }
        dragEndHandler(_) {
            console.log('DragEnd');
        }
        configure() {
            this.element.addEventListener('dragstart', this.dragStartHamdler);
            this.element.addEventListener('dragend', this.dragEndHandler);
        }
        renderContent() {
            this.element.querySelector('h2').textContent = this.project.title;
            this.element.querySelector('h3').textContent =
                this.members + ' assigned';
            this.element.querySelector('p').textContent = this.project.description;
        }
    }
    __decorate([
        DragDropApp.autobind
    ], ProjectItem.prototype, "dragStartHamdler", null);
    __decorate([
        DragDropApp.autobind
    ], ProjectItem.prototype, "dragEndHandler", null);
    DragDropApp.ProjectItem = ProjectItem;
})(DragDropApp || (DragDropApp = {}));
