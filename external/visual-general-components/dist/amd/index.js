define(['exports', './view/VSViewCreator', './dialog/VSDialogService', './utils/session-storage-helper', './utils/BrowserStorage', './utils/cookie-manager', './utils/VisualObjectUtils', './utils/geoprocessing/Haversine'], function (exports, _VSViewCreator, _VSDialogService, _sessionStorageHelper, _BrowserStorage, _cookieManager, _VisualObjectUtils, _Haversine) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  Object.defineProperty(exports, 'VSViewCreator', {
    enumerable: true,
    get: function () {
      return _VSViewCreator.VSViewCreator;
    }
  });
  Object.defineProperty(exports, 'VSDialogService', {
    enumerable: true,
    get: function () {
      return _VSDialogService.VSDialogService;
    }
  });
  Object.defineProperty(exports, 'SessionStorageHelper', {
    enumerable: true,
    get: function () {
      return _sessionStorageHelper.SessionStorageHelper;
    }
  });
  Object.defineProperty(exports, 'BrowserStorage', {
    enumerable: true,
    get: function () {
      return _BrowserStorage.BrowserStorage;
    }
  });
  Object.defineProperty(exports, 'CookieManager', {
    enumerable: true,
    get: function () {
      return _cookieManager.CookieManager;
    }
  });
  Object.defineProperty(exports, 'cloneObject', {
    enumerable: true,
    get: function () {
      return _VisualObjectUtils.cloneObject;
    }
  });
  Object.defineProperty(exports, 'Haversine', {
    enumerable: true,
    get: function () {
      return _Haversine.Haversine;
    }
  });
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
});