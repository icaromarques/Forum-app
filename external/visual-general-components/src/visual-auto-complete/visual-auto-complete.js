/*
 * @author by caiosilveira - 20/09/2017.
 */

import {inject, bindable} from 'aurelia-framework';

@inject(Element)
export class VisualAutoCompleteCustomElement {
  isSearching = false;
  displaySelectedInput = false;
  loading = false;
  entitySelected;
  results;
  // Define limit of items displayed on the list (default: 3).
  @bindable limit = 3;
  // Define the search query to be captured by the parent controller.
  @bindable query;
  // Define the entity object value.
  @bindable entity;
  // Define the entity property which will handle entity selectability.
  @bindable statusProperty;
  // Define the entity property which will be displayed on-selection.
  @bindable displayProperty;
  // Define the entity property to be displayed as description hint below item.
  @bindable description;
  // Define a search function for the component.
  @bindable request;
  // Define a function to be executed after server search.
  @bindable onSuccessExecuted;
  // Define a function to be executed on selection.
  @bindable onSelectedCallback;
  // Define a custom placeholder to be displayed on main input.
  @bindable placeholder;
  // Define a label to be displayed right above input.
  @bindable label;
  // Define an empty result message to be displayed on empty results list.
  @bindable emptyResult;
  // Define a custom property to be captured on the response object (default = null).
  @bindable responseProperty;
  @bindable changeEvent;
  // Define a custom style for the element, if don't component can and will be broken :'(
  @bindable style = {
    container: '',
    input: '',
    input_selected: '',
    label: '',
    close_button: '',
    wrapper: '',
    list_container: '',
    list: '',
    loader: '',
    empty_result: '',
    disabled: ''
  };


	constructor(element){
    this.element = element;
    document.addEventListener('click', event => {
      if (!this.element.contains(event.target)) this.blur();
    });
    document.addEventListener('keydown', event => {
      if (!this.element.contains(event.target) ) this.blur();
    });
    this.element.addEventListener('keydown', event => {
      if(event.keyCode == 9 || (event.shiftKey && event.keyCode == 9)) this.blur();
      else if(event.keyCode == 8 || event.keyCode == 46) this.reset();
      else if(this.entity[this.displayProperty]) event.preventDefault();
      else if(this.isSearching && (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13)) {
        let list = this.element.getElementsByTagName('ul')[0];
        let first = list.firstElementChild; 
        let maininput = this.element.getElementsByTagName('input')[0];
        switch (event.keyCode) {
          case 13:
          document.activeElement.click();
          break;
          case 38:
          if (document.activeElement == (maininput || first)) { break; }
          else { 
            if (document.activeElement.parentNode.previousElementSibling == null) {
              maininput.focus();
              break;
            }
            document.activeElement.parentNode.previousElementSibling.firstElementChild.focus(); 
          }
          break;
          case 40:
          if (first && document.activeElement == maininput) { first.firstElementChild.focus(); } 
          else { 
            if (document.activeElement.parentNode.nextElementSibling == null) {break;}
            document.activeElement.parentNode.nextElementSibling.firstElementChild.focus(); 
          }
          break;
        }
        event.preventDefault();
      }
    });
  }
  async search(){
    if(this.loading) return;
    this.loading = true;
    this.isSearching = true;
    this.results = [];
    try {
      let data = await this.request();
      
      if(this.responseProperty)
        this.results.push(...data[this.responseProperty]);
      else
        this.results.push(...data);

      if(this.onSuccessExecuted) await this.onSuccessExecuted();
      this.loading = false;
    }
    catch(e){
      this.results = null;
      this.loading = false;
      console.log(e);
    }
  }
  entityChanged(newValue, oldValue){
    if (newValue != oldValue){
      if(this.changeEvent) this.changeEvent();
    }
  }
  blur(){
    this.isSearching = false;
    if(this.query && this.query.length) this.query = '';
    if(this.entitySelected && this.displaySelectedInput) this.entity = this.entitySelected;
    if(this.entity && !this.entity[this.displayProperty]) this.entitySelected = {};
  }
  reset(event){
    this.isSearching = false;
    this.displaySelectedInput = false;
    this.entitySelected = {};
    this.entity = {};
  }
  selected(event, item){
    if (this.statusProperty && !item[this.statusProperty]){
      event.preventDefault();
      return;
    }
    else {
      this.blur();
      this.entity = item;
      this.entitySelected = item;
      if(this.onSelectedCallback) this.onSelectedCallback({selected: this.entity });
    }
  }
  changeInput(){
    this.query = this.entity[this.displayProperty];
    this.entitySelected = Object.assign({} , this.entity);
    this.displaySelectedInput = true;
    this.entity = {};
  }
}
