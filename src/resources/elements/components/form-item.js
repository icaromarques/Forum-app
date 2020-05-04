import {inject, bindable, Container, Optional} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
@inject(Element, Container, I18N)
export class FormItemCustomElement{
  @bindable label;
  @bindable labelErro;
  @bindable required;
  @bindable complementoText;
  @bindable ajuda;
  @bindable prop;
  @bindable errorContext = 'ValidationError';
  @bindable cleanable;
  @bindable placeholder;

  validationMessage = 'Conteudo inválido.';

  constructor(element, container, I18N){
    this.element = element;
    this.container = container;
    this.I18N = I18N;
  }

  attached(){
    this.validation = this.container.get(Optional.of(this.errorContext));
    if(this.placeholder) $(this.element).find('input').attr('placeholder', this.placeholder);
    this.generateTooltip();
  }

  generateTooltip(){
    let tooltip;
    if(this.label){
      if(this.label.indexOf('.') > 0){
        tooltip = this.label.substr(0, this.label.indexOf('.')) + ".tooltip" + this.label.substr(this.label.indexOf('.'));
      }else{
        tooltip = 'tooltip.' + this.label;
      }
      $(this.element).find('input, select, textarea').attr('title', this.I18N.tr(tooltip).indexOf('tooltip') < 0 ? this.I18N.tr(tooltip) : this.I18N.tr(this.label)).attr('data-toggle', 'tooltip').attr('data-placement','bottom');

    }
  }


}

