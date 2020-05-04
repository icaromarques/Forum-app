'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VSViewCreator = undefined;

var _dec, _class;

var _aureliaFramework = require('aurelia-framework');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VSViewCreator = exports.VSViewCreator = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.ViewCompiler, _aureliaFramework.ViewResources, _aureliaFramework.Container, _aureliaFramework.CompositionEngine), _dec(_class = function () {
  function VSViewCreator(compiler, resources, container, compositionEngine) {
    _classCallCheck(this, VSViewCreator);

    this.compiler = compiler;
    this.resources = resources;
    this.container = container;
    this.compositionEngine = compositionEngine;
  }

  VSViewCreator.prototype.createFromViewModel = function createFromViewModel(viewModel) {
    var parentHtml = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var container = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var parentType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'div';
    var controllerHandler = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var closeHandler = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;


    if (container == null) container = this.container.createChild();

    var createdTag = false;
    if (parentHtml == null) {
      parentHtml = document.createElement(parentType);
      createdTag = true;
    }

    var viewSlot = new _aureliaFramework.ViewSlot(parentHtml, true);

    var instruction = {
      container: container,
      viewModel: viewModel,
      host: parentHtml,
      viewSlot: viewSlot
    };

    this.compositionEngine.compose(instruction).then(function (controller) {
      viewSlot.bind();
      viewSlot.attached();
      if (controllerHandler != null) controllerHandler(controller.viewModel, parentHtml, viewSlot);
    });

    if (createdTag) document.body.appendChild(parentHtml);

    var close = function close(params) {
      parentHtml.remove(viewSlot);
      viewSlot.unbind();
      if (closeHandler == null) {
        if (createdTag) $(parentHtml).parent().remove(parentHtml);
      } else {
        closeHandler(params, parentHtml);
      }
    };
    return { viewSlot: viewSlot, parentHtml: parentHtml, close: close };
  };

  VSViewCreator.prototype.createFromHtmlText = function createFromHtmlText(htmlText, viewModel) {
    var parentHtml = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var container = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var parentType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'div';

    var viewFactory = this.compiler.compile(htmlText, this.resources);
    var view = viewFactory.create(container != null ? container : this.container.createChild());

    var createdTag = false;

    if (parentHtml == null) {
      parentHtml = document.createElement(parentType);
      createdTag = true;
    }

    view.bind(viewModel, (0, _aureliaFramework.createOverrideContext)(viewModel));

    var viewSlot = new _aureliaFramework.ViewSlot(parentHtml, true);
    viewSlot.add(view);
    viewSlot.attached();

    if (createdTag) document.body.appendChild(parentHtml);

    var close = function close() {
      viewSlot.remove(view);
      view.unbind();
      if (createdTag) $(parentHtml).parent().remove(parentHtml);
    };
    return { viewSlot: viewSlot, parentHtml: parentHtml, close: close };
  };

  return VSViewCreator;
}()) || _class);