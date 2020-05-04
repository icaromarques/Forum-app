define(['exports', './VSBindingUtils', './BindingFunctions', 'aurelia-framework', './SigaValidationFactory'], function (exports, _VSBindingUtils, _BindingFunctions, _aureliaFramework, _SigaValidationFactory) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MonitoredComponent = exports.ValidationController = exports.ValidationError = undefined;

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

  var _dec, _class;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ValidationError = exports.ValidationError = function () {
    function ValidationError() {
      _classCallCheck(this, ValidationError);
    }

    ValidationError.prototype.addContext = function addContext(variableName, errorObject) {
      this[variableName] = errorObject;
    };

    ValidationError.prototype.removeContext = function removeContext(variableName) {
      this[variableName] = undefined;
    };

    return ValidationError;
  }();

  var ValidationController = exports.ValidationController = (_dec = (0, _aureliaFramework.inject)(_VSBindingUtils.VSBindingUtils, _aureliaFramework.Container, _SigaValidationFactory.MonitoredComponentFactory), _dec(_class = function () {
    function ValidationController(bindingUtils, container, componentFactory) {
      _classCallCheck(this, ValidationController);

      this.monitoredItems = [];
      this.errors = [];
      this.object = null;
      this.subscriptions = [];

      this.monitoredItems = [];
      this.errors = [];
      this.bindingUtils = bindingUtils;
      this.validationError = new ValidationError();
      this.subscriptions = [];
      this.errorMessageContext = 'ValidationError';
      this.container = container;
      this.componentFactory = componentFactory;
      this.built = false;
    }

    ValidationController.prototype.addMonitor = function addMonitor(monitoredComponent) {
      monitoredComponent.errors = this.errors;
      this.monitoredItems.push(monitoredComponent);
    };

    ValidationController.prototype.createContext = function createContext() {
      var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ValidationError';

      var v = { items: {} };
      this.errorMessageContext = context;
      this.container.registerInstance(context, v);
      return this;
    };

    ValidationController.prototype.validateComponents = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _this = this;

        for (var _len = arguments.length, componentes = Array(_len), _key = 0; _key < _len; _key++) {
          componentes[_key] = arguments[_key];
        }

        var valid, _loop, i;

        return regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                valid = true;
                _loop = regeneratorRuntime.mark(function _loop(i) {
                  var field, validacao;
                  return regeneratorRuntime.wrap(function _loop$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          field = _this.monitoredItems.find(function (m) {
                            return m.property == componentes[i];
                          });
                          _context.next = 3;
                          return field.validateComponent();

                        case 3:
                          validacao = _context.sent;

                          if (validacao) {
                            valid = false;
                          }

                        case 5:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _loop, _this);
                });
                i = 0;

              case 3:
                if (!(i < componentes.length)) {
                  _context2.next = 8;
                  break;
                }

                return _context2.delegateYield(_loop(i), 't0', 5);

              case 5:
                i++;
                _context2.next = 3;
                break;

              case 8:
                return _context2.abrupt('return', valid);

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee, this);
      }));

      function validateComponents() {
        return _ref.apply(this, arguments);
      }

      return validateComponents;
    }();

    ValidationController.prototype.getValidation = function getValidation(propertyName) {
      return this.monitoredItems.find(function (m) {
        return m.property == propertyName;
      });
    };

    ValidationController.prototype.registerElementBinding = function registerElementBinding(binding, element, options) {
      if (!options) options = {};
      var propertyInfo = (0, _BindingFunctions.getPropertyInfo)(binding.sourceExpression, binding.source);
      options.property = !options.property ? propertyInfo.propertyName : options.property;
      var m = this.componentFactory.create(options, element);
      m.propertyInfo = propertyInfo;
      m.options = options;
      this.addMonitor(m);
    };

    ValidationController.prototype.unregisterElementBinding = function unregisterElementBinding(binding, scope) {
      this.reset();
    };

    ValidationController.prototype.build = function build() {
      var _this2 = this;

      if (this.built) this.clear();
      this.monitoredItems.forEach(function (m) {
        _this2.validationError.addContext(m.property, m.errorObject);
        m.createBinding();
      });
      this.container.get(this.errorMessageContext).items = this.validationError;
      this.built = true;
    };

    ValidationController.prototype.clear = function clear() {
      this.subscriptions.forEach(function (este) {
        return este.dispose();
      });
      this.subscriptions.splice(0, this.subscriptions.length);
      this.monitoredItems.forEach(function (m) {
        return m.removeBinding();
      });
      this.errors.splice(0, this.errors.length);
    };

    ValidationController.prototype.reset = function reset() {
      this.subscriptions.forEach(function (este) {
        return este.dispose();
      });
      this.monitoredItems.forEach(function (m) {
        return m.removeBinding();
      });
      this.errors.splice(0, this.errors.length);
      this.subscriptions.splice(0, this.subscriptions.length);
      this.monitoredItems.splice(0, this.monitoredItems.length);
      this.validationError.removeContext(this.errorMessageContext);
    };

    ValidationController.prototype.validate = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var valid, i, m, isError;
        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.errors.splice(0, this.errors.length);
                valid = true;
                i = 0;

              case 3:
                if (!(i < this.monitoredItems.length)) {
                  _context3.next = 12;
                  break;
                }

                m = this.monitoredItems[i];
                _context3.next = 7;
                return m.validateComponent();

              case 7:
                isError = _context3.sent;

                if (isError) valid = false;

              case 9:
                i++;
                _context3.next = 3;
                break;

              case 12:
                return _context3.abrupt('return', { valid: valid });

              case 13:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      function validate() {
        return _ref2.apply(this, arguments);
      }

      return validate;
    }();

    return ValidationController;
  }()) || _class);

  var MonitoredComponent = exports.MonitoredComponent = function () {
    function MonitoredComponent(property) {
      var errorMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'pau';
      var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var validations = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      var errorObject = arguments[4];

      _classCallCheck(this, MonitoredComponent);

      this.property = property;
      this.element = element;
      this.errorMessage = errorMessage;
      this.validations = [];
      this.value = null;
      this.errorObject = { error: false, message: this.errorMessage };
      this.events = [];
      this.options = {};
      this.propertyInfo = null;
    }

    MonitoredComponent.prototype.addValidation = function addValidation(f) {
      this.validations.push(f);
      return this;
    };

    MonitoredComponent.prototype.validateComponent = function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var isError, i, f, ret;
        return regeneratorRuntime.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.value = this.element.value;
                isError = false;
                i = 0;

              case 3:
                if (!(i < this.validations.length)) {
                  _context4.next = 20;
                  break;
                }

                f = this.validations[i];
                _context4.prev = 5;
                _context4.next = 8;
                return f(this.value, this.element);

              case 8:
                ret = _context4.sent;

                isError = !ret;
                _context4.next = 15;
                break;

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4['catch'](5);

                isError = true;

              case 15:
                if (!isError) {
                  _context4.next = 17;
                  break;
                }

                return _context4.abrupt('break', 20);

              case 17:
                i++;
                _context4.next = 3;
                break;

              case 20:
                this.showError(isError);
                return _context4.abrupt('return', isError);

              case 22:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee3, this, [[5, 12]]);
      }));

      function validateComponent() {
        return _ref3.apply(this, arguments);
      }

      return validateComponent;
    }();

    MonitoredComponent.prototype.showError = function showError() {
      var _this3 = this;

      var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.errorObject.error = show;
      if (!show) {
        this.errors.splice(this.errors.findIndex(function (item) {
          return item.property == _this3.property;
        }), 1);
      } else {
        this.errors.push({ property: this.property, message: this.errorMessage });
      }
    };

    MonitoredComponent.prototype.valueChanged = function valueChanged(event) {
      this.validateComponent();
    };

    MonitoredComponent.prototype.setDefaultValue = function setDefaultValue() {
      this.value = this.element.value;
    };

    MonitoredComponent.prototype.createBinding = function createBinding() {
      this.listener = this.valueChanged.bind(this);
      $(this.element).on(this.events.join(' '), this.listener);
      this.setDefaultValue();
    };

    MonitoredComponent.prototype.removeBinding = function removeBinding() {
      this.errorObject.error = false;
      $(this.element).off(this.events.join(' '), this.listener);
    };

    return MonitoredComponent;
  }();
});