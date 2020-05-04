import {inject, bindable} from 'aurelia-framework';
import mask from 'jquery-mask-plugin';

const CEP = '00000-000';
const TELEFONE = '(00) 0000-0000';
const CELULAR = '(00) 00000-0000';
const CPF = '000.000.000-00';
const CNPJ = '00.000.000/0000-00';
const MONETARIO = '000.000.000.000.000,00';
const IP = '099.099.099.099';
const IP_PORTA = '099.099.099.099:09999';
const ANO_DATA = '0000';
const NUM_ORDEM = '00000';
const TEMPO_MINUTOS = '000';
const DATE = '00/00/0000';
const DATETIME = '00/00/0000 00:00:00';
const HORA = '00:00:00';
const NUM_DEZENAS  = '00';
const NUM_CENTENAS = '000';
const NUM_MILHARES = '0000';
const NUMANO = '09999/0000';;

@inject(Element)
export class MaskCustomAttribute{
  @bindable({ primaryProperty: true }) tipo;
  @bindable mascara;

  constructor(element){
    this.element = element;
  }

  attached(){
    if(this.tipo != undefined && this.tipo != null && this.tipo != ''){
      let retorno = this.getTipoMascara(this.tipo);
      setTimeout(() =>{
        $(this.element).mask(retorno, retorno == MONETARIO ? {reverse: true} : null);
      }, 100);

    }else if(this.mascara != undefined && this.mascara != null && this.mascara != ''){
      setTimeout(() =>{
        $(this.element).mask(this.mascara);
      }, 100);
    }else{
      console.log('Nenhuma máscara foi informada');
    }
  }

  getTipoMascara(tipoMascara) {
    switch ((tipoMascara).toUpperCase()) {
      case 'CEP': return CEP;
      case 'TELEFONE': return TELEFONE;
      case 'CELULAR': return CELULAR;
      case 'CPF': return CPF;
      case 'CNPJ': return CNPJ;
      case 'MONETARIO': return MONETARIO;
      case 'IP': return IP;
      case 'IP_PORTA': return IP_PORTA;
      case 'ANO_DATA': return ANO_DATA;
      case 'NUM_ORDEM' : return NUM_ORDEM;
      case 'TEMPO_MINUTOS' : return TEMPO_MINUTOS;
      case 'DATE' : return DATE;
      case 'DATETIME' : return DATETIME;
      case 'NUM_DEZENAS' : return NUM_DEZENAS;
      case 'NUM_CENTENAS' : return NUM_CENTENAS;
      case 'NUM_MILHARES' : return NUM_MILHARES;
      case 'HORA' : return HORA;
      case 'NUMANO' : return NUMANO;
      default: return null;
    }
  }
}
