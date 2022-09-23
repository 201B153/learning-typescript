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

namespace DragDropApp {
  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}


// the only issue is that we will get runtime error while we will not get comiplation error
// make it hard to check.