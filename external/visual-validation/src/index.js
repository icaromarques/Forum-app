import {Configure} from './Configure';

export function configure(aurelia, configCallback){
  const instance = aurelia.container.get(Configure);
  if (configCallback !== undefined && typeof(configCallback) === 'function')
    configCallback(instance);

  aurelia.globalResources('./validar-binding-behavior');
}

export {ValidationController} from './ValidationController';
