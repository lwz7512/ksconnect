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
  // 强制更新开关
  forceToRefresh: boolean;

  constructor(private http: Http, private host:Host) {
    this._hostURL = host.getHostURL();

  }

  loadWeibo(){
    if (this.data && !this.forceToRefresh) {
      console.log('>>> use cache data....')
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {

      this.http.get(this._hostURL+'/weibo').subscribe(res => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data = res.json();

        // FIXME, 补充图片字段不为空 @2016/08/23
        this.data.res.data.forEach(item => {
          if(!item.images) item.images = [];
        });
        // console.log(this.data);
        resolve(this.data);
      });
    });
  }

  // 获取首页微博列表
  loadBBS() {
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


  // 发送微博
  sendWeibo(weibo){
    var params = "content=" + weibo.content + "&tags=" + weibo.tags;
    // 图片数组
    for(let i in weibo.images){
      params += "&images["+i+"][id]="+weibo.images[i]['id'];
      params += "&images["+i+"][link]="+weibo.images[i]['link'];
    }
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post(this._hostURL+'/weibo', params, options).subscribe(res => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        var pushresult = res.json();
        // console.log(pushresult);
        resolve(pushresult);
      }, error => {
        console.error('Ooopse! send failure!');
        alert(error);
        // 抛出异常
        reject(new Error(error));
      });
    });
  }



}
