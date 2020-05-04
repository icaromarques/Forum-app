var _dec, _class;

import { inject } from 'aurelia-framework';
import { VSViewCreator } from '../view/VSViewCreator';

export let VSDialogService = (_dec = inject(VSViewCreator), _dec(_class = class VSDialogService {

  constructor(viewCreator) {
    this.viewCreator = viewCreator;
  }

  openDialog(template, viewModelHandler = null, afterDialogCreatedHandler = null, closeHandler = null, parentHtml = null) {
    return new Promise((resolve, reject) => {

      let dialog = this.viewCreator.createFromViewModel(template, parentHtml, null, 'div', viewModelHandler, closeHandler);

      if (afterDialogCreatedHandler != null) afterDialogCreatedHandler(dialog);

      $(dialog.parentHtml).one('vs-dialog-data-ready', este => {
        resolve(este.originalEvent.detail);
        dialog.close(true);
      });

      $(dialog.parentHtml).one('vs-dialog-closed', este => {
        reject(este.originalEvent.detail);
        dialog.close(false);
      });
    });
  }

}) || _class);