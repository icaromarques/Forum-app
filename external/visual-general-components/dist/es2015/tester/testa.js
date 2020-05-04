var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

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

import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

export let Testa = (_dec = inject(EventAggregator), _dec(_class = (_class2 = class Testa {
  constructor(ea) {
    _initDefineProp(this, 'entity', _descriptor, this);

    this.loading = false;

    _initDefineProp(this, 'files', _descriptor2, this);

    this.ea = ea;
    setInterval(() => {}, 5000);
  }
  selecionado(selected) {
    this.logger(selected);
  }
  logger(item) {
    console.log(item);
  }

  removeLoader() {
    this.ea.publish('vs-spinner-load-start');
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'entity', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'files', [bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class);