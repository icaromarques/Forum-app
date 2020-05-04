

import { ValidationController } from "./ValidationController";
import { Optional } from 'aurelia-dependency-injection';
import { getTargetDOMElement } from './BindingFunctions';

export let ValidarBindingBehavior = class ValidarBindingBehavior {

  bind(binding, source, rules) {
    let element = getTargetDOMElement(binding, source);

    rules = rules ? rules : {};

    let controller = null;
    if (rules instanceof ValidationController) {
      controller = rules;
    } else {
      let validationController = rules.validationController ? rules.validationController : ValidationController;
      controller = source.container.get(Optional.of(validationController));
    }

    if (controller == null) throw 'Não foi possível encontrar uma instância do validationController no contexto informado';

    binding.validationController = controller;

    controller.registerElementBinding(binding, element, rules);
  }

  unbind(binding, scope) {
    binding.validationController.unregisterElementBinding(binding, scope);
  }

};