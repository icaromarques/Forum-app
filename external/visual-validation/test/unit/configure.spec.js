import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import {ValidationTest} from "./validation-test";
import $ from 'jquery';

describe('Validation', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources('test/unit/validation-test')
      .inView('<validation-test></validation-test>');
  });

  afterEach(() => {
      component.dispose();
  });

  it('alterar foco com campo vazio', (done) => {
    component.create(bootstrap).then(() => {
      const nomeElement = document.querySelector('#campoNome');
      const outroElement = document.querySelector('#campoOutro');

      nomeElement.focus();
      component.viewModel.nome = null;
      outroElement.focus();

      setTimeout(() => {
        expect(component.viewModel.validation.items['nome'].error).toBe(false);
        done();
      }, 3000);
    }).catch(e => {
      console.log(e.toString())
    });
  });

  it('submit formulário', (done) => {
    component.create(bootstrap).then(() => {
      const nomeElement = document.querySelector('#campoNome');
      const outroElement = document.querySelector('#campoOutro');

      component.viewModel.nome = null;
      document.getElementById('botaoForm').click();

      setTimeout(() => {
        expect(component.viewModel.validationSubmit.valid).toBe(true);
        done();
      }, 3000);
    }).catch(e => {
      console.log(e.toString())
    });
  });
});
