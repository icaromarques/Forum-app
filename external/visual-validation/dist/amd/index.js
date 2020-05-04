define(['exports', './ValidationController', './Configure'], function (exports, _ValidationController, _Configure) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ValidationController = undefined;
  exports.configure = configure;
  Object.defineProperty(exports, 'ValidationController', {
    enumerable: true,
    get: function () {
      return _ValidationController.ValidationController;
    }
  });
  function configure(aurelia, configCallback) {
    var instance = aurelia.container.get(_Configure.Configure);
    if (configCallback !== undefined && typeof configCallback === 'function') configCallback(instance);

    aurelia.globalResources('./validar-binding-behavior');
  }
});