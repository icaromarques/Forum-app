/**
 * Created by danielfalci on 20/07/2017.
 */
import { AccessMember, AccessScope, AccessKeyed, BindingBehavior, ValueConverter, getContextFor } from 'aurelia-binding';
import {DOM} from 'aurelia-pal';

/**
 * Dada uma expressão de binding captura o objeto e o nome da propriedade aplicáveis a ele. Respeita os tipos internos de binding do aurelia.
 * @param expression
 * @param source
 * @returns {*}
 */
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
  }
  else if (expression instanceof AccessMember) {
    object = getObject(originalExpression, expression.object, source);
    propertyName = expression.name;
  }
  else if (expression instanceof AccessKeyed) {
    object = getObject(originalExpression, expression.object, source);
    propertyName = expression.key.evaluate(source);
  }
  else {
    throw new Error(`Expression '${originalExpression}' is not compatible with the validate binding-behavior.`);
  }
  if (object === null || object === undefined) {
    return null;
  }
  return { object, propertyName };
}

/**
 * captura o objeto dentro do contexto original - baixo nível usando a própria api do aurelia de avaliação de expressões
 * @param expression
 * @param objectExpression
 * @param source
 * @returns {Object}
 */
export function getObject(expression, objectExpression, source) {
  const value = objectExpression.evaluate(source, null);
  if (value === null || value === undefined || value instanceof Object) {
    return value;
  }
  throw new Error(`The '${objectExpression}' part of '${expression}' evaluates to ${value} instead of an object, null or undefined.`);
}

/**
 * Dado um binding, captura o elemento do DOM associado a ele.
 * @param binding
 * @param view
 * @returns {Element}
 */
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
