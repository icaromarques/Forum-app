'use strict';

System.register(['aurelia-framework', './cookie-manager', './session-storage-helper'], function (_export, _context) {
  "use strict";

  var inject, CookieManager, SessionStorageHelper, _dec, _class, BrowserStorage;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_cookieManager) {
      CookieManager = _cookieManager.CookieManager;
    }, function (_sessionStorageHelper) {
      SessionStorageHelper = _sessionStorageHelper.SessionStorageHelper;
    }],
    execute: function () {
      _export('BrowserStorage', BrowserStorage = (_dec = inject(CookieManager), _dec(_class = function () {
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
      }()) || _class));

      _export('BrowserStorage', BrowserStorage);
    }
  };
});