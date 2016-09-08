import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import {Host} from '../host/host';

/*
  Generated class for the GroupData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GroupData {

  //json result fetched
  data: any;

  _hostURL: string;

  constructor(private http: Http, private host:Host) {
    this._hostURL = host.getHostURL();
  }

  loadPublicGroups(){
    if (this.data) {
      console.log('>>> use cache data....')
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {

      this.http.get(this._hostURL+'/group?type=all').subscribe(res => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data = res.json();
        // console.log(this.data);
        resolve(this.data);
      });
    });
  }




}
