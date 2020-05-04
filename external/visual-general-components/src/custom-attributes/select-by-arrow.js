/**
 * @author Daniel Falci - 18/10/17
 **/
import {inject, bindable} from 'aurelia-framework';

@inject(Element)
export class SelectByArrowCustomAttribute{
  @bindable targetElement;
  @bindable itemPattern = 'li';
  @bindable selectedClass = 'selected';
  @bindable callback = null;
  @bindable currentIndex = -1;
  @bindable selectedCallback = null;
  lastIndex = -1;

  constructor(element){
    this.element = element;

  }

  attached(){
    $(this.element).keydown((event)=> this.onKeyDown(event));
  }


  updateClass(items){
    $(items[this.lastIndex]).removeClass(this.selectedClass);
    $(items[this.currentIndex]).addClass(this.selectedClass);
  }


  changeSelection(event, direction){
    if (this.callback){
      this.callback(event, direction);
      return;
    }

    let items = $(this.targetElement).find(this.itemPattern);

    if (items){
      this.lastIndex = this.currentIndex;
      if (direction == 'up'){
        this.currentIndex -=1;
        if (this.currentIndex <0)
          this.currentIndex = items.length-1;
      }else{
        this.currentIndex +=1;
        if (this.currentIndex >= items.length){
          this.currentIndex = 0;
        }
      }

      this.updateClass(items);

    }
    event.preventDefault();
  }


  onKeyDown(event) {
    if (!this.targetElement)
      throw 'o target element não foi especificado';

    if (event.shiftKey || event.ctrlKey)
      return;

    let keyCode = event.keyCode;


    switch(keyCode){
      case 37:
        this.changeSelection(event, 'up');
        //left
        break;
      case 38:
        //up
        this.changeSelection(event, 'up');
        break;
      case 39:
        this.changeSelection(event, 'down');
        //right
        break;
      case 40:
        this.changeSelection(event, 'down');
        //down
        break;
      case 13:
        if (this.selectedCallback){
          this.selectedCallback({item:$(this.targetElement).find(this.itemPattern + '.' + this.selectedClass) });
          return;
        }else{
          $(this.targetElement).find(this.itemPattern + '.' + this.selectedClass).click();
        }
        event.preventDefault();
        break;
    }

  }


}
