define(['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VisualAutoCompleteCustomElement = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

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

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15;

  var VisualAutoCompleteCustomElement = exports.VisualAutoCompleteCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = (_class2 = function () {
    function VisualAutoCompleteCustomElement(element) {
      var _this = this;

      _classCallCheck(this, VisualAutoCompleteCustomElement);

      this.isSearching = false;
      this.displaySelectedInput = false;
      this.loading = false;

      _initDefineProp(this, 'limit', _descriptor, this);

      _initDefineProp(this, 'query', _descriptor2, this);

      _initDefineProp(this, 'entity', _descriptor3, this);

      _initDefineProp(this, 'statusProperty', _descriptor4, this);

      _initDefineProp(this, 'displayProperty', _descriptor5, this);

      _initDefineProp(this, 'description', _descriptor6, this);

      _initDefineProp(this, 'request', _descriptor7, this);

      _initDefineProp(this, 'onSuccessExecuted', _descriptor8, this);

      _initDefineProp(this, 'onSelectedCallback', _descriptor9, this);

      _initDefineProp(this, 'placeholder', _descriptor10, this);

      _initDefineProp(this, 'label', _descriptor11, this);

      _initDefineProp(this, 'emptyResult', _descriptor12, this);

      _initDefineProp(this, 'responseProperty', _descriptor13, this);

      _initDefineProp(this, 'changeEvent', _descriptor14, this);

      _initDefineProp(this, 'style', _descriptor15, this);

      this.element = element;
      document.addEventListener('click', function (event) {
        if (!_this.element.contains(event.target)) _this.blur();
      });
      document.addEventListener('keydown', function (event) {
        if (!_this.element.contains(event.target)) _this.blur();
      });
      this.element.addEventListener('keydown', function (event) {
        if (event.keyCode == 9 || event.shiftKey && event.keyCode == 9) _this.blur();else if (event.keyCode == 8 || event.keyCode == 46) _this.reset();else if (_this.entity[_this.displayProperty]) event.preventDefault();else if (_this.isSearching && (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13)) {
          var list = _this.element.getElementsByTagName('ul')[0];
          var first = list.firstElementChild;
          var maininput = _this.element.getElementsByTagName('input')[0];
          switch (event.keyCode) {
            case 13:
              document.activeElement.click();
              break;
            case 38:
              if (document.activeElement == (maininput || first)) {
                break;
              } else {
                if (document.activeElement.parentNode.previousElementSibling == null) {
                  maininput.focus();
                  break;
                }
                document.activeElement.parentNode.previousElementSibling.firstElementChild.focus();
              }
              break;
            case 40:
              if (first && document.activeElement == maininput) {
                first.firstElementChild.focus();
              } else {
                if (document.activeElement.parentNode.nextElementSibling == null) {
                  break;
                }
                document.activeElement.parentNode.nextElementSibling.firstElementChild.focus();
              }
              break;
          }
          event.preventDefault();
        }
      });
    }

    VisualAutoCompleteCustomElement.prototype.search = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _results, _results2, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.loading) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return');

              case 2:
                this.loading = true;
                this.isSearching = true;
                this.results = [];
                _context.prev = 5;
                _context.next = 8;
                return this.request();

              case 8:
                data = _context.sent;


                if (this.responseProperty) (_results = this.results).push.apply(_results, data[this.responseProperty]);else (_results2 = this.results).push.apply(_results2, data);

                if (!this.onSuccessExecuted) {
                  _context.next = 13;
                  break;
                }

                _context.next = 13;
                return this.onSuccessExecuted();

              case 13:
                this.loading = false;
                _context.next = 21;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context['catch'](5);

                this.results = null;
                this.loading = false;
                console.log(_context.t0);

              case 21:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 16]]);
      }));

      function search() {
        return _ref.apply(this, arguments);
      }

      return search;
    }();

    VisualAutoCompleteCustomElement.prototype.entityChanged = function entityChanged(newValue, oldValue) {
      if (newValue != oldValue) {
        if (this.changeEvent) this.changeEvent();
      }
    };

    VisualAutoCompleteCustomElement.prototype.blur = function blur() {
      this.isSearching = false;
      if (this.query && this.query.length) this.query = '';
      if (this.entitySelected && this.displaySelectedInput) this.entity = this.entitySelected;
      if (this.entity && !this.entity[this.displayProperty]) this.entitySelected = {};
    };

    VisualAutoCompleteCustomElement.prototype.reset = function reset(event) {
      this.isSearching = false;
      this.displaySelectedInput = false;
      this.entitySelected = {};
      this.entity = {};
    };

    VisualAutoCompleteCustomElement.prototype.selected = function selected(event, item) {
      if (this.statusProperty && !item[this.statusProperty]) {
        event.preventDefault();
        return;
      } else {
        this.blur();
        this.entity = item;
        this.entitySelected = item;
        if (this.onSelectedCallback) this.onSelectedCallback({ selected: this.entity });
      }
    };

    VisualAutoCompleteCustomElement.prototype.changeInput = function changeInput() {
      this.query = this.entity[this.displayProperty];
      this.entitySelected = Object.assign({}, this.entity);
      this.displaySelectedInput = true;
      this.entity = {};
    };

    return VisualAutoCompleteCustomElement;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'limit', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 3;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'query', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'entity', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'statusProperty', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'displayProperty', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'description', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'request', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'onSuccessExecuted', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'onSelectedCallback', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, 'placeholder', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, 'label', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, 'emptyResult', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, 'responseProperty', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, 'changeEvent', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, 'style', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return {
        container: '',
        input: '',
        input_selected: '',
        label: '',
        close_button: '',
        wrapper: '',
        list_container: '',
        list: '',
        loader: '',
        empty_result: '',
        disabled: ''
      };
    }
  })), _class2)) || _class);
});