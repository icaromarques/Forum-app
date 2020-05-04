/**
 * @author Daniel Falci - 20/09/17
 **/

import {inject} from 'aurelia-framework';
import {VSViewCreator} from '../view/VSViewCreator';

@inject(VSViewCreator)
export class VSDialogService{


  constructor(viewCreator) {
    this.viewCreator = viewCreator;
  }

  /**
   * Cria um template dinâmicamente ancorando-o ao elemento ParentHtml especificado. Oferece 3 hooks para o processo (controller, criação e fechamento)
   * @param template O template a ser criado dinâmicamente
   * @param viewModelHandler Uma função a ser chamada após o bind e o attached
   * @param afterDialogCreatedHandler Função a ser chamada após a criação do elemento e sua respectiva associação ao elemento na tela
   * @param closeHandler Chamado após o unbind da tela.... ciclo de limpeza
   * @param parentHtml O elemento html no qual o novo template deve ser associado no DOM. Quando nulo indica que um novo elemento dentro do body deve ser utilizado
   * @returns {Promise} resolve chamado quando a janelinha chamar vs-dialog-data-ready e reject quando for chamado vs-dialog-closed
   */
  openDialog(template, viewModelHandler=null, afterDialogCreatedHandler = null, closeHandler = null, parentHtml = null){
    return new Promise((resolve, reject)=> {

      let dialog = this.viewCreator.createFromViewModel(template, parentHtml, null, 'div', viewModelHandler, closeHandler);

      if (afterDialogCreatedHandler!=null)
        afterDialogCreatedHandler(dialog);


      $(dialog.parentHtml).one('vs-dialog-data-ready', (este) => {
        resolve(este.originalEvent.detail);
        dialog.close(true)
      });

      $(dialog.parentHtml).one('vs-dialog-closed', (este) => {
        reject(este.originalEvent.detail);
        dialog.close(false);
      });
    });

  }

}
