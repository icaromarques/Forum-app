'use strict';

System.register(['aurelia-framework', 'aurelia-event-aggregator'], function (_export, _context) {
  "use strict";

  var bindable, inject, EventAggregator, _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, AutoVisibleTogglerCustomAttribute;

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
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }],
    execute: function () {
      _export('AutoVisibleTogglerCustomAttribute', AutoVisibleTogglerCustomAttribute = (_dec = inject(Element, EventAggregator), _dec(_class = (_class2 = function () {
        function AutoVisibleTogglerCustomAttribute(element, eventAggregator) {
          var _this = this;

          _classCallCheck(this, AutoVisibleTogglerCustomAttribute);

          _initDefineProp(this, 'target', _descriptor, this);

          this.isActive = false;

          _initDefineProp(this, 'tag', _descriptor2, this);

          this.element = element;
          $(window).on('click', function (event) {
            _this.onClickWindow(event);
          });
          this.eventAggregator = eventAggregator;
        }

        AutoVisibleTogglerCustomAttribute.prototype.bind = function bind() {
          var _this2 = this;

          if (!this.tag) this.tag = 'is-active';

          $(this.element).on('click', function (event) {
            if (!$(_this2.target).hasClass(_this2.tag)) {
              _this2.openToggler(event);
            } else {
              _this2.closeToggler();
            }
          });
          this.eventAggregator.subscribe('VS_CLOSE_ALL', function (event) {
            _this2.closeToggler();
          });
        };

        AutoVisibleTogglerCustomAttribute.prototype.openToggler = function openToggler(event) {
          $(this.target).addClass(this.tag);
          event.stopPropagation();
        };

        AutoVisibleTogglerCustomAttribute.prototype.closeToggler = function closeToggler() {
          $(this.target).removeClass(this.tag);
          var eventDetail = { target: this.target };
          this.element.dispatchEvent(new CustomEvent('toggle-close', { eventDetail: eventDetail, bubbles: true }));
        };

        AutoVisibleTogglerCustomAttribute.prototype.onClickWindow = function onClickWindow(event) {
          if (event.target != null && this.target != null && event.target != this.target && !$.contains(this.target, event.target)) {
            if ($(this.target).hasClass(this.tag)) this.closeToggler();
          }
        };

        return AutoVisibleTogglerCustomAttribute;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'target', [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'tag', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class));

      _export('AutoVisibleTogglerCustomAttribute', AutoVisibleTogglerCustomAttribute);
    }
  };
});