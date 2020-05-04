'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationController = undefined;
exports.configure = configure;

var _ValidationController = require('./ValidationController');

Object.defineProperty(exports, 'ValidationController', {
  enumerable: true,
  get: function get() {
    return _ValidationController.ValidationController;
  }
});

var _Configure = require('./Configure');

function configure(aurelia, configCallback) {
  var instance = aurelia.container.get(_Configure.Configure);
  if (configCallback !== undefined && typeof configCallback === 'function') configCallback(instance);

  aurelia.globalResources('./validar-binding-behavior');
}