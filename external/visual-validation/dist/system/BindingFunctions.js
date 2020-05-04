'use strict';

System.register(['aurelia-binding', 'aurelia-pal'], function (_export, _context) {
  "use strict";

  var AccessMember, AccessScope, AccessKeyed, BindingBehavior, ValueConverter, getContextFor, DOM;
  function getPropertyInfo(expression, source) {
    var originalExpression = expression;
    while (expression instanceof BindingBehavior || expression instanceof ValueConverter) {
      expression = expression.expression;
    }
    var object = void 0;
    var propertyName = void 0;
    if (expression instanceof AccessScope) {
      object = getContextFor(expression.name, source, expression.ancestor);
      propertyName = expression.name;
    } else if (expression instanceof AccessMember) {
      object = getObject(originalExpression, expression.object, source);
      propertyName = expression.name;
    } else if (expression instanceof AccessKeyed) {
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

  _export('getPropertyInfo', getPropertyInfo);

  function getObject(expression, objectExpression, source) {
    var value = objectExpression.evaluate(source, null);
    if (value === null || value === undefined || value instanceof Object) {
      return value;
    }
    throw new Error('The \'' + objectExpression + '\' part of \'' + expression + '\' evaluates to ' + value + ' instead of an object, null or undefined.');
  }

  _export('getObject', getObject);

  function getTargetDOMElement(binding, view) {
    var target = binding.target;

    if (target instanceof Element) {
      return target;
    }
    for (var i = 0, ii = view.controllers.length; i < ii; i++) {
      var controller = view.controllers[i];
      if (controller.viewModel === target) {
        var element = controller.container.get(DOM.Element);
        if (element) {
          return element;
        }
        throw new Error('Unable to locate target element for "' + binding.sourceExpression + '".');
      }
    }
    throw new Error('Unable to locate target element for "' + binding.sourceExpression + '".');
  }

  _export('getTargetDOMElement', getTargetDOMElement);

  return {
    setters: [function (_aureliaBinding) {
      AccessMember = _aureliaBinding.AccessMember;
      AccessScope = _aureliaBinding.AccessScope;
      AccessKeyed = _aureliaBinding.AccessKeyed;
      BindingBehavior = _aureliaBinding.BindingBehavior;
      ValueConverter = _aureliaBinding.ValueConverter;
      getContextFor = _aureliaBinding.getContextFor;
    }, function (_aureliaPal) {
      DOM = _aureliaPal.DOM;
    }],
    execute: function () {}
  };
});