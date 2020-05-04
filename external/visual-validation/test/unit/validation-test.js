import {inject, bindable, bindingMode, NewInstance, Container, Optional} from 'aurelia-framework';
import {ValidationController} from '../../src/ValidationController';

@inject(NewInstance.of(ValidationController), Container)
export class ValidationTest{

  nome = 'tttttt';
  outro = '';
  controller = null;
  validationSubmit = null;

  constructor(validationController, container){
    this.controller = validationController;
    this.controller = this.controller.createContext();
    this.container = container;
    this.validation = this.container.get(Optional.of('ValidationError'));
  }

  attached(){
    this.controller.build();
  }

  async onSubmit(){
    this.validationSubmit = await this.controller.validate();    
  }
}
