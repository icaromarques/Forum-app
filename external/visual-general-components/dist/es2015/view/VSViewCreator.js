var _dec, _class;

import { inject, ViewCompiler, ViewResources, Container, ViewSlot, CompositionEngine, createOverrideContext } from 'aurelia-framework';

export let VSViewCreator = (_dec = inject(ViewCompiler, ViewResources, Container, CompositionEngine), _dec(_class = class VSViewCreator {

  constructor(compiler, resources, container, compositionEngine) {
    this.compiler = compiler;
    this.resources = resources;
    this.container = container;
    this.compositionEngine = compositionEngine;
  }

  createFromViewModel(viewModel, parentHtml = null, container = null, parentType = 'div', controllerHandler = null, closeHandler = null) {

    if (container == null) container = this.container.createChild();

    let createdTag = false;
    if (parentHtml == null) {
      parentHtml = document.createElement(parentType);
      createdTag = true;
    }

    let viewSlot = new ViewSlot(parentHtml, true);

    let instruction = {
      container: container,
      viewModel: viewModel,
      host: parentHtml,
      viewSlot: viewSlot
    };

    this.compositionEngine.compose(instruction).then(controller => {
      viewSlot.bind();
      viewSlot.attached();
      if (controllerHandler != null) controllerHandler(controller.viewModel, parentHtml, viewSlot);
    });

    if (createdTag) document.body.appendChild(parentHtml);

    let close = params => {
      parentHtml.remove(viewSlot);
      viewSlot.unbind();
      if (closeHandler == null) {
        if (createdTag) $(parentHtml).parent().remove(parentHtml);
      } else {
        closeHandler(params, parentHtml);
      }
    };
    return { viewSlot, parentHtml, close };
  }

  createFromHtmlText(htmlText, viewModel, parentHtml = null, container = null, parentType = 'div') {
    let viewFactory = this.compiler.compile(htmlText, this.resources);
    let view = viewFactory.create(container != null ? container : this.container.createChild());

    let createdTag = false;

    if (parentHtml == null) {
      parentHtml = document.createElement(parentType);
      createdTag = true;
    }

    view.bind(viewModel, createOverrideContext(viewModel));

    let viewSlot = new ViewSlot(parentHtml, true);
    viewSlot.add(view);
    viewSlot.attached();

    if (createdTag) document.body.appendChild(parentHtml);

    let close = () => {
      viewSlot.remove(view);
      view.unbind();
      if (createdTag) $(parentHtml).parent().remove(parentHtml);
    };
    return { viewSlot, parentHtml, close };
  }

}) || _class);