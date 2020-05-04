'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var CookieManager;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('CookieManager', CookieManager = function () {
        function CookieManager() {
          _classCallCheck(this, CookieManager);
        }

        CookieManager.prototype.get = function get(name) {
          var cookies = this.all();

          if (cookies) {
            return cookies[name];
          }
          return undefined;
        };

        CookieManager.prototype.set = function set(name, value) {
          var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

          var str = this.encode(name) + '=' + this.encode(value);

          if (value == null) {
            options.expiry = -1;
          }
          if (options != {}) {
            str = this._setOptions(str, options);
          }

          document.cookie = str;
        };

        CookieManager.prototype._setOptions = function _setOptions(str, options) {

          if (options.expiry && !options.expires) {
            options.expires = new Date(+new Date() + options.expiry);
          }
          if (options.path) {
            str += '; path=' + options.path;
          }
          if (options.domain) {
            str += '; domain=' + options.domain;
          }
          if (options.expires) {
            str += '; expires=' + options.expires.toUTCString();
          }
          if (options.secure) {
            str += '; secure';
          }

          return str;
        };

        CookieManager.prototype.all = function all() {
          return this.parse(document.cookie);
        };

        CookieManager.prototype.clear = function clear() {
          var cookies = document.cookie.split(";");
          for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
          }
        };

        CookieManager.prototype.parse = function parse(str) {
          var obj = {};
          var pairs = str.split(/ *; */);
          var pair;

          if ('' == pairs[0]) {
            return obj;
          }

          for (var i = 0; i < pairs.length; ++i) {
            pair = pairs[i].split('=');
            obj[this.decode(pair[0])] = this.decode(pair[1]);
          }

          return obj;
        };

        CookieManager.prototype.encode = function encode(value) {
          try {
            return encodeURIComponent(value);
          } catch (e) {
            return null;
          }
        };

        CookieManager.prototype.decode = function decode(value) {
          try {
            return decodeURIComponent(value);
          } catch (e) {
            return null;
          }
        };

        return CookieManager;
      }());

      _export('CookieManager', CookieManager);
    }
  };
});