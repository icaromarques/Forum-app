import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {I18N} from 'aurelia-i18n';
import {DialogHandler} from "resources/utils/dialog/DialogHandler";
import environment from "environment";

@inject( Router, EventAggregator, Element, DialogHandler, I18N)
export class BasicView {

  constructor(router, ea, element, dialogHandler, I18N ){
    this.router = router;
    this.ea = ea;
    this.element = element;
    this.dialogHandler = dialogHandler;
    this.I18N = I18N;
    this.environment = environment;
  }

  async attached(){

  }

}
