// OOPs apraoch for making form visble as templates don't show html until rendered by js

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

  private clearInput() {
    this.titleInputElemnt.value = '';
    this.descriptionInputElemnt.value = '';
    this.peopleInputElement.value = ''
  }

  @autobind
  private submitHandler(event: Event) {
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
