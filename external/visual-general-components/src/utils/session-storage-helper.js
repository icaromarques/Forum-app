/**
 * @author Daniel Falci - 27/09/17
 **/

/**
 * Esta classe provê acesso ao session storage do browser.
 */
export class SessionStorageHelper{

  constructor(){

  }

  set(key, value){
    sessionStorage.setItem(key, value);
  }

  get(key){
    return sessionStorage.getItem(key);
  }

  delete(key){
    return sessionStorage.removeItem(key);
  }
}
