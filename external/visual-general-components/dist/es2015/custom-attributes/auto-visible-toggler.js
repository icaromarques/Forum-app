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

import { bindable, inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

export let AutoVisibleTogglerCustomAttribute = (_dec = inject(Element, EventAggregator), _dec(_class = (_class2 = class AutoVisibleTogglerCustomAttribute {

  constructor(element, eventAggregator) {
    _initDefineProp(this, 'target', _descriptor, this);

    this.isActive = false;

    _initDefineProp(this, 'tag', _descriptor2, this);

    this.element = element;
    $(window).on('click', event => {
      this.onClickWindow(event);
    });
    this.eventAggregator = eventAggregator;
  }

  bind() {
    if (!this.tag) this.tag = 'is-active';

    $(this.element).on('click', event => {
      if (!$(this.target).hasClass(this.tag)) {
        this.openToggler(event);
      } else {
        this.closeToggler();
      }
    });
    this.eventAggregator.subscribe('VS_CLOSE_ALL', event => {
      this.closeToggler();
    });
  }

  openToggler(event) {
    $(this.target).addClass(this.tag);
    event.stopPropagation();
  }

  closeToggler() {
    $(this.target).removeClass(this.tag);
    let eventDetail = { target: this.target };
    this.element.dispatchEvent(new CustomEvent('toggle-close', { eventDetail, bubbles: true }));
  }

  onClickWindow(event) {
    if (event.target != null && this.target != null && event.target != this.target && !$.contains(this.target, event.target)) {
      if ($(this.target).hasClass(this.tag)) this.closeToggler();
    }
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'target', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'tag', [bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class);