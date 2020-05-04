import {inject, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Testa {
  @bindable entity;
  loading = false;
  @bindable files;
  constructor(ea) {
    this.ea = ea;
    setInterval(() => {
      //this.loading = !this.loading;
    }, 5000);
  }
  selecionado(selected){
    this.logger(selected);
  }
  logger(item){
    console.log(item);
  }

  removeLoader(){
    this.ea.publish('vs-spinner-load-start');
  }


}
