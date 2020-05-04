/**
 * Created by danielfalci on 23/06/2017.
 */
import {inject, bindable} from 'aurelia-framework';

@inject(Element)
export class ViewStackCustomAttribute{
  @bindable managedItems;
  @bindable callback;
  @bindable selectFirst;

  selectedItem = null;

  activeClass='is-active';
  inactiveClass='hide';

  constructor(element){
    this.element = element;
  }

  bind() {
    if (this.managedItems) {
      this.managedItems.forEach((este) => {$(este.trigger).on('click', (event) => {
        this.onClickElement(este);
      });
      });
    }
    if ((this.selectFirst == null || this.selectFirst) && this.managedItems) {
      this.onClickElement(this.managedItems[0]);
    }
  }

  toggle(element, show){
    if (!show) {
      $(element.trigger).removeClass(this.activeClass);
      $(element.content).addClass(this.inactiveClass)
    }else{
      $(element.trigger).addClass(this.activeClass);
      $(element.content).removeClass(this.inactiveClass);
    }
  }

  onClickElement(element){
    if (this.selectedItem!=null)
      this.toggle(this.selectedItem, false);
    this.toggle(element, true)
    this.selectedItem = element;
  }

}
