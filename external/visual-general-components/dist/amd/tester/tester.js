define(['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.TesterCustomElement = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
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

    var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21;

    var TesterCustomElement = exports.TesterCustomElement = (_class = function () {
        function TesterCustomElement() {
            _classCallCheck(this, TesterCustomElement);

            this.loading = false;
            this.spinnerClass = {
                overlay: '',
                spinner: 'central-spinner'
            };

            _initDefineProp(this, 'entity', _descriptor, this);

            _initDefineProp(this, 'description', _descriptor2, this);

            _initDefineProp(this, 'label', _descriptor3, this);

            _initDefineProp(this, 'placeholder', _descriptor4, this);

            _initDefineProp(this, 'emptyResult', _descriptor5, this);

            _initDefineProp(this, 'limit', _descriptor6, this);

            _initDefineProp(this, 'displayProperty', _descriptor7, this);

            _initDefineProp(this, 'statusProperty', _descriptor8, this);

            _initDefineProp(this, 'responseProperty', _descriptor9, this);

            _initDefineProp(this, 'onSelected', _descriptor10, this);

            _initDefineProp(this, 'query', _descriptor11, this);

            _initDefineProp(this, 'entity1', _descriptor12, this);

            _initDefineProp(this, 'description1', _descriptor13, this);

            _initDefineProp(this, 'label1', _descriptor14, this);

            _initDefineProp(this, 'placeholder1', _descriptor15, this);

            _initDefineProp(this, 'emptyResult1', _descriptor16, this);

            _initDefineProp(this, 'limit1', _descriptor17, this);

            _initDefineProp(this, 'displayProperty1', _descriptor18, this);

            _initDefineProp(this, 'responseProperty1', _descriptor19, this);

            _initDefineProp(this, 'query1', _descriptor20, this);

            _initDefineProp(this, 'style', _descriptor21, this);

            this.afterRequest = function () {
                return console.log('Function executed after request!');
            };

            setInterval(function () {}, 10000);
        }

        TesterCustomElement.prototype.request = function request() {
            var _this = this;

            var promise = new Promise(function (resolve, reject) {
                try {
                    setTimeout(function () {
                        resolve({
                            status: { code: 0 },
                            value: [{
                                "id": 1,
                                "name": "Superman",
                                "role": "Kryptonian Freak",
                                "ativo": true
                            }, {
                                "id": 2,
                                "name": "Wonderwoman",
                                "role": "Amazon Lover",
                                "ativo": true
                            }, {
                                "id": 3,
                                "name": "Flash",
                                "role": "Scarlet Speedster",
                                "ativo": true
                            }, {
                                "id": 4,
                                "name": "Batman",
                                "role": "Billionaire",
                                "ativo": true
                            }, {
                                "id": 5,
                                "name": "Aquaman",
                                "role": "Atlantis King",
                                "ativo": false
                            }, {
                                "id": 6,
                                "name": "Green Lantern",
                                "role": "Earth Protector",
                                "ativo": false
                            }, {
                                "id": 7,
                                "name": "Nightwing",
                                "role": "Night Avenger",
                                "ativo": true
                            }, {
                                "id": 8,
                                "name": "Black Canary",
                                "role": "Dark Bird",
                                "ativo": true
                            }, {
                                "id": 9,
                                "name": "White Canary",
                                "role": "Silent Assassin",
                                "ativo": true
                            }, {
                                "id": 10,
                                "name": "Atom",
                                "role": "Smallest Trouble",
                                "ativo": true
                            }, {
                                "id": 11,
                                "name": "Green Arrow",
                                "role": "Green Batman",
                                "ativo": false
                            }, {
                                "id": 12,
                                "name": "Cyborg",
                                "role": "Vic Stone",
                                "ativo": true
                            }, {
                                "id": 13,
                                "name": "Shazam",
                                "role": "God's Choosen",
                                "ativo": true
                            }, {
                                "id": 14,
                                "name": "Nuclear",
                                "role": "Atomic Blaster",
                                "ativo": false
                            }].filter(function (x) {
                                return x[_this.displayProperty].includes(_this.query);
                            })
                        });
                    }, 0);
                } catch (e) {
                    reject(e);
                }
            });
            return promise;
        };

        return TesterCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'entity', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'description', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return 'role';
        }
    }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'label', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return 'Hero';
        }
    }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'placeholder', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return 'Search for a hero ... ';
        }
    }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'emptyResult', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return 'No hero found !';
        }
    }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'limit', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return 4;
        }
    }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'displayProperty', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return "name";
        }
    }), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, 'statusProperty', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return "ativo";
        }
    }), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, 'responseProperty', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return "value";
        }
    }), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, 'onSelected', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, 'query', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, 'entity1', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return {
                "id": 1,
                "name": "Caio",
                "role": "Kryptonian Freak"
            };
        }
    }), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, 'description1', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return 'role';
        }
    }), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, 'label1', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return 'Other Hero';
        }
    }), _descriptor15 = _applyDecoratedDescriptor(_class.prototype, 'placeholder1', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return 'Search for another hero ... ';
        }
    }), _descriptor16 = _applyDecoratedDescriptor(_class.prototype, 'emptyResult1', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return 'No hero found !';
        }
    }), _descriptor17 = _applyDecoratedDescriptor(_class.prototype, 'limit1', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return 4;
        }
    }), _descriptor18 = _applyDecoratedDescriptor(_class.prototype, 'displayProperty1', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return "name";
        }
    }), _descriptor19 = _applyDecoratedDescriptor(_class.prototype, 'responseProperty1', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return "value";
        }
    }), _descriptor20 = _applyDecoratedDescriptor(_class.prototype, 'query1', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor21 = _applyDecoratedDescriptor(_class.prototype, 'style', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return {
                container: 'vs-ac',
                input: 'vs-ac-input',
                input_selected: 'vs-ac-input-selected',
                label: 'vs-ac-label',
                close_button: 'vs-ac-close',
                wrapper: 'vs-ac-list',
                list_container: 'vs-ac-list-container',
                loader: 'vs-ac-loader',
                empty_result: 'vs-ac-empty',
                disabled: 'disabled'
            };
        }
    })), _class);
});