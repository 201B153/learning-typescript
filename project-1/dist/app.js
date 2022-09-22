"use strict";
// OOPs apraoch for making form visble as templates don't show html until rendered by js
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
// Main class
class ProjectInput {
    constructor() {
        // const templateEl = document.getElementById('project-input');
        // if (templateEl) {
        //     this.templateElement = templateEl;
        // }
        // OR just put ! at end
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        // Here we render template tag
        // importNode() is used to import content of HTML tags in ts globally
        // true is for all nesting inside the content of following tag possible
        const importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild;
        // Direct interaction with element using ids
        this.element.id = 'user-input';
        this.titleInputElemnt = this.element.querySelector('#title');
        this.descriptionInputElemnt = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
        this.attach();
    }
    // telling ts that insidde the userInput there are three variable two are string and one is number
    gatherUserInput() {
        const enetredTitle = this.titleInputElemnt.value;
        const enetredDescription = this.descriptionInputElemnt.value;
        const enetredPeaople = this.peopleInputElement.value;
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
        //   // we can use parseFloat() or + before people to make it number
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
            console.log(title, desc, people);
            this.clearInput();
        }
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
        // this.element.addEventListener('submit', this.submitHandler.bind(this));
        // To make submitHandler work we can use bind() on it to make it refer to the class OR use autobind decorator
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
        // insertAdjacentElement inserts a given node at a given position relative to element in question
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
const projectInput = new ProjectInput();
