
import {inject,NewInstance} from 'aurelia-framework';
import {ValidationController} from 'visual-validation';
import { BasicView } from '../../views/BasicView';
import { SessionHandler } from '../../utils/SessionHandler';

@inject(NewInstance.of(ValidationController), SessionHandler)
export class modalNewQuestion extends BasicView {
  
  title = '';
  description = '';
  user = '';
  type = ''
  modal = {};

  constructor(validationController,sessionHandler,...rest){
    super(...rest);
    this.validationController = validationController.createContext();
    this.sessionHandler = sessionHandler;
  }

  async onClick(){
    
    let validation = await this.validationController.validate();
    if (validation.valid) {
      let value = {title: this.title,
        description: this.description,
      user: {
        name : this.user
      }
     }  
      this.element.dispatchEvent(new CustomEvent('vs-dialog-close', {detail:value, bubbles:true}));
    } 
  
  }

  onClear(){
    this.title = "";
    this.description = "";
    this.validationController.clear();
  }


  async attached(){
    this.validationController.build();
  }

  setParams(params){
    this.user = params.user;
    this.modal = params.modal;
  }
}
