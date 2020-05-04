/**
 * Created by danielfalci on 19/07/2017.
 */

import {ValidationController} from "./ValidationController";
import {Optional} from 'aurelia-dependency-injection';
import {getTargetDOMElement} from './BindingFunctions';


export class ValidarBindingBehavior{

  bind(binding, source, rules){
    //captura o elemento do binding
    let element = getTargetDOMElement(binding, source);
    // carregar com regras totalmente default
    rules = rules?rules:{};

    let controller = null;
    if (rules instanceof ValidationController){
      controller = rules;
    }else{
      let validationController = rules.validationController ? rules.validationController : ValidationController;
      controller = source.container.get(Optional.of(validationController));
    }


    if (controller == null)
      throw 'Não foi possível encontrar uma instância do validationController no contexto informado';

    binding.validationController = controller;

    //chama o validationController apropriado passando o elemento a ser bindado
    controller.registerElementBinding(binding, element, rules);
  }

  unbind(binding, scope) {
    //todo refatorar posteriormente. Da forma que está aqui, se houver, por qualquer razão, um evento de unbind, ele detona as  regras de validação.... vamos tentar com este caso de uso primeiro e depois vemos o que vai acontencer
    binding.validationController.unregisterElementBinding(binding, scope);
  }

}
