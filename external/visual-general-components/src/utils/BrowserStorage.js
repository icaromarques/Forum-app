/**
 * @author Daniel Falci - 16/10/17
 **/
import {inject} from 'aurelia-framework';
import {CookieManager} from './cookie-manager';
import {SessionStorageHelper} from './session-storage-helper';

@inject(CookieManager)
export class BrowserStorage {

  constructor(cookie) {
    this.cookie = cookie;
  }

  isLocalStorage() {
    return 'localStorage' in window && window['localStorage'] !== null;
  }

  isSessionStorage() {
    return 'sessionStorage' in window && window['sessionStorage'] !== null;
  }

  get(storage, key) {
    switch (storage) {
      case 'local':
        if (this.isLocalStorage()) {
          return localStorage.getItem(key);
        } else {
          return undefined;
        }
        break;

      case 'session':
        if (this.isSessionStorage()) {
          return sessionStorage.getItem(key);
        } else {
          return undefined;
        }
        break;

      case 'cookie':
        return this.cookie.get(key);
        break;
    }
  }

  set(storage, key, value, options = {}) {
    switch (storage) {
      case 'local':
        if (this.isLocalStorage()) {
          localStorage.setItem(key, value);
        }
        break;

      case 'session':
        if (this.isSessionStorage()) {
          sessionStorage.setItem(key, value);
        }
        break;

      case 'cookie':
        this.cookie.set(key, value, options);
        break;
    }
  }

  remove(storage, key) {
    switch (storage) {
      case 'local':
        if (this.isLocalStorage()) {
          localStorage.removeItem(key);
        }
        break;

      case 'session':
        if (this.isSessionStorage()) {
          return sessionStorage.removeItem(key);
        }
        break;
    }
  }

  clear(storage) {
    switch (storage) {
      case 'local':
        if (this.isLocalStorage()) {
          localStorage.clear();
        }
        break;

      case 'session':
        if (this.isSessionStorage()) {
          sessionStorage.clear();
        }
        break;

      case 'cookie':
        this.cookie.clear();
        break;
    }
  }
}

