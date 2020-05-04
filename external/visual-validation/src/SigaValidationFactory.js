/**
 * Created by danielfalci on 20/07/2017.
 */

import {MonitoredComponent} from './ValidationController';
import {Configure} from './Configure';
/**
 * Entidade responsável por criar validações default para o formulário do siga
 */
import {inject} from 'aurelia-framework';

@inject(Configure)
export class MonitoredComponentFactory{

  constructor(configure){
    this.config = configure;
  }

  createAntigo(options, element){
    if (!options.tipo)
      options.tipo = this.inferType(element);

    let rule = this.config.get(options.tipo);
    let errorMessage = (options.message) ? options.message : this.getDefaultErrorMessage(rule);
    let monitoredComponent = new MonitoredComponent(options.property, errorMessage, element);

    options = this.defaultOptions(options);
    monitoredComponent.events = options.events;

    return rule.funcao(monitoredComponent, options);
  }

  create(options, element){
    let rule = null;
    let tipo = null;

    if (!options.tipo){
      this.config.listaRegras().forEach((value, key) => {
        if($.isFunction(key)){
          tipo = key(element);
          if(tipo != undefined && tipo != null){
            rule = value;
            return;
          }
        }
      });

      if(tipo == undefined || tipo == null){
        rule = this.config.get(this.inferType(element));
      }
    }else{
      rule = this.config.get(options.tipo);
    }

    let errorMessage = (options.message) ? options.message : this.getDefaultErrorMessage(rule);
    let monitoredComponent = new MonitoredComponent(options.property, errorMessage, element);

    options = this.defaultOptions(options);
    monitoredComponent.events = options.events;

    return rule.funcao(monitoredComponent, options);
  }

  inferType(element){
    let retorno = 'text';

    if ($(element).is('input')) {
      let elementType = $(element).attr('type');

      if (elementType)
        return elementType;
    }

    this.config.listaRegras().forEach((value, key) => {
      if($(element).is(key)){
        retorno = key;
        return;
      }
    });

    return retorno;
  }

  getDefaultErrorMessage(obj){
    if(obj.mensagem)
      return obj.mensagem;
    else
      return 'textoObrigatorio.erroValidacao';
  }

  defaultOptions(options){
    options.events = !options.events ? ['change', 'blur'] : options.events;
    options.obrigatorio = typeof(options.obrigatorio) == 'undefined' ? true : options.obrigatorio;
    return options;
  }
}
