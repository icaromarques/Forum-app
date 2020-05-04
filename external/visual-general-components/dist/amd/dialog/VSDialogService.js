define(['exports', 'aurelia-framework', '../view/VSViewCreator'], function (exports, _aureliaFramework, _VSViewCreator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VSDialogService = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var VSDialogService = exports.VSDialogService = (_dec = (0, _aureliaFramework.inject)(_VSViewCreator.VSViewCreator), _dec(_class = function () {
    function VSDialogService(viewCreator) {
      _classCallCheck(this, VSDialogService);

      this.viewCreator = viewCreator;
    }

    VSDialogService.prototype.openDialog = function openDialog(template) {
      var viewModelHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var afterDialogCreatedHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var _this = this;

      var closeHandler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var parentHtml = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

      return new Promise(function (resolve, reject) {

        var dialog = _this.viewCreator.createFromViewModel(template, parentHtml, null, 'div', viewModelHandler, closeHandler);

        if (afterDialogCreatedHandler != null) afterDialogCreatedHandler(dialog);

        $(dialog.parentHtml).one('vs-dialog-data-ready', function (este) {
          resolve(este.originalEvent.detail);
          dialog.close(true);
        });

        $(dialog.parentHtml).one('vs-dialog-closed', function (este) {
          reject(este.originalEvent.detail);
          dialog.close(false);
        });
      });
    };

    return VSDialogService;
  }()) || _class);
});