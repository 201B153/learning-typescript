var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Input class
import { autobind } from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';
import { validate } from '../util/validation.js';
import { Component } from './base.js';
export class ProjectInput extends Component {
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
        if (!validate(titleValidatable) ||
            !validate(descriptionValidatble) ||
            !validate(peopleValidatable)) {
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
            projectState.addProject(title, desc, people);
            console.log(title, desc, people);
            this.clearInput();
        }
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
