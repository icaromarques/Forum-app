import {BrowserStorage} from 'visual-general-components';
import {inject,NewInstance} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';

@inject(BrowserStorage,Router)
export class SessionHandler{
  browserStorage = null;
  loggedUser;

  constructor(browserStorage, router){
    this.isInUse = false;
    this.browserStorage = browserStorage;
    this.router = router;
    this.getUser();    
  }

  getUser(){
    this.loggedUser = this.browserStorage.get('session', 'loggedUser');
    return this.loggedUser;
  }

  loginSaveSession(loggedUser){
    this.browserStorage.set('session', 'loggedUser',loggedUser);
    this.loggedUser = loggedUser;
  }


  loginCleanSession(){
    this.loggedUser = '';
    this.browserStorage.set('session', 'loggedUser','');
    this.router.navigateToRoute('index');
  }
}
