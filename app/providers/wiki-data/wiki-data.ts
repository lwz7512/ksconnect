import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import {Host} from '../host/host';

/*
  Generated class for the WikiData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WikiData {

  //json result fetched
  data: any;

  _hostURL: string;

  constructor(private http: Http, private host:Host) {
    this._hostURL = host.getHostURL();
  }

  // 获取行业报告
  loadWikiReport(){
    return new Promise(resolve => {
      this.http.get(this._hostURL+'/wiki?type=3').subscribe(res => {
          this.data = res.json();
          resolve(this.data);
      });
    });
  }

  // 获取报告详情
  loadReportDetail(w_id){
    return new Promise<any>(resolve => {
      this.http.get(this._hostURL+'/getwikibyid?w_id='+w_id).subscribe(res => {
          this.data = res.json();
          resolve(this.data);
      });
    });
  }



}
