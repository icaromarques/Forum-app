'use strict';

System.register(['./ValidationController', 'aurelia-dependency-injection', './BindingFunctions'], function (_export, _context) {
  "use strict";

  var ValidationController, Optional, getTargetDOMElement, ValidarBindingBehavior;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_ValidationController) {
      ValidationController = _ValidationController.ValidationController;
    }, function (_aureliaDependencyInjection) {
      Optional = _aureliaDependencyInjection.Optional;
    }, function (_BindingFunctions) {
      getTargetDOMElement = _BindingFunctions.getTargetDOMElement;
    }],
    execute: function () {
      _export('ValidarBindingBehavior', ValidarBindingBehavior = function () {
        function ValidarBindingBehavior() {
          _classCallCheck(this, ValidarBindingBehavior);
        }

        ValidarBindingBehavior.prototype.bind = function bind(binding, source, rules) {
          var element = getTargetDOMElement(binding, source);

          rules = rules ? rules : {};

          var controller = null;
          if (rules instanceof ValidationController) {
            controller = rules;
          } else {
            var validationController = rules.validationController ? rules.validationController : ValidationController;
            controller = source.container.get(Optional.of(validationController));
          }

          if (controller == null) throw 'Não foi possível encontrar uma instância do validationController no contexto informado';

          binding.validationController = controller;

          controller.registerElementBinding(binding, element, rules);
        };

        ValidarBindingBehavior.prototype.unbind = function unbind(binding, scope) {
          binding.validationController.unregisterElementBinding(binding, scope);
        };

        return ValidarBindingBehavior;
      }());

      _export('ValidarBindingBehavior', ValidarBindingBehavior);
    }
  };
});