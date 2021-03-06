import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

import {Host} from '../host/host';
import {User} from '../user/user';


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


  constructor(
    private http: Http,
    private host:Host,
    private user:User //加入用户处理 @2016/09/26
  ) {this._hostURL = host.getHostURL();}


  loadWeibo(){
    if (this.data && !this.forceToRefresh) {
      // console.log('>>> use cache data....')
      return Promise.resolve(this.data);
    }
    let token = this.user.getUserToken();
    return new Promise<any>(resolve => {

      this.http.get(this._hostURL+'/weibo?token='+token).subscribe(res => {
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

    // let headers = new Headers({ 'X-Requested-With': 'XMLHttpRequest' });
    // let options = new RequestOptions({ headers: headers, method: "get" });

    // don't have the data yet
    return new Promise<any>(resolve => {
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
    // 加上用户token
    // @2016/09/28
    params += "&token=" + this.user.getUserToken();

    // 微博发送必须有用户
    if(!this.user.getUserObj()){
      console.log('no user logged in!');
      return;
    }

    // TODO, ...add user parameter...

    // 图片数组
    for(let i in weibo.images){
      params += "&images["+i+"][id]="+weibo.images[i]['id'];
      params += "&images["+i+"][link]="+weibo.images[i]['link'];
      // FIXME, 补充大图属性 @2016/09/19
      params += "&images["+i+"][load_image]="+weibo.images[i]['load_image'];
    }
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    return new Promise<any>((resolve, reject) => {
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

  // 微博详情
  getWeiboDetails(wid){
    // don't have the data yet
    return new Promise<any>(resolve => {
      // 加上用户token
      // @2016/09/28
      let token = this.user.getUserToken();
      this.http.get(this._hostURL+'/weibo/'+wid+'?token='+token).subscribe(res => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data = res.json();
        // console.log(this.data);
        resolve(this.data);
      });
    });
  }

  // 微博顶，点赞 1, 踩 0
  digWeibo(wid, status){
    var params = "wid=" + wid + "&status="+status;

    // 加上用户token
    // @2016/09/28
    params += "&token=" + this.user.getUserToken();

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    return new Promise<any>((resolve, reject) => {
      this.http.post(this._hostURL+'/dig', params, options).subscribe(res => {
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

  // 发送微博评论
  replyWeibo(wid, content, at){
    var params = "wid=" + wid + "&content="+content;
    if(at) params += "&replyto=" + at;

    // 加上用户token
    // @2016/09/28
    params += "&token=" + this.user.getUserToken();

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    return new Promise<any>((resolve, reject) => {
      this.http.post(this._hostURL+'/reply', params, options).subscribe(res => {
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
