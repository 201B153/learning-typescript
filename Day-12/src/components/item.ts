// project Item Class
import { autobind } from '../decorators/autobind.js';
import { Draggable } from '../models/drag-drop.js';
import { Project } from '../models/project.js';
import { Component } from './base.js';

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

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
