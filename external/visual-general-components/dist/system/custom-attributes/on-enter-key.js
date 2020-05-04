'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  "use strict";

  var bindable, inject, _dec, _class, _desc, _value, _class2, _descriptor, OnEnterKeyCustomAttribute;

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

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      inject = _aureliaFramework.inject;
    }],
    execute: function () {
      _export('OnEnterKeyCustomAttribute', OnEnterKeyCustomAttribute = (_dec = inject(Element), _dec(_class = (_class2 = function OnEnterKeyCustomAttribute(element) {
        var _this = this;

        _classCallCheck(this, OnEnterKeyCustomAttribute);

        _initDefineProp(this, 'callback', _descriptor, this);

        this.element = element;

        $(this.element).on('keyup', function (event) {
          if (event.keyCode !== 13) return;
          _this.callback();
        });
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'callback', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class));

      _export('OnEnterKeyCustomAttribute', OnEnterKeyCustomAttribute);
    }
  };
});