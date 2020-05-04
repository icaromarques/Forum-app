'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfiniteScrollCustomAttribute = undefined;

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _class2, _temp;

var _aureliaFramework = require('aurelia-framework');
var _perfectScroll =  require('perfect-scrollbar');

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

var InfiniteScrollCustomAttribute = exports.InfiniteScrollCustomAttribute = (_class = (_temp = _class2 = function () {
  function InfiniteScrollCustomAttribute(element) {
    var _this = this;

    _classCallCheck(this, InfiniteScrollCustomAttribute);

    _initDefineProp(this, 'callback', _descriptor, this);

    _initDefineProp(this, 'active', _descriptor2, this);

    _initDefineProp(this, 'noMorePages', _descriptor3, this);

    this.element = element;

    $(this.element).on('ps-y-reach-end', function () {
      if (_this.active && _this.callback) {
        _this.callback();
      }
    });
  }

  InfiniteScrollCustomAttribute.prototype.activeChanged = function activeChanged(newValue, oldValue) {
    /*$(this.element).perfectScrollbar('update');*/    
  //  const ps = new _perfectScroll(this.element.id);
   // ps.update();
  };

  return InfiniteScrollCustomAttribute;
}(), _class2.inject = [Element], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'callback', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'active', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'noMorePages', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
})), _class);
