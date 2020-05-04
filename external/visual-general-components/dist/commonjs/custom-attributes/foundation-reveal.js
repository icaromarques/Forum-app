'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FoundationRevealCustomAttribute = undefined;

var _dec, _class;

var _aureliaFramework = require('aurelia-framework');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FoundationRevealCustomAttribute = exports.FoundationRevealCustomAttribute = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = function () {
  function FoundationRevealCustomAttribute(element) {
    _classCallCheck(this, FoundationRevealCustomAttribute);

    this.foundationInstance = null;

    this.element = element;
    this.foundationInstance = new Foundation.Reveal($(element));
  }

  FoundationRevealCustomAttribute.prototype.attached = function attached() {};

  FoundationRevealCustomAttribute.prototype.detached = function detached() {
    try {
      var temp = this.foundationInstance.$overlay[0];
      if (temp && temp.parentNode) temp.parentNode.removeChild(temp);
    } catch (ex) {
      this.foundationInstance.close();
      this.foundationInstance.destroy();
    }
  };

  return FoundationRevealCustomAttribute;
}()) || _class);