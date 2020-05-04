/**
 * Created by danielfalci on 19/06/2017.
 */
import {bindable} from 'aurelia-framework';

export class InfiniteScrollCustomAttribute{
  static inject = [Element];
  @bindable callback;
  @bindable active;

  @bindable noMorePages;



  constructor(element){
    this.element = element;

    $(this.element).on('ps-y-reach-end', ()=>{
      if (this.active && this.callback){
        this.callback();
      }
    });
  }

  activeChanged(newValue, oldValue){
    // dispara a atualização do scroll - força o comportamento correto do perfectScrollbar
    $(this.element).perfectScrollbar('update');
  }

}

