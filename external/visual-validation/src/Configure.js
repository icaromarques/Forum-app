/**
 * Entidade responsável por configurar as regras de validação
 */
export class Configure {
  rules = new Map();

  constructor() {
    this.rules.set('text', {mensagem: 'errorMessages.erroCampoTexto', funcao: this.addCampoTexto});
    this.rules.set('number', {mensagem: 'errorMessages.erroCampoNumerico', funcao: this.addCampoNumerico});
    this.rules.set('select', {mensagem: 'errorMessages.erroCampoSelect', funcao: this.addCampoSelect});
    this.rules.set('password', {mensagem: 'errorMessages.erroCampoTexto', funcao: this.addCampoTexto});
    this.rules.set('entity-selector-busca', {mensagem: 'errorMessages.erroCampoTexto', funcao: this.addCampoSelectorBusca});
  }

  get(key) {
    return this.rules.get(key);
  }

  set(key, value) {
    if(this.rules.get(key)){
      this.rules.delete(key);
  	  this.rules.set(key, value);
  	}else{
  	  this.rules.set(key, value);
  	}

    return this.rules.get(key);
  }

  setRegras(map){
    if(map != undefined && map != null){
      map.forEach((value, key) => {
        this.set(key, value);
      });
    }
  }

  listaRegras(){
    return this.rules;
  }

  addCampoSelect(m, options){
    m.addValidation((value, element)=>{
      return !($(element.options[element.selectedIndex]).is('[invalid-option]'));
    })
    return m;
  }

  addCampoTexto(m, options){
    let maxLength = true;
    options.maxLength = options.maxLength ? options.maxLength : 255;
    options.minLength = typeof(options.minLength) == 'undefined'?(-1):options.minLength;

    m.addValidation((value)=>{
      let retorno = true;

      if (options.obrigatorio)
        retorno = (typeof(value)!='undefined' && value!=null && value.length > 0)?true:false;
      if (retorno && maxLength)
        retorno = (value.length <= options.maxLength)?true:false;

      if (retorno && options.minLength >0)
        retorno = (value.length >= options.minLength)?true:false;

      return retorno;
    });

    return m;
  }

  addCampoNumerico(m, options){
    options.min = typeof(options.min) == 'undefined'?0:options.min;
    options.max = typeof(options.max) == 'undefined'?0x80000000:options.max;
    let fIsInt = !options.hasOwnProperty('decimal') || options.decimal=="false";

    if (options.obrigatorio){
      m.addValidation((value)=>{

        return value !== null &&
                value !== undefined &&
                value !== "" &&
                (Number.isInteger(Number(value)) || (!fIsInt && Number.isFinite(Number(value)))) &&
                Number(value) >= options.min &&
                Number(value) <= options.max
      })
    }
    return m;
  }

  addCampoSelectorBusca(m, options){
    m.addValidation((value)=>{
      let retorno = true;

      if (options.obrigatorio)
        retorno = (typeof(value)!='undefined' && value!=null && value.id != null)?true:false;

      return retorno;
    });

    return m;
  }
}
