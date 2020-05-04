import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {I18N} from 'aurelia-i18n';

@inject(DialogController, I18N)
export class Alert {



   constructor(controller,I18N) {
      this.controller = controller;
      this.I18N = I18N;
      this.answer = null;
      controller.settings.lock = true;
      this.class="";
   }

   activate(message) {
      this.message = message.text;
      console.log(message);
      if(message.class && message.class.length > 0){
        switch(message.class){
          case 'success':
            this.class = 'alert alert-success';
            this.title = this.I18N.tr('sucesso');
            this.icon = 'fa-check-square';
            this.btn = 'btn-sucess';
            break;
          case 'warning':
            this.class = 'alert alert-warning';
            this.title =  this.I18N.tr('atencao');
            this.icon = 'fa-exclamation-triangle';
            this.btn = 'btn-warning';
            break;
          case 'alert':
            this.class = 'alert alert-danger';
            this.title = this.I18N.tr('alerta');
            this.icon = 'fa-window-close';
            this.btn = 'btn-alert';
            break;

          default:
            case 'alert':
            this.class = 'alert alert-danger';
            this.title = this.I18N.tr('alerta');
            this.icon = 'fa-window-close';
             this.btn = 'btn-alert';
            break;
        }
      } 
   }
}
