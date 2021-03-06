var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

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

export let SelectByArrowCustomAttribute = (_dec = inject(Element), _dec(_class = (_class2 = class SelectByArrowCustomAttribute {

  constructor(element) {
    _initDefineProp(this, 'targetElement', _descriptor, this);

    _initDefineProp(this, 'itemPattern', _descriptor2, this);

    _initDefineProp(this, 'selectedClass', _descriptor3, this);

    _initDefineProp(this, 'callback', _descriptor4, this);

    _initDefineProp(this, 'currentIndex', _descriptor5, this);

    _initDefineProp(this, 'selectedCallback', _descriptor6, this);

    this.lastIndex = -1;

    this.element = element;
  }

  attached() {
    $(this.element).keydown(event => this.onKeyDown(event));
  }

  updateClass(items) {
    $(items[this.lastIndex]).removeClass(this.selectedClass);
    $(items[this.currentIndex]).addClass(this.selectedClass);
  }

  changeSelection(event, direction) {
    if (this.callback) {
      this.callback(event, direction);
      return;
    }

    let items = $(this.targetElement).find(this.itemPattern);

    if (items) {
      this.lastIndex = this.currentIndex;
      if (direction == 'up') {
        this.currentIndex -= 1;
        if (this.currentIndex < 0) this.currentIndex = items.length - 1;
      } else {
        this.currentIndex += 1;
        if (this.currentIndex >= items.length) {
          this.currentIndex = 0;
        }
      }

      this.updateClass(items);
    }
    event.preventDefault();
  }

  onKeyDown(event) {
    if (!this.targetElement) throw 'o target element não foi especificado';

    if (event.shiftKey || event.ctrlKey) return;

    let keyCode = event.keyCode;

    switch (keyCode) {
      case 37:
        this.changeSelection(event, 'up');

        break;
      case 38:
        this.changeSelection(event, 'up');
        break;
      case 39:
        this.changeSelection(event, 'down');

        break;
      case 40:
        this.changeSelection(event, 'down');

        break;
      case 13:
        if (this.selectedCallback) {
          this.selectedCallback({ item: $(this.targetElement).find(this.itemPattern + '.' + this.selectedClass) });
          return;
        } else {
          $(this.targetElement).find(this.itemPattern + '.' + this.selectedClass).click();
        }
        event.preventDefault();
        break;
    }
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'targetElement', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'itemPattern', [bindable], {
  enumerable: true,
  initializer: function () {
    return 'li';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'selectedClass', [bindable], {
  enumerable: true,
  initializer: function () {
    return 'selected';
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'callback', [bindable], {
  enumerable: true,
  initializer: function () {
    return null;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'currentIndex', [bindable], {
  enumerable: true,
  initializer: function () {
    return -1;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'selectedCallback', [bindable], {
  enumerable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class);