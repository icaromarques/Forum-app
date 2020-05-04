import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

describe('the Tester instance', () => {
  let component;

  beforeEach(() => {

    component = StageComponent
      .withResources('src/tester/testa')
      .inView('<testa></testa>');      

    component.bootstrap(aurelia => {
      aurelia.use.standardConfiguration();
    });
  });

  it('should test the components binding property', done => {
    component.create(bootstrap).then(() => {
      expect(component.viewModel.prop).toBe('name');
    });
  });
});
