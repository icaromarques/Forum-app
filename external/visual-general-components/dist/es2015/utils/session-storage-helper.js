
export let SessionStorageHelper = class SessionStorageHelper {

  constructor() {}

  set(key, value) {
    sessionStorage.setItem(key, value);
  }

  get(key) {
    return sessionStorage.getItem(key);
  }

  delete(key) {
    return sessionStorage.removeItem(key);
  }
};