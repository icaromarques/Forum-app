define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Configure = exports.Configure = function () {
    function Configure() {
      _classCallCheck(this, Configure);

      this.rules = new Map();

      this.rules.set('text', { mensagem: 'errorMessages.erroCampoTexto', funcao: this.addCampoTexto });
      this.rules.set('number', { mensagem: 'errorMessages.erroCampoNumerico', funcao: this.addCampoNumerico });
      this.rules.set('select', { mensagem: 'errorMessages.erroCampoSelect', funcao: this.addCampoSelect });
      this.rules.set('password', { mensagem: 'errorMessages.erroCampoTexto', funcao: this.addCampoTexto });
      this.rules.set('entity-selector-busca', { mensagem: 'errorMessages.erroCampoTexto', funcao: this.addCampoSelectorBusca });
    }

    Configure.prototype.get = function get(key) {
      return this.rules.get(key);
    };

    Configure.prototype.set = function set(key, value) {
      if (this.rules.get(key)) {
        this.rules.delete(key);
        this.rules.set(key, value);
      } else {
        this.rules.set(key, value);
      }

      return this.rules.get(key);
    };

    Configure.prototype.setRegras = function setRegras(map) {
      var _this = this;

      if (map != undefined && map != null) {
        map.forEach(function (value, key) {
          _this.set(key, value);
        });
      }
    };

    Configure.prototype.listaRegras = function listaRegras() {
      return this.rules;
    };

    Configure.prototype.addCampoSelect = function addCampoSelect(m, options) {
      m.addValidation(function (value, element) {
        return !$(element.options[element.selectedIndex]).is('[invalid-option]');
      });
      return m;
    };

    Configure.prototype.addCampoTexto = function addCampoTexto(m, options) {
      var maxLength = true;
      options.maxLength = options.maxLength ? options.maxLength : 255;
      options.minLength = typeof options.minLength == 'undefined' ? -1 : options.minLength;

      m.addValidation(function (value) {
        var retorno = true;

        if (options.obrigatorio) retorno = typeof value != 'undefined' && value != null && value.length > 0 ? true : false;
        if (retorno && maxLength) retorno = value.length <= options.maxLength ? true : false;

        if (retorno && options.minLength > 0) retorno = value.length >= options.minLength ? true : false;

        return retorno;
      });

      return m;
    };

    Configure.prototype.addCampoNumerico = function addCampoNumerico(m, options) {
      options.min = typeof options.min == 'undefined' ? 0 : options.min;
      options.max = typeof options.max == 'undefined' ? 0x80000000 : options.max;
      var fIsInt = !options.hasOwnProperty('decimal') || options.decimal == "false";

      if (options.obrigatorio) {
        m.addValidation(function (value) {

          return value !== null && value !== undefined && value !== "" && (Number.isInteger(Number(value)) || !fIsInt && Number.isFinite(Number(value))) && Number(value) >= options.min && Number(value) <= options.max;
        });
      }
      return m;
    };

    Configure.prototype.addCampoSelectorBusca = function addCampoSelectorBusca(m, options) {
      m.addValidation(function (value) {
        var retorno = true;

        if (options.obrigatorio) retorno = typeof value != 'undefined' && value != null && value.id != null ? true : false;

        return retorno;
      });

      return m;
    };

    return Configure;
  }();
});