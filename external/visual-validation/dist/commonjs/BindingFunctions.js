'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPropertyInfo = getPropertyInfo;
exports.getObject = getObject;
exports.getTargetDOMElement = getTargetDOMElement;

var _aureliaBinding = require('aurelia-binding');

var _aureliaPal = require('aurelia-pal');

function getPropertyInfo(expression, source) {
  var originalExpression = expression;
  while (expression instanceof _aureliaBinding.BindingBehavior || expression instanceof _aureliaBinding.ValueConverter) {
    expression = expression.expression;
  }
  var object = void 0;
  var propertyName = void 0;
  if (expression instanceof _aureliaBinding.AccessScope) {
    object = (0, _aureliaBinding.getContextFor)(expression.name, source, expression.ancestor);
    propertyName = expression.name;
  } else if (expression instanceof _aureliaBinding.AccessMember) {
    object = getObject(originalExpression, expression.object, source);
    propertyName = expression.name;
  } else if (expression instanceof _aureliaBinding.AccessKeyed) {
    object = getObject(originalExpression, expression.object, source);
    propertyName = expression.key.evaluate(source);
  } else {
    throw new Error('Expression \'' + originalExpression + '\' is not compatible with the validate binding-behavior.');
  }
  if (object === null || object === undefined) {
    return null;
  }
  return { object: object, propertyName: propertyName };
}

function getObject(expression, objectExpression, source) {
  var value = objectExpression.evaluate(source, null);
  if (value === null || value === undefined || value instanceof Object) {
    return value;
  }
  throw new Error('The \'' + objectExpression + '\' part of \'' + expression + '\' evaluates to ' + value + ' instead of an object, null or undefined.');
}

function getTargetDOMElement(binding, view) {
  var target = binding.target;

  if (target instanceof Element) {
    return target;
  }
  for (var i = 0, ii = view.controllers.length; i < ii; i++) {
    var controller = view.controllers[i];
    if (controller.viewModel === target) {
      var element = controller.container.get(_aureliaPal.DOM.Element);
      if (element) {
        return element;
      }
      throw new Error('Unable to locate target element for "' + binding.sourceExpression + '".');
    }
  }
  throw new Error('Unable to locate target element for "' + binding.sourceExpression + '".');
}