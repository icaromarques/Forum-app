export function configure(config) {
  config.aurelia.use.globalResources('./custom-attributes/on-enter-key');
  config.aurelia.use.globalResources('./custom-attributes/infinite-scroll');
  config.aurelia.use.globalResources('./custom-attributes/view-stack');
  config.aurelia.use.globalResources('./custom-attributes/auto-visible-toggler');
  config.aurelia.use.globalResources('./custom-attributes/select-by-arrow');
  config.aurelia.use.globalResources('./visual-auto-complete/visual-auto-complete');
  config.aurelia.use.globalResources('./visual-file-input/visual-file-input');
  config.aurelia.use.globalResources('./visual-spinner/visual-spinner');
}

export { VSViewCreator } from './view/VSViewCreator';
export { VSDialogService } from './dialog/VSDialogService';
export { SessionStorageHelper } from './utils/session-storage-helper';
export { BrowserStorage } from './utils/BrowserStorage';
export { CookieManager } from './utils/cookie-manager';
export { cloneObject } from './utils/VisualObjectUtils';
export { Haversine } from './utils/geoprocessing/Haversine';