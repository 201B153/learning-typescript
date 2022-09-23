// Drag & drop interface namespace
namespace DragDropApp {
  export interface Draggable {
    dragStartHamdler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
  }

  export interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
  }
  // Can put anything in a namespace.
  // BUT only availabe in namesapce to make it avl to other use export on interface class methods, etc,
}
