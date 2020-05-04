define(['exports', 'aurelia-framework', './cookie-manager', './session-storage-helper'], function (exports, _aureliaFramework, _cookieManager, _sessionStorageHelper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BrowserStorage = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var BrowserStorage = exports.BrowserStorage = (_dec = (0, _aureliaFramework.inject)(_cookieManager.CookieManager), _dec(_class = function () {
    function BrowserStorage(cookie) {
      _classCallCheck(this, BrowserStorage);

      this.cookie = cookie;
    }

    BrowserStorage.prototype.isLocalStorage = function isLocalStorage() {
      return 'localStorage' in window && window['localStorage'] !== null;
    };

    BrowserStorage.prototype.isSessionStorage = function isSessionStorage() {
      return 'sessionStorage' in window && window['sessionStorage'] !== null;
    };

    BrowserStorage.prototype.get = function get(storage, key) {
      switch (storage) {
        case 'local':
          if (this.isLocalStorage()) {
            return localStorage.getItem(key);
          } else {
            return undefined;
          }
          break;

        case 'session':
          if (this.isSessionStorage()) {
            return sessionStorage.getItem(key);
          } else {
            return undefined;
          }
          break;

        case 'cookie':
          return this.cookie.get(key);
          break;
      }
    };

    BrowserStorage.prototype.set = function set(storage, key, value) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      switch (storage) {
        case 'local':
          if (this.isLocalStorage()) {
            localStorage.setItem(key, value);
          }
          break;

        case 'session':
          if (this.isSessionStorage()) {
            sessionStorage.setItem(key, value);
          }
          break;

        case 'cookie':
          this.cookie.set(key, value, options);
          break;
      }
    };

    BrowserStorage.prototype.remove = function remove(storage, key) {
      switch (storage) {
        case 'local':
          if (this.isLocalStorage()) {
            localStorage.removeItem(key);
          }
          break;

        case 'session':
          if (this.isSessionStorage()) {
            return sessionStorage.removeItem(key);
          }
          break;
      }
    };

    BrowserStorage.prototype.clear = function clear(storage) {
      switch (storage) {
        case 'local':
          if (this.isLocalStorage()) {
            localStorage.clear();
          }
          break;

        case 'session':
          if (this.isSessionStorage()) {
            sessionStorage.clear();
          }
          break;

        case 'cookie':
          this.cookie.clear();
          break;
      }
    };

    return BrowserStorage;
  }()) || _class);
});