import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

import {Host} from '../host/host';

/*
  Generated class for the CommunityData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommunityData {

  //json result fetched
  data: any;

  _hostURL: string;

  constructor(private http: Http, private host:Host) {
    this._hostURL = host.getHostURL();

  }


  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // let headers = new Headers({ 'X-Requested-With': 'XMLHttpRequest' });
    // let options = new RequestOptions({ headers: headers, method: "get" });

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.

      this.http.get(this._hostURL+'/bbs').subscribe(res => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data = res.json();

        // FIXME, 补充图片字段不为空 @2016/08/23
        this.data.res.data.forEach(item => {
          if(!item.images_link) item.images_link = [];
        });
        // console.log(this.data);
        resolve(this.data);
      });
    });
  }//end of load...

}
