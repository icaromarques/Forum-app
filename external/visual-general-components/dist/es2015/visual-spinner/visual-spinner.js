var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

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

export let VisualSpinnerCustomElement = (_dec = inject(Element, EventAggregator), _dec(_class = (_class2 = class VisualSpinnerCustomElement {

  constructor(element, ea) {
    _initDefineProp(this, 'loading', _descriptor, this);

    _initDefineProp(this, 'color', _descriptor2, this);

    _initDefineProp(this, 'customClass', _descriptor3, this);

    this.element = element;
    this.ea = ea;
    this.ea.subscribe('vs-spinner-load-start', () => this.loading = true);
    this.ea.subscribe('vs-spinner-load-end', () => this.loading = false);
  }
  created() {
    this.focusableElements = Array.from(this.element.parentNode.querySelectorAll('a:not([disabled]), button:not([disabled]), input:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'));
  }
  attached() {
    this.subscribe();
  }
  dettached() {
    this.unscribe();
  }
  loadingChanged(newValue, oldValue) {
    if (newValue) {
      this.focusableElements.map(el => el.setAttribute('disabled', true));
    } else {
      this.focusableElements.map(el => el.removeAttribute('disabled'));
    }
  }
  subscribe() {
    this.startLoad = this.ea.subscribe('vs-spinner-load-start', () => this.loading = true);
    this.endLoad = this.ea.subscribe('vs-spinner-load-end', () => this.loading = false);
  }
  unscribe() {
    this.startLoad.dispose();
    this.startLoad = null;
    this.endLoad.dispose();
    this.endLoad = null;
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'loading', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'color', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'customClass', [bindable], {
  enumerable: true,
  initializer: function () {
    return {
      overlay: '',
      spinner: ''
    };
  }
})), _class2)) || _class);