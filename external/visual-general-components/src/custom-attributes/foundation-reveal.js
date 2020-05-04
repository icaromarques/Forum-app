/**
 * @author Daniel Falci - 16/10/17
 **/
import { inject } from 'aurelia-framework';

@inject(Element)
export class FoundationRevealCustomAttribute {
  foundationInstance = null;

  constructor(element) {
    this.element = element;
    this.foundationInstance = new Foundation.Reveal($(element));
  }

  attached(){
  }

  detached(){
    try {
      let temp = this.foundationInstance.$overlay[0];
      if (temp && temp.parentNode)
        temp.parentNode.removeChild(temp);
    }catch(ex){
      this.foundationInstance.close();
      this.foundationInstance.destroy();
    }
  }
}

