import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers} from '@angular/http';

import { Events, LocalStorage, Storage, LoadingController, Loading} from 'ionic-angular';
import {Host} from '../host/host';

/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class User {

  HAS_LOGGED_IN = 'hasLoggedIn';
  USER_INFO = 'userinfo';

  storage = new Storage(LocalStorage);
  _hostURL: string;



  constructor(
    private http: Http,
    private host:Host
  ) {this._hostURL = host.getHostURL();}


  login(username, password) {
    var params = "uname=" + username + "&password="+password;

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    return new Promise<any>((resolve, reject) => {
      this.http.post(this._hostURL+'/login', params, options).subscribe(res => {
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

  // TODO, get user details...
  // http://api.kstartup.cn/getuserdetail?uid=14398
  getUserDetail(uid){
    return new Promise<any>(resolve => {
      this.http.get(this._hostURL+'/getuserdetail?uid='+uid).subscribe(res => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        resolve(res.json());
      });
    });
  }

  // TODO, send user new info...
  // http://api.kstartup.cn/updatedetail 参数 uid,fullname,sex,department,email,sign
  updateUserInfo(userinfo){
    var params = "fullname=" + userinfo.fullname + "&sex="+userinfo.sex;
    params += "&sign="+userinfo.sign + "&department="+userinfo.department;
    params += "&email="+userinfo.email + "&uid="+userinfo.uid;

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    return new Promise<any>((resolve, reject) => {
      this.http.post(this._hostURL+'/updatedetail', params, options).subscribe(res => {
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

  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }

  saveUser(user){
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set(this.USER_INFO, JSON.stringify(user));
  }

  getLocalUserInfo(){
    return this.storage.get(this.USER_INFO).then((value) => {
      return value;
    });
  }

  logout(){
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove(this.USER_INFO);
  }


}
