define(['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SelectByArrowCustomAttribute = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
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

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

  var SelectByArrowCustomAttribute = exports.SelectByArrowCustomAttribute = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = (_class2 = function () {
    function SelectByArrowCustomAttribute(element) {
      _classCallCheck(this, SelectByArrowCustomAttribute);

      _initDefineProp(this, 'targetElement', _descriptor, this);

      _initDefineProp(this, 'itemPattern', _descriptor2, this);

      _initDefineProp(this, 'selectedClass', _descriptor3, this);

      _initDefineProp(this, 'callback', _descriptor4, this);

      _initDefineProp(this, 'currentIndex', _descriptor5, this);

      _initDefineProp(this, 'selectedCallback', _descriptor6, this);

      this.lastIndex = -1;

      this.element = element;
    }

    SelectByArrowCustomAttribute.prototype.attached = function attached() {
      var _this = this;

      $(this.element).keydown(function (event) {
        return _this.onKeyDown(event);
      });
    };

    SelectByArrowCustomAttribute.prototype.updateClass = function updateClass(items) {
      $(items[this.lastIndex]).removeClass(this.selectedClass);
      $(items[this.currentIndex]).addClass(this.selectedClass);
    };

    SelectByArrowCustomAttribute.prototype.changeSelection = function changeSelection(event, direction) {
      if (this.callback) {
        this.callback(event, direction);
        return;
      }

      var items = $(this.targetElement).find(this.itemPattern);

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
    };

    SelectByArrowCustomAttribute.prototype.onKeyDown = function onKeyDown(event) {
      if (!this.targetElement) throw 'o target element não foi especificado';

      if (event.shiftKey || event.ctrlKey) return;

      var keyCode = event.keyCode;

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
    };

    return SelectByArrowCustomAttribute;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'targetElement', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'itemPattern', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 'li';
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'selectedClass', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 'selected';
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'callback', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'currentIndex', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return -1;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'selectedCallback', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  })), _class2)) || _class);
});