define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var SessionStorageHelper = exports.SessionStorageHelper = function () {
    function SessionStorageHelper() {
      _classCallCheck(this, SessionStorageHelper);
    }

    SessionStorageHelper.prototype.set = function set(key, value) {
      sessionStorage.setItem(key, value);
    };

    SessionStorageHelper.prototype.get = function get(key) {
      return sessionStorage.getItem(key);
    };

    SessionStorageHelper.prototype.delete = function _delete(key) {
      return sessionStorage.removeItem(key);
    };

    return SessionStorageHelper;
  }();
});