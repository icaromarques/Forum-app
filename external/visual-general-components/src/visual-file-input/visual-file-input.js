/*
 * @author caiosilveira - 11/10/2017.
 */

import {inject, bindable, bindingMode} from 'aurelia-framework';

@inject(Element)
export class VisualFileInputCustomElement{
  @bindable({ defaultBindingMode: bindingMode.twoWay }) files;
  @bindable fileName;
  @bindable fileSize = "";
  // display instead of file name, amount of files for multiselect options
  @bindable multipleFilesAmount; 
  @bindable multiSelect = false;
  @bindable fileIsSelected = false;
  @bindable referenceElement;
  @bindable onSelectedCallback;
  @bindable clearAfterSelectedCallback = false;

  constructor(element){
    this.element = element;
  }
  onSelected(){
    if(!this.files.length) {
      this.clearSelection();
      return;
    }
    if(!this.multiSelect) { 
      this.fileName = this.files[0].name;
      this.fileSize = this.calcSize(this.files[0].size);
      this.fileIsSelected = true;
    } else {
      this.multipleFilesAmount = this.files.length;
      // Implement multiFilesSelection logic when needed;
    }
    if(this.onSelectedCallback) {
      this.onSelectedCallback();
      if(this.clearAfterSelectedCallback) this.clearSelection();
    } 
  }
  calcSize(size){
    if(size < 1024) {
      return size + 'bytes';
    } else if(size > 1024 && size < 1048576) {
      return (size/1024).toFixed(1) + 'KB';
    } else if(size > 1048576) {
      return (size/1048576).toFixed(1) + 'MB';
    }
  }
  clearSelection(){
    this.fileName = "";
    this.fileSize = "";
    this.fileIsSelected = false;
    this.referenceElement.value = '';
  }
}
