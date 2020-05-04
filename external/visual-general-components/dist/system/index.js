'use strict';

System.register(['./view/VSViewCreator', './dialog/VSDialogService', './utils/session-storage-helper', './utils/BrowserStorage', './utils/cookie-manager', './utils/VisualObjectUtils', './utils/geoprocessing/Haversine'], function (_export, _context) {
  "use strict";

  function configure(config) {
    config.aurelia.use.globalResources('./custom-attributes/on-enter-key');
    config.aurelia.use.globalResources('./custom-attributes/infinite-scroll');
    config.aurelia.use.globalResources('./custom-attributes/view-stack');
    config.aurelia.use.globalResources('./custom-attributes/auto-visible-toggler');
    config.aurelia.use.globalResources('./custom-attributes/select-by-arrow');
    config.aurelia.use.globalResources('./visual-auto-complete/visual-auto-complete');
    config.aurelia.use.globalResources('./visual-file-input/visual-file-input');
    config.aurelia.use.globalResources('./visual-spinner/visual-spinner');
  }

  _export('configure', configure);

  return {
    setters: [function (_viewVSViewCreator) {
      var _exportObj = {};
      _exportObj.VSViewCreator = _viewVSViewCreator.VSViewCreator;

      _export(_exportObj);
    }, function (_dialogVSDialogService) {
      var _exportObj2 = {};
      _exportObj2.VSDialogService = _dialogVSDialogService.VSDialogService;

      _export(_exportObj2);
    }, function (_utilsSessionStorageHelper) {
      var _exportObj3 = {};
      _exportObj3.SessionStorageHelper = _utilsSessionStorageHelper.SessionStorageHelper;

      _export(_exportObj3);
    }, function (_utilsBrowserStorage) {
      var _exportObj4 = {};
      _exportObj4.BrowserStorage = _utilsBrowserStorage.BrowserStorage;

      _export(_exportObj4);
    }, function (_utilsCookieManager) {
      var _exportObj5 = {};
      _exportObj5.CookieManager = _utilsCookieManager.CookieManager;

      _export(_exportObj5);
    }, function (_utilsVisualObjectUtils) {
      var _exportObj6 = {};
      _exportObj6.cloneObject = _utilsVisualObjectUtils.cloneObject;

      _export(_exportObj6);
    }, function (_utilsGeoprocessingHaversine) {
      var _exportObj7 = {};
      _exportObj7.Haversine = _utilsGeoprocessingHaversine.Haversine;

      _export(_exportObj7);
    }],
    execute: function () {}
  };
});