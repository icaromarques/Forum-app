import {inject, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Element, EventAggregator)
export class VisualSpinnerCustomElement {
  @bindable loading;
  @bindable color;
  @bindable customClass = {
    overlay: '',
    spinner: ''
  };
  
  constructor(element, ea){
    this.element = element;
    this.ea = ea;
    this.ea.subscribe('vs-spinner-load-start' , () =>  this.loading = true );
    this.ea.subscribe('vs-spinner-load-end' , () =>  this.loading = false );
  }
  created(){
    this.focusableElements = Array.from(this.element.parentNode.querySelectorAll('a:not([disabled]), button:not([disabled]), input:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'));
  }
  attached() {
    this.subscribe();
  }
  dettached(){
    this.unscribe();
  }
  loadingChanged(newValue, oldValue){
    if(newValue){
      this.focusableElements.map(el => el.setAttribute('disabled', true));
    } else {
      this.focusableElements.map(el => el.removeAttribute('disabled'));
    }
  }
  subscribe(){
    this.startLoad = this.ea.subscribe('vs-spinner-load-start' , () =>  this.loading = true );
    this.endLoad = this.ea.subscribe('vs-spinner-load-end' , () =>  this.loading = false );
  }
  unscribe(){
    this.startLoad.dispose();
    this.startLoad = null;
    this.endLoad.dispose();
    this.endLoad = null;
  }
  
}
