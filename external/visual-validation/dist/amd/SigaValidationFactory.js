define(['exports', './ValidationController', './Configure', 'aurelia-framework'], function (exports, _ValidationController, _Configure, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MonitoredComponentFactory = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var MonitoredComponentFactory = exports.MonitoredComponentFactory = (_dec = (0, _aureliaFramework.inject)(_Configure.Configure), _dec(_class = function () {
    function MonitoredComponentFactory(configure) {
      _classCallCheck(this, MonitoredComponentFactory);

      this.config = configure;
    }

    MonitoredComponentFactory.prototype.createAntigo = function createAntigo(options, element) {
      if (!options.tipo) options.tipo = this.inferType(element);

      var rule = this.config.get(options.tipo);
      var errorMessage = options.message ? options.message : this.getDefaultErrorMessage(rule);
      var monitoredComponent = new _ValidationController.MonitoredComponent(options.property, errorMessage, element);

      options = this.defaultOptions(options);
      monitoredComponent.events = options.events;

      return rule.funcao(monitoredComponent, options);
    };

    MonitoredComponentFactory.prototype.create = function create(options, element) {
      var rule = null;
      var tipo = null;

      if (!options.tipo) {
        this.config.listaRegras().forEach(function (value, key) {
          if ($.isFunction(key)) {
            tipo = key(element);
            if (tipo != undefined && tipo != null) {
              rule = value;
              return;
            }
          }
        });

        if (tipo == undefined || tipo == null) {
          rule = this.config.get(this.inferType(element));
        }
      } else {
        rule = this.config.get(options.tipo);
      }

      var errorMessage = options.message ? options.message : this.getDefaultErrorMessage(rule);
      var monitoredComponent = new _ValidationController.MonitoredComponent(options.property, errorMessage, element);

      options = this.defaultOptions(options);
      monitoredComponent.events = options.events;

      return rule.funcao(monitoredComponent, options);
    };

    MonitoredComponentFactory.prototype.inferType = function inferType(element) {
      var retorno = 'text';

      if ($(element).is('input')) {
        var elementType = $(element).attr('type');

        if (elementType) return elementType;
      }

      this.config.listaRegras().forEach(function (value, key) {
        if ($(element).is(key)) {
          retorno = key;
          return;
        }
      });

      return retorno;
    };

    MonitoredComponentFactory.prototype.getDefaultErrorMessage = function getDefaultErrorMessage(obj) {
      if (obj.mensagem) return obj.mensagem;else return 'textoObrigatorio.erroValidacao';
    };

    MonitoredComponentFactory.prototype.defaultOptions = function defaultOptions(options) {
      options.events = !options.events ? ['change', 'blur'] : options.events;
      options.obrigatorio = typeof options.obrigatorio == 'undefined' ? true : options.obrigatorio;
      return options;
    };

    return MonitoredComponentFactory;
  }()) || _class);
});