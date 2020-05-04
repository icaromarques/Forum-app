import {transient, inject} from 'aurelia-framework';
import environment from 'environment';

@transient()
export class BasicService{
  isInUse = false;

  constructor(eventAggregator,router){
    this.eventAggregator = eventAggregator;
    this.baseAddress = environment.endpoint;
    this.router = router;
  }

  /**
   * @param http
   * @returns {*}
   */
  configureHTTP(http){
    var vm = this;
    http.configure((config) => {
      config
        .useStandardConfiguration()
        .withInterceptor({
          request(request) {
            vm.isInUse = true;
            return request;
          },
          response(response) {
            vm.isInUse = false;
            return response;
          }
        })
        .withDefaults({
          headers: {
            'Content-type' : 'application/json' 
          }
        })
        .withBaseUrl(this.baseAddress);
    });
    return http;
  }

  /**
   *
   * @param response
   * @param property
   * @returns {*}
   */
  getResponse(response) {
    if (response) {
      return response;
    } else {
      this.throwError(response);
    }
  }

  /**
   * @param error
   */
  throwError(error) {
    this.isInUse = false;
    console.log(error);

    if (error.status && error.status != null ) {
      let code = error.status;
      let message = (error.message && error.message != '')?error.message : null;
      throw {code:code, message:message};
    } else {
      throw {code:500, message:'uncaughtError'}
    }
  }

  /**
   * 
   * @param error
   * @returns {*}
   */
  translateError(error){
    this.isInUse = false;
    if (error.status) {      
      return {code:error.status, message: error.message};
    }    
    return error;
  }

  /**
   * Fetch default for HTTP requests
   * @param request
   * @param resolve
   * @param reject
   */
  defaultFetchHandler(request, resolve, reject){
    request
      .then(response => response.json())
      .then(response => resolve(this.getResponse(response)))
      .catch(error => reject(this.translateError(error)));
  }

}
