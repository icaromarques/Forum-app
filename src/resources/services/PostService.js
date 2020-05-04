
import {GenericService} from "resources/services/generic/GenericService";
import {inject, NewInstance, transient} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClient} from 'aurelia-fetch-client';

@inject(EventAggregator, NewInstance.of(HttpClient))
@transient()
export class PostService extends GenericService {

  constructor(eventAggregator, http){
    super(eventAggregator, 'posts');
    this.http = this.configureHTTP(http);
  }

  findAllQuestions(page,maxValue,text,notAnsewered,direction,sortField){
    return new Promise((resolve, reject) => {
      this.defaultFetchHandler(
        this.http.fetch(this.url + '/questions?&page='+page + '&maxValue='+maxValue  +
        (text != null? '&text='+text : '') +
        (notAnsewered != null? '&notAnsewered='+notAnsewered : '') +
        (direction != null? '&direction='+direction : '') +
        (sortField != null? '&sortField='+sortField : '') , {
          method: this.METHODS.GET_METHOD
        }),
        resolve, reject
      )
    });
  }

  findAllAnswers(questionId,page,maxValue){
    return new Promise((resolve, reject) => {
      this.defaultFetchHandler(
        this.http.fetch(this.url + '/answers?questionId='+ questionId +
        (page != null? '&page='+page : '' ) + 
        (maxValue != null? '&maxValue='+maxValue : ''), {
          method: this.METHODS.GET_METHOD
        }),
        resolve, reject
      )
    });
  }


}
