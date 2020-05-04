'use strict';

System.register(['aurelia-framework', 'aurelia-binding'], function (_export, _context) {
  "use strict";

  var inject, BindingEngine, ObserverLocator, _dec, _class, VSBindingUtils;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      BindingEngine = _aureliaFramework.BindingEngine;
    }, function (_aureliaBinding) {
      ObserverLocator = _aureliaBinding.ObserverLocator;
    }],
    execute: function () {
      _export('VSBindingUtils', VSBindingUtils = (_dec = inject(ObserverLocator, BindingEngine), _dec(_class = function () {
        function VSBindingUtils(observerLocator, bindingEngine) {
          _classCallCheck(this, VSBindingUtils);

          this.observerLocator = observerLocator;
          this.bindingEngine = bindingEngine;
        }

        VSBindingUtils.prototype.lowLevelObserver = function lowLevelObserver(context, variable, callback) {
          this.observerLocator.getObserver(context, variable).subscribe(callback);
        };

        VSBindingUtils.prototype.simpleObserver = function simpleObserver(context, variable, callback) {
          return this.bindingEngine.propertyObserver(context, variable).subscribe(callback);
        };

        VSBindingUtils.prototype.multiObserve = function multiObserve(properties, callback) {
          var subscriptions = [];
          for (var i = properties.length - 1; i >= 0; i--) {
            var prop = properties[i];
            subscriptions.push(this.observerLocator.getObserver(prop.context, prop.variable).subscribe(callback));
          }
          return subscriptions;
        };

        VSBindingUtils.prototype.whenAllChanged = function whenAllChanged(properties, callback) {
          var _this = this;

          var continuous = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

          var subscriptions = [];
          var promises = this.__createPromises(properties);
          Promise.all(promises).then(function () {
            callback();
            if (continuous) _this.whenAllChanged(properties, callback);
          });
        };

        VSBindingUtils.prototype.__createPromises = function __createPromises(properties) {
          var _this2 = this;

          var promises = [];

          var _loop = function _loop(i) {
            var prop = properties[i];
            promises.push(new Promise(function (resolve, reject) {
              _this2.observerLocator.getObserver(prop.context, prop.variable).subscribe(function () {
                resolve();
              });
            }));
          };

          for (var i = properties.length - 1; i >= 0; i--) {
            _loop(i);
          }
          return promises;
        };

        return VSBindingUtils;
      }()) || _class));

      _export('VSBindingUtils', VSBindingUtils);
    }
  };
});