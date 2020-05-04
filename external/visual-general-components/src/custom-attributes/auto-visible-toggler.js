/**
 * @author Daniel Falci - 28/09/17
 **/
import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Element, EventAggregator)
export class AutoVisibleTogglerCustomAttribute {
  @bindable target;
  isActive = false;
  @bindable tag;

  constructor(element, eventAggregator){
    this.element = element;
    $(window).on('click', (event)=>{
      this.onClickWindow(event);
    });
    this.eventAggregator = eventAggregator;
  }

  bind(){
    if (!this.tag)
      this.tag= 'is-active';

    $(this.element).on('click', (event)=>{
      if (!$(this.target).hasClass(this.tag)){
        this.openToggler(event);
      }else{
        this.closeToggler();
      }
    });
    this.eventAggregator.subscribe('VS_CLOSE_ALL', (event)=>{
      this.closeToggler();
    });
  }

  openToggler(event){
    $(this.target).addClass(this.tag);
    event.stopPropagation();
  }

  closeToggler(){
    $(this.target).removeClass(this.tag);
    let eventDetail = { target:this.target};
    this.element.dispatchEvent(new CustomEvent('toggle-close', {eventDetail, bubbles:true}));
  }

  onClickWindow(event){
    if (event.target != null && this.target != null && event.target != this.target && !$.contains(this.target, event.target)){
      if ($(this.target).hasClass(this.tag))
        this.closeToggler();
    }
  }

}

