
import { AccessMember, AccessScope, AccessKeyed, BindingBehavior, ValueConverter, getContextFor } from 'aurelia-binding';
import { DOM } from 'aurelia-pal';

export function getPropertyInfo(expression, source) {
  const originalExpression = expression;
  while (expression instanceof BindingBehavior || expression instanceof ValueConverter) {
    expression = expression.expression;
  }
  let object;
  let propertyName;
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
    throw new Error(`Expression '${originalExpression}' is not compatible with the validate binding-behavior.`);
  }
  if (object === null || object === undefined) {
    return null;
  }
  return { object, propertyName };
}

export function getObject(expression, objectExpression, source) {
  const value = objectExpression.evaluate(source, null);
  if (value === null || value === undefined || value instanceof Object) {
    return value;
  }
  throw new Error(`The '${objectExpression}' part of '${expression}' evaluates to ${value} instead of an object, null or undefined.`);
}

export function getTargetDOMElement(binding, view) {
  const target = binding.target;

  if (target instanceof Element) {
    return target;
  }
  for (let i = 0, ii = view.controllers.length; i < ii; i++) {
    const controller = view.controllers[i];
    if (controller.viewModel === target) {
      const element = controller.container.get(DOM.Element);
      if (element) {
        return element;
      }
      throw new Error(`Unable to locate target element for "${binding.sourceExpression}".`);
    }
  }
  throw new Error(`Unable to locate target element for "${binding.sourceExpression}".`);
}