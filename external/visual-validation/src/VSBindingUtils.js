/**
 * Created by danielfalci on 13/07/2017.
 */
import {inject, BindingEngine} from 'aurelia-framework';
import {ObserverLocator} from 'aurelia-binding';

@inject(ObserverLocator, BindingEngine)
export class VSBindingUtils{

  constructor(observerLocator, bindingEngine){
    this.observerLocator = observerLocator;
    this.bindingEngine = bindingEngine;
  }

  lowLevelObserver(context, variable, callback){
    this.observerLocator.getObserver(context, variable).subscribe(callback);
  }

  simpleObserver(context, variable, callback){
    return this.bindingEngine.propertyObserver(context, variable).subscribe(callback);
  }




  multiObserve(properties, callback){
    let subscriptions = [];
    for (let i=properties.length-1;i>=0;i--){
      let prop = properties[i];
      subscriptions.push(this.observerLocator.getObserver(prop.context, prop.variable).subscribe(callback));
    }
    return subscriptions;
  }

  whenAllChanged(properties, callback, continuous=false){
    let subscriptions = [];
    let promises = this.__createPromises(properties);
    Promise.all(promises).then(()=>{
      callback();
      if (continuous)
        this.whenAllChanged(properties, callback);
    })
  }

  __createPromises(properties){
    let promises = [];
    for (let i=properties.length-1;i>=0;i--){
      let prop = properties[i];
      promises.push(
        new Promise((resolve, reject)=>{
          this.observerLocator.getObserver(prop.context, prop.variable).subscribe(()=>{
            resolve();
          });
        })
      );
    }
    return promises;
  }


}
