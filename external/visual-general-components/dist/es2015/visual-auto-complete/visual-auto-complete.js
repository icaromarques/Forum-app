var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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

import { inject, bindable } from 'aurelia-framework';

export let VisualAutoCompleteCustomElement = (_dec = inject(Element), _dec(_class = (_class2 = class VisualAutoCompleteCustomElement {

  constructor(element) {
    this.isSearching = false;
    this.displaySelectedInput = false;
    this.loading = false;

    _initDefineProp(this, 'limit', _descriptor, this);

    _initDefineProp(this, 'query', _descriptor2, this);

    _initDefineProp(this, 'entity', _descriptor3, this);

    _initDefineProp(this, 'statusProperty', _descriptor4, this);

    _initDefineProp(this, 'displayProperty', _descriptor5, this);

    _initDefineProp(this, 'description', _descriptor6, this);

    _initDefineProp(this, 'request', _descriptor7, this);

    _initDefineProp(this, 'onSuccessExecuted', _descriptor8, this);

    _initDefineProp(this, 'onSelectedCallback', _descriptor9, this);

    _initDefineProp(this, 'placeholder', _descriptor10, this);

    _initDefineProp(this, 'label', _descriptor11, this);

    _initDefineProp(this, 'emptyResult', _descriptor12, this);

    _initDefineProp(this, 'responseProperty', _descriptor13, this);

    _initDefineProp(this, 'changeEvent', _descriptor14, this);

    _initDefineProp(this, 'style', _descriptor15, this);

    this.element = element;
    document.addEventListener('click', event => {
      if (!this.element.contains(event.target)) this.blur();
    });
    document.addEventListener('keydown', event => {
      if (!this.element.contains(event.target)) this.blur();
    });
    this.element.addEventListener('keydown', event => {
      if (event.keyCode == 9 || event.shiftKey && event.keyCode == 9) this.blur();else if (event.keyCode == 8 || event.keyCode == 46) this.reset();else if (this.entity[this.displayProperty]) event.preventDefault();else if (this.isSearching && (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13)) {
        let list = this.element.getElementsByTagName('ul')[0];
        let first = list.firstElementChild;
        let maininput = this.element.getElementsByTagName('input')[0];
        switch (event.keyCode) {
          case 13:
            document.activeElement.click();
            break;
          case 38:
            if (document.activeElement == (maininput || first)) {
              break;
            } else {
              if (document.activeElement.parentNode.previousElementSibling == null) {
                maininput.focus();
                break;
              }
              document.activeElement.parentNode.previousElementSibling.firstElementChild.focus();
            }
            break;
          case 40:
            if (first && document.activeElement == maininput) {
              first.firstElementChild.focus();
            } else {
              if (document.activeElement.parentNode.nextElementSibling == null) {
                break;
              }
              document.activeElement.parentNode.nextElementSibling.firstElementChild.focus();
            }
            break;
        }
        event.preventDefault();
      }
    });
  }
  search() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (_this.loading) return;
      _this.loading = true;
      _this.isSearching = true;
      _this.results = [];
      try {
        let data = yield _this.request();

        if (_this.responseProperty) _this.results.push(...data[_this.responseProperty]);else _this.results.push(...data);

        if (_this.onSuccessExecuted) yield _this.onSuccessExecuted();
        _this.loading = false;
      } catch (e) {
        _this.results = null;
        _this.loading = false;
        console.log(e);
      }
    })();
  }
  entityChanged(newValue, oldValue) {
    if (newValue != oldValue) {
      if (this.changeEvent) this.changeEvent();
    }
  }
  blur() {
    this.isSearching = false;
    if (this.query && this.query.length) this.query = '';
    if (this.entitySelected && this.displaySelectedInput) this.entity = this.entitySelected;
    if (this.entity && !this.entity[this.displayProperty]) this.entitySelected = {};
  }
  reset(event) {
    this.isSearching = false;
    this.displaySelectedInput = false;
    this.entitySelected = {};
    this.entity = {};
  }
  selected(event, item) {
    if (this.statusProperty && !item[this.statusProperty]) {
      event.preventDefault();
      return;
    } else {
      this.blur();
      this.entity = item;
      this.entitySelected = item;
      if (this.onSelectedCallback) this.onSelectedCallback({ selected: this.entity });
    }
  }
  changeInput() {
    this.query = this.entity[this.displayProperty];
    this.entitySelected = Object.assign({}, this.entity);
    this.displaySelectedInput = true;
    this.entity = {};
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'limit', [bindable], {
  enumerable: true,
  initializer: function () {
    return 3;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'query', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'entity', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'statusProperty', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'displayProperty', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'description', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'request', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'onSuccessExecuted', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'onSelectedCallback', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, 'placeholder', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, 'label', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, 'emptyResult', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, 'responseProperty', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, 'changeEvent', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, 'style', [bindable], {
  enumerable: true,
  initializer: function () {
    return {
      container: '',
      input: '',
      input_selected: '',
      label: '',
      close_button: '',
      wrapper: '',
      list_container: '',
      list: '',
      loader: '',
      empty_result: '',
      disabled: ''
    };
  }
})), _class2)) || _class);