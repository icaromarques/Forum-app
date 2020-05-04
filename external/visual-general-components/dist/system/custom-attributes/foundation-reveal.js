'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  "use strict";

  var inject, _dec, _class, FoundationRevealCustomAttribute;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }],
    execute: function () {
      _export('FoundationRevealCustomAttribute', FoundationRevealCustomAttribute = (_dec = inject(Element), _dec(_class = function () {
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
      }()) || _class));

      _export('FoundationRevealCustomAttribute', FoundationRevealCustomAttribute);
    }
  };
});