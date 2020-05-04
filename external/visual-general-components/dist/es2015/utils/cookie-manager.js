
export let CookieManager = class CookieManager {

  get(name) {
    var cookies = this.all();

    if (cookies) {
      return cookies[name];
    }
    return undefined;
  }

  set(name, value, options = {}) {
    var str = this.encode(name) + '=' + this.encode(value);

    if (value == null) {
      options.expiry = -1;
    }
    if (options != {}) {
      str = this._setOptions(str, options);
    }

    document.cookie = str;
  }

  _setOptions(str, options) {

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
  }

  all() {
    return this.parse(document.cookie);
  }

  clear() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  parse(str) {
    var obj = {};
    var pairs = str.split(/ *; */);
    var pair;

    if ('' == pairs[0]) {
      return obj;
    }

    for (let i = 0; i < pairs.length; ++i) {
      pair = pairs[i].split('=');
      obj[this.decode(pair[0])] = this.decode(pair[1]);
    }

    return obj;
  }

  encode(value) {
    try {
      return encodeURIComponent(value);
    } catch (e) {
      return null;
    }
  }

  decode(value) {
    try {
      return decodeURIComponent(value);
    } catch (e) {
      return null;
    }
  }
};