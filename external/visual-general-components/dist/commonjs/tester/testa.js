'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Testa = undefined;

var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2;

var _aureliaFramework = require('aurelia-framework');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var Testa = exports.Testa = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
  function Testa(ea) {
    _classCallCheck(this, Testa);

    _initDefineProp(this, 'entity', _descriptor, this);

    this.loading = false;

    _initDefineProp(this, 'files', _descriptor2, this);

    this.ea = ea;
    setInterval(function () {}, 5000);
  }

  Testa.prototype.selecionado = function selecionado(selected) {
    this.logger(selected);
  };

  Testa.prototype.logger = function logger(item) {
    console.log(item);
  };

  Testa.prototype.removeLoader = function removeLoader() {
    this.ea.publish('vs-spinner-load-start');
  };

  return Testa;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'entity', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'files', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class);