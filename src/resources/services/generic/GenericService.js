
import { BasicService } from 'resources/services/generic/BasicService';

export class GenericService extends BasicService {

  METHODS = {};

  constructor(eventAggregator, url, router) {
    super(eventAggregator, router);
    this.url = url;

    this.METHODS = {
      GET_METHOD : 'get',
      PUT_METHOD: 'put',
      POST_METHOD: 'post',
      DELETE_METHOD: 'delete'
    }
  }

  /**
   * get item by Id
   * @param id
   * @returns {Promise}
   */
  findById(id) {
    return new Promise((resolve, reject) => {
      this.defaultFetchHandler(
        this.http.fetch(this.url + '/' + id, {
          method: this.METHODS.GET_METHOD
        }),
        resolve, reject
      )
    });
  }


  /**
   * Create a new registry
   * @param pojo
   * @returns {Promise}
   */
  create(pojo) {
    return new Promise((resolve, reject) => {
      this.defaultFetchHandler(
        this.http.fetch(this.url, {
          method: this.METHODS.POST_METHOD,
          body: JSON.stringify(pojo)
        }),
        resolve, reject
      )
    });
  }

  /**
   * update a registry
   * @param pojo
   * @returns {Promise}
   */
  update(pojo) {
    return new Promise((resolve, reject) => {
      this.defaultFetchHandler(
        this.http.fetch(this.url, {
          method: this.METHODS.PUT_METHOD,
          body: JSON.stringify(pojo)
        }),
        resolve, reject
      )
    });
  }

  /**
   * Delete a registry
   * @param pojo
   * @returns {Promise}
   */
  deleteById(id) {
    return new Promise((resolve, reject) => {
      this.defaultFetchHandler(
        this.http.fetch(this.url + '/' + id, {
          method: this.METHODS.DELETE_METHOD
        }),
        resolve, reject
      )
    });
  }

}
