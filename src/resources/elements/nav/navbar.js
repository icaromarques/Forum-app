import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import { SessionHandler } from '../../utils/SessionHandler';
import { DialogHandler } from '../../utils/dialog/DialogHandler';
import {I18N} from 'aurelia-i18n';


@inject(SessionHandler, DialogHandler, I18N, Router)
export class NavbarCustomElement {

  constructor(sessionHandler,dialogHandler,I18N, router ) {
    this.sessionHandler = sessionHandler;
    this.dialogHandler = dialogHandler;
    this.router = router;   
    this.I18N = I18N;
  }


  async onClickLogin(){
    let params = {
      "title": this.I18N.tr("user.modal.title"),
      "inputLabel": this.I18N.tr("user.modal.inputLabel"),
      "size": "200",
      "button": this.I18N.tr("user.modal.button"),
      "buttonImage" : this.I18N.tr("user.modal.buttonImage")
    };

    let nome = await this.dialogHandler.openDialog(DialogHandler.MODAL_DEFAULT, params, false, false, 'sm');
    if (nome && nome.value != '') {
      this.sessionHandler.loginSaveSession(nome.value);
    } else {
      await this.dialogHandler.showAlert(this.I18N.tr("user.modal.empty"), 'error');
    }      
  }

  onClickLogout(){
    this.sessionHandler.loginCleanSession();
  }

  }
