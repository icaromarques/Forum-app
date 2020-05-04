"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var SessionStorageHelper;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("SessionStorageHelper", SessionStorageHelper = function () {
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
      }());

      _export("SessionStorageHelper", SessionStorageHelper);
    }
  };
});