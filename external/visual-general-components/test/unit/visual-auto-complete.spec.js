import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import {DOM} from 'aurelia-pal';
import $ from 'jquery';

describe('the Auto-Complete instance', () => {
  let component;
  let model;
  let prop = 'name';
  let description = 'capital';
  let label = 'País';
  let placeholder = 'Procure por um país ... ';
  let emptyResult = 'Nenhum país encontrado...';

  beforeEach(() => {
    //jasmine.DEFAULT_TIMEOUT_INTERVAL = 1600;

    component = StageComponent
      .withResources('src/visual-auto-complete/visual-auto-complete')
      .inView('<h4>Auto Complete</h4> <visual-auto-complete query.two-way="query" request.bind="request" model.bind="model" prop.one-way="prop" description.one-way="description" label.one-way="label" placeholder.one-way="placeholder" empty-result.one-way="emptyResult"></visual-auto-complete>')
      .boundTo({query, request, model, prop, description, label, placeholder, emptyResult });
      

    component.bootstrap(aurelia => {
      aurelia.use.standardConfiguration();
    });
  });

  it('should test the components binding property', done => {

    component.create(bootstrap).then(() => {
      expect(component.viewModel.prop).toBe('name');

      /*setTimeout(function() {
        done();
      }, 200);*/

    });
  });

  /*afterEach(() => {
    component.dispose();
  });*/

});
