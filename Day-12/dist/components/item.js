var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// project Item Class
import { autobind } from '../decorators/autobind.js';
import { Component } from './base.js';
export class ProjectItem extends Component {
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
        this.element.querySelector('h3').textContent = this.members + ' assigned';
        this.element.querySelector('p').textContent = this.project.description;
    }
}
__decorate([
    autobind
], ProjectItem.prototype, "dragStartHamdler", null);
__decorate([
    autobind
], ProjectItem.prototype, "dragEndHandler", null);
