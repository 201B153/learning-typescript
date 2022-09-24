// Input class
import { autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import { Validatable, validate } from '../util/validation';
import { Component } from './base';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElemnt: HTMLInputElement;
  descriptionInputElemnt: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    // To call constructor of base class
    super('project-input', 'app', true, 'user-input');
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
  }

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

    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      console.log(title, desc, people);
      this.clearInput();
    }
  }
}
