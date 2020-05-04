"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.cloneObject = cloneObject;
function cloneObject(o) {
  var _out, v, _key;
  _out = Array.isArray(o) ? [] : {};
  for (_key in o) {
    v = o[_key];
    _out[_key] = (typeof v === "undefined" ? "undefined" : _typeof(v)) === "object" ? cloneObject(v) : v;
  }
  return _out;
}