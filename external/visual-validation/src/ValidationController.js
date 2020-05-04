/**
 * Created by danielfalci on 18/07/2017.
 */

import {VSBindingUtils} from './VSBindingUtils';
import {getPropertyInfo} from './BindingFunctions';
import {inject, Container, singleton, TaskQueue} from 'aurelia-framework';
import {MonitoredComponentFactory} from './SigaValidationFactory';


/**
 * Objeto que absorve as propriedades de erro criadas dinâmicamente. Não pode colocar em um mesmo contexto de validação elementos com nomes iguais
 */
export class ValidationError{
  constructor(){

  }

  addContext(variableName, errorObject){
    this[variableName] = errorObject;
  }

  removeContext(variableName){
    this[variableName] = undefined;
  }
}

/**
 * Classe principal do engine de validação
 */
@inject(VSBindingUtils, Container, MonitoredComponentFactory)
export class ValidationController{
  monitoredItems = [];
  errors = [];
  object = null;

  subscriptions = [];

  constructor(bindingUtils, container, componentFactory){
    this.monitoredItems = [];
    this.errors = [];
    this.bindingUtils = bindingUtils;
    this.validationError = new ValidationError();
    this.subscriptions = [];
    this.errorMessageContext = 'ValidationError';
    this.container = container;
    this.componentFactory = componentFactory;
    this.built = false;
  }

  addMonitor(monitoredComponent){
    monitoredComponent.errors = this.errors;
    this.monitoredItems.push(monitoredComponent);
  }

  createContext(context='ValidationError'){
    let v = {items:{}};
    this.errorMessageContext = context;
    this.container.registerInstance(context, v);
    return this;
  }

  async validateComponents(...componentes){
    let valid = true;
    for (let i=0;i<componentes.length;i++){
      let field = this.monitoredItems.find((m)=> {return m.property == componentes[i]});
      let validacao = await field.validateComponent();
      if (validacao){
        valid = false;
      }
    }
    return valid;
  }

  getValidation(propertyName){
    return this.monitoredItems.find((m)=> {return m.property == propertyName});
  }

  registerElementBinding(binding, element, options){
    if (!options)
      options = {};
    let propertyInfo = getPropertyInfo(binding.sourceExpression, binding.source)
    options.property = (!options.property)?propertyInfo.propertyName:options.property;
    let m = this.componentFactory.create(options, element);
    m.propertyInfo = propertyInfo;
    m.options = options;
    this.addMonitor(m);
  }

  unregisterElementBinding(binding, scope){
    this.reset();
  }


  build(){
    if (this.built)
      this.clear();
    this.monitoredItems.forEach(m=>{
      this.validationError.addContext(m.property, m.errorObject);
      m.createBinding();
    });
    this.container.get(this.errorMessageContext).items = this.validationError;
    this.built = true;
  }

  clear(){
    this.subscriptions.forEach((este)=>este.dispose());
    this.subscriptions.splice(0, this.subscriptions.length);
    this.monitoredItems.forEach(m=>m.removeBinding());
    this.errors.splice(0, this.errors.length);
  }

  reset(){
    this.subscriptions.forEach((este)=>este.dispose());
    this.monitoredItems.forEach(m=>m.removeBinding());
    this.errors.splice(0, this.errors.length);
    this.subscriptions.splice(0, this.subscriptions.length);
    this.monitoredItems.splice(0, this.monitoredItems.length);
    this.validationError.removeContext(this.errorMessageContext);
  }

  async validate(){
    this.errors.splice(0, this.errors.length);
    let valid = true;
    for (let i=0;i<this.monitoredItems.length;i++){
      let m = this.monitoredItems[i];
      let isError = await m.validateComponent();
      if (isError)
        valid = false;
    }
    return {valid};
  }
}

export class MonitoredComponent{

  constructor(property, errorMessage='pau', element=null, validations = [], errorObject){
    this.property = property;
    this.element = element;
    this.errorMessage = errorMessage;
    this.validations = [];
    this.value = null;
    this.errorObject = {error:false, message:this.errorMessage};
    this.events = [];
    this.options = {};
    this.propertyInfo = null;
  }

  addValidation(f){
    this.validations.push(f);
    return this;
  }

  async validateComponent() {
    this.value = this.element.value;
    let isError = false;
    for (let i = 0; i < this.validations.length; i++) {
      let f = this.validations[i];
      try {
        let ret = await f(this.value, this.element);
        isError = !ret;
      } catch (ex) {
        isError = true;
      }
      if (isError)
        break;
    }
    this.showError(isError);
    return isError;
  }

  showError(show=true){
    this.errorObject.error = show;
    if (!show){
      this.errors.splice(this.errors.findIndex((item)=>{
        return item.property == this.property
      }), 1);
    }else{
      this.errors.push({property:this.property, message:this.errorMessage});
    }
  }

  valueChanged(event){
    this.validateComponent();
  }

  setDefaultValue(){
    this.value = this.element.value;
  }

  createBinding(){
    this.listener = this.valueChanged.bind(this);
    $(this.element).on(this.events.join(' '), this.listener);
    this.setDefaultValue();
  }

  removeBinding(){
    this.errorObject.error = false;
    $(this.element).off(this.events.join(' '), this.listener);
  }

}
