var _dec, _class;

import { inject } from 'aurelia-framework';

export let FoundationRevealCustomAttribute = (_dec = inject(Element), _dec(_class = class FoundationRevealCustomAttribute {

  constructor(element) {
    this.foundationInstance = null;

    this.element = element;
    this.foundationInstance = new Foundation.Reveal($(element));
  }

  attached() {}

  detached() {
    try {
      let temp = this.foundationInstance.$overlay[0];
      if (temp && temp.parentNode) temp.parentNode.removeChild(temp);
    } catch (ex) {
      this.foundationInstance.close();
      this.foundationInstance.destroy();
    }
  }
}) || _class);