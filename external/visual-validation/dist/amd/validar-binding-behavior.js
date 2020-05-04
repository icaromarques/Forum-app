define(['exports', './ValidationController', 'aurelia-dependency-injection', './BindingFunctions'], function (exports, _ValidationController, _aureliaDependencyInjection, _BindingFunctions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ValidarBindingBehavior = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ValidarBindingBehavior = exports.ValidarBindingBehavior = function () {
    function ValidarBindingBehavior() {
      _classCallCheck(this, ValidarBindingBehavior);
    }

    ValidarBindingBehavior.prototype.bind = function bind(binding, source, rules) {
      var element = (0, _BindingFunctions.getTargetDOMElement)(binding, source);

      rules = rules ? rules : {};

      var controller = null;
      if (rules instanceof _ValidationController.ValidationController) {
        controller = rules;
      } else {
        var validationController = rules.validationController ? rules.validationController : _ValidationController.ValidationController;
        controller = source.container.get(_aureliaDependencyInjection.Optional.of(validationController));
      }

      if (controller == null) throw 'Não foi possível encontrar uma instância do validationController no contexto informado';

      binding.validationController = controller;

      controller.registerElementBinding(binding, element, rules);
    };

    ValidarBindingBehavior.prototype.unbind = function unbind(binding, scope) {
      binding.validationController.unregisterElementBinding(binding, scope);
    };

    return ValidarBindingBehavior;
  }();
});