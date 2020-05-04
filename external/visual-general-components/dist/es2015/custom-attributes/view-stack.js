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

export let ViewStackCustomAttribute = (_dec = inject(Element), _dec(_class = (_class2 = class ViewStackCustomAttribute {

  constructor(element) {
    _initDefineProp(this, 'managedItems', _descriptor, this);

    _initDefineProp(this, 'callback', _descriptor2, this);

    _initDefineProp(this, 'selectFirst', _descriptor3, this);

    this.selectedItem = null;
    this.activeClass = 'is-active';
    this.inactiveClass = 'hide';

    this.element = element;
  }

  bind() {
    if (this.managedItems) {
      this.managedItems.forEach(este => {
        $(este.trigger).on('click', event => {
          this.onClickElement(este);
        });
      });
    }
    if ((this.selectFirst == null || this.selectFirst) && this.managedItems) {
      this.onClickElement(this.managedItems[0]);
    }
  }

  toggle(element, show) {
    if (!show) {
      $(element.trigger).removeClass(this.activeClass);
      $(element.content).addClass(this.inactiveClass);
    } else {
      $(element.trigger).addClass(this.activeClass);
      $(element.content).removeClass(this.inactiveClass);
    }
  }

  onClickElement(element) {
    if (this.selectedItem != null) this.toggle(this.selectedItem, false);
    this.toggle(element, true);
    this.selectedItem = element;
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'managedItems', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'callback', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'selectFirst', [bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class);