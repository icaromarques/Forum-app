'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;

var _VSViewCreator = require('./view/VSViewCreator');

Object.defineProperty(exports, 'VSViewCreator', {
  enumerable: true,
  get: function get() {
    return _VSViewCreator.VSViewCreator;
  }
});

var _VSDialogService = require('./dialog/VSDialogService');

Object.defineProperty(exports, 'VSDialogService', {
  enumerable: true,
  get: function get() {
    return _VSDialogService.VSDialogService;
  }
});

var _sessionStorageHelper = require('./utils/session-storage-helper');

Object.defineProperty(exports, 'SessionStorageHelper', {
  enumerable: true,
  get: function get() {
    return _sessionStorageHelper.SessionStorageHelper;
  }
});

var _BrowserStorage = require('./utils/BrowserStorage');

Object.defineProperty(exports, 'BrowserStorage', {
  enumerable: true,
  get: function get() {
    return _BrowserStorage.BrowserStorage;
  }
});

var _cookieManager = require('./utils/cookie-manager');

Object.defineProperty(exports, 'CookieManager', {
  enumerable: true,
  get: function get() {
    return _cookieManager.CookieManager;
  }
});

var _VisualObjectUtils = require('./utils/VisualObjectUtils');

Object.defineProperty(exports, 'cloneObject', {
  enumerable: true,
  get: function get() {
    return _VisualObjectUtils.cloneObject;
  }
});

var _Haversine = require('./utils/geoprocessing/Haversine');

Object.defineProperty(exports, 'Haversine', {
  enumerable: true,
  get: function get() {
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