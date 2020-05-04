import {VSDialogService, cloneObject} from 'visual-general-components';
import {inject} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {Confirm} from 'resources/utils/dialog/confirm';
import {Alert} from 'resources/utils/dialog/alert';

@inject(VSDialogService, DialogService)
export class DialogHandler{
  defaultOptions={
    keyboard:false,
    backdrop:'static',
  }

  
  static MODAL_DEFAULT = 'resources/elements/modal/modal-default';
  static MODAL_POST = 'resources/elements/modal/modal-post';

  constructor(vsDialogService, dialogService){
    this.vsDialogService = vsDialogService;
    this.dialogService = dialogService;
  }

  createContainer(size){
    let fade = document.createElement('div');
    $(fade).addClass('modal fade');

    let modal = document.createElement('div');
    if (size === 'sm')
      $(modal).addClass('modal-dialog modal-sm');
    else if (size === 'md')
      $(modal).addClass('modal-dialog modal-md');
    else if (size === 'print')
      $(modal).addClass('modal-dialog modal-print');
    else if (size === 'lg')
      $(modal).addClass('modal-dialog modal-lg');
    else {
      $(modal).addClass('modal-dialog');
      $(modal).css( "max-width", size );
    }

    fade.appendChild(modal);
    return {fade, modal};
  }

  openDialog(template, params=null, closeOnEsc=false, closeOnClickOutside=true, size='lg'){
    let qOptions = Object.assign({}, cloneObject(this.defaultOptions), {keyboard:closeOnEsc, backdrop:closeOnClickOutside?'dynamic':'static'});
    let elements = this.createContainer(size);

    let detail = null;

    return new Promise((resolve, reject)=>{
      this.vsDialogService.openDialog(template,
        (viewModel)=>{
          if (params!= null && viewModel.setParams)
            viewModel.setParams(params);

          $(elements.fade).on('hide.bs.modal', ()=>{
            if (viewModel.onClose)
              viewModel.onClose();
          });

        },
        (dialog)=>{
          $(dialog.parentHtml).on('vs-dialog-close', (event)=>{
            detail = event.detail;
            $(elements.fade).modal('hide');
          });
          $(elements.fade).on('shown.bs.modal', ()=>{
          });
          $(elements.fade).on('hide.bs.modal', ()=>{
            dialog.close();
            $(elements.fade).remove();

            resolve(detail);
          });
          $(elements.fade).modal(qOptions);
        },
        (el)=>{
        },
        elements.modal);
    })
  }

  async askConfirm(message){
    let response = await this.dialogService.open({viewModel: Confirm, model: message })
      .then(openDialogResult =>{
        return openDialogResult.closeResult;
      });
    return (!response.wasCancelled);
  }

  async showAlert(message, classtype = "", disappear=0){
    let response = await this.dialogService.open({viewModel: Alert, model: {text: message, class: classtype}})
      .then(openDialogResult => {
        if (disappear !== 0) {
          let timeout;
          this.timeout(openDialogResult,timeout,disappear);
        }
        return openDialogResult.closeResult;
      });
    return ((!response.wasCancelled));
  }

 timeout(openDialogResult, timeout, time) {
   clearTimeout(timeout);
   timeout = setTimeout(() => {
     openDialogResult.controller.ok();
   }, time * 1000);
   // tempo em segundos
 }
}
