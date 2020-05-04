
import {inject} from 'aurelia-framework';
import {ValidationController} from 'visual-validation';
import { BasicView } from '../../views/BasicView';
import { SessionHandler } from '../../utils/SessionHandler';

@inject(ValidationController, SessionHandler)
export class modalDefault extends BasicView {
  
  input1 = '';
  viewModel = '';  
  tipo = 'text';

  constructor(validationController,sessionHandler,...rest){
    super(...rest);
    this.validationController = validationController.createContext();
    this.sessionHandler = sessionHandler;

  }

  onClick(){
    let value = {value: this.input1 };
    this.element.dispatchEvent(new CustomEvent('vs-dialog-close', {detail:value, bubbles:true}));
  }

  async attached(){
    this.validationController.build();
  }

  setParams(params){
    this.title = params.title;
    this.inputLabel = params.inputLabel;
    if (params.inputValue)
      this.input1 = params.inputValue;

    this.size = params.size;
    this.button = params.button;
    if (params.buttonImage)
      this.buttonImage = params.buttonImage;
      
    if (params.type)
    this.tipo = params.type;
  }

  onClose(){
    this.viewModel = '';
  }
}
