'use strict';

System.register(['./Configure', './ValidationController'], function (_export, _context) {
  "use strict";

  var Configure;
  function configure(aurelia, configCallback) {
    var instance = aurelia.container.get(Configure);
    if (configCallback !== undefined && typeof configCallback === 'function') configCallback(instance);

    aurelia.globalResources('./validar-binding-behavior');
  }

  _export('configure', configure);

  return {
    setters: [function (_Configure) {
      Configure = _Configure.Configure;
    }, function (_ValidationController) {
      var _exportObj = {};
      _exportObj.ValidationController = _ValidationController.ValidationController;

      _export(_exportObj);
    }],
    execute: function () {}
  };
});