'use strict';

System.register(['aurelia-framework', 'aurelia-event-aggregator'], function (_export, _context) {
  "use strict";

  var inject, bindable, EventAggregator, _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, VisualSpinnerCustomElement;

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
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }],
    execute: function () {
      _export('VisualSpinnerCustomElement', VisualSpinnerCustomElement = (_dec = inject(Element, EventAggregator), _dec(_class = (_class2 = function () {
        function VisualSpinnerCustomElement(element, ea) {
          var _this = this;

          _classCallCheck(this, VisualSpinnerCustomElement);

          _initDefineProp(this, 'loading', _descriptor, this);

          _initDefineProp(this, 'color', _descriptor2, this);

          _initDefineProp(this, 'customClass', _descriptor3, this);

          this.element = element;
          this.ea = ea;
          this.ea.subscribe('vs-spinner-load-start', function () {
            return _this.loading = true;
          });
          this.ea.subscribe('vs-spinner-load-end', function () {
            return _this.loading = false;
          });
        }

        VisualSpinnerCustomElement.prototype.created = function created() {
          this.focusableElements = Array.from(this.element.parentNode.querySelectorAll('a:not([disabled]), button:not([disabled]), input:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'));
        };

        VisualSpinnerCustomElement.prototype.attached = function attached() {
          this.subscribe();
        };

        VisualSpinnerCustomElement.prototype.dettached = function dettached() {
          this.unscribe();
        };

        VisualSpinnerCustomElement.prototype.loadingChanged = function loadingChanged(newValue, oldValue) {
          if (newValue) {
            this.focusableElements.map(function (el) {
              return el.setAttribute('disabled', true);
            });
          } else {
            this.focusableElements.map(function (el) {
              return el.removeAttribute('disabled');
            });
          }
        };

        VisualSpinnerCustomElement.prototype.subscribe = function subscribe() {
          var _this2 = this;

          this.startLoad = this.ea.subscribe('vs-spinner-load-start', function () {
            return _this2.loading = true;
          });
          this.endLoad = this.ea.subscribe('vs-spinner-load-end', function () {
            return _this2.loading = false;
          });
        };

        VisualSpinnerCustomElement.prototype.unscribe = function unscribe() {
          this.startLoad.dispose();
          this.startLoad = null;
          this.endLoad.dispose();
          this.endLoad = null;
        };

        return VisualSpinnerCustomElement;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'loading', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'color', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'customClass', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return {
            overlay: '',
            spinner: ''
          };
        }
      })), _class2)) || _class));

      _export('VisualSpinnerCustomElement', VisualSpinnerCustomElement);
    }
  };
});