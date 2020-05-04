/**
 * @author Daniel Falci - 26/09/17
 **/
import {bindable, inject} from 'aurelia-framework';

@inject(Element)
export class OnEnterKeyCustomAttribute{
  @bindable callback;

  constructor(element){
    this.element = element;

    $(this.element).on('keyup', (event)=>{
      if (event.keyCode !== 13)
        return;
      this.callback();
    });

  }


}
