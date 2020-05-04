'use strict';

System.register(['aurelia-framework', '../view/VSViewCreator'], function (_export, _context) {
  "use strict";

  var inject, VSViewCreator, _dec, _class, VSDialogService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_viewVSViewCreator) {
      VSViewCreator = _viewVSViewCreator.VSViewCreator;
    }],
    execute: function () {
      _export('VSDialogService', VSDialogService = (_dec = inject(VSViewCreator), _dec(_class = function () {
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
      }()) || _class));

      _export('VSDialogService', VSDialogService);
    }
  };
});