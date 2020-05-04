var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

import { inject, bindable, bindingMode } from 'aurelia-framework';

export let VisualFileInputCustomElement = (_dec = inject(Element), _dec2 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = (_class2 = class VisualFileInputCustomElement {

  constructor(element) {
    _initDefineProp(this, 'files', _descriptor, this);

    _initDefineProp(this, 'fileName', _descriptor2, this);

    _initDefineProp(this, 'fileSize', _descriptor3, this);

    _initDefineProp(this, 'multipleFilesAmount', _descriptor4, this);

    _initDefineProp(this, 'multiSelect', _descriptor5, this);

    _initDefineProp(this, 'fileIsSelected', _descriptor6, this);

    _initDefineProp(this, 'referenceElement', _descriptor7, this);

    _initDefineProp(this, 'onSelectedCallback', _descriptor8, this);

    _initDefineProp(this, 'clearAfterSelectedCallback', _descriptor9, this);

    this.element = element;
  }
  onSelected() {
    if (!this.files.length) {
      this.clearSelection();
      return;
    }
    if (!this.multiSelect) {
      this.fileName = this.files[0].name;
      this.fileSize = this.calcSize(this.files[0].size);
      this.fileIsSelected = true;
    } else {
      this.multipleFilesAmount = this.files.length;
    }
    if (this.onSelectedCallback) {
      this.onSelectedCallback();
      if (this.clearAfterSelectedCallback) this.clearSelection();
    }
  }
  calcSize(size) {
    if (size < 1024) {
      return size + 'bytes';
    } else if (size > 1024 && size < 1048576) {
      return (size / 1024).toFixed(1) + 'KB';
    } else if (size > 1048576) {
      return (size / 1048576).toFixed(1) + 'MB';
    }
  }
  clearSelection() {
    this.fileName = "";
    this.fileSize = "";
    this.fileIsSelected = false;
    this.referenceElement.value = '';
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'files', [_dec2], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'fileName', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'fileSize', [bindable], {
  enumerable: true,
  initializer: function () {
    return "";
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'multipleFilesAmount', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'multiSelect', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'fileIsSelected', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'referenceElement', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'onSelectedCallback', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'clearAfterSelectedCallback', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
})), _class2)) || _class);