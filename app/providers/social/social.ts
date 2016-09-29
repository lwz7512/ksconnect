/// <reference path="../../cordova-plugin/cordova-plugin-wechat/index.d.ts"/>

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';

import 'rxjs/add/operator/map';


interface WXShareMessage {
  title:string;
  description:string;
  articleURL:string;
  thumbnailURl:string;
}


/*
  Generated class for the Social provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Social {

  _wxInstalled: boolean;
  _toSharedMessage: WXShareMessage;

  constructor(private http: Http, private platform: Platform) {
    this._isInstalled();
  }

  // 构造实例时先先检查是否安装微信
  _isInstalled(){
    if(typeof Wechat === 'undefined') {
      console.error('wechat plugin not installed!');
      return;
    }

    Wechat.isInstalled(
      installed => {
        this._wxInstalled = installed?true:false;
      },reason => {
        alert("wx install check Failed: " + reason);
      });
  }

  // 如果已安装，进行登录授权
  auth(){
    if(!this._wxInstalled) return;

    var scope = "snsapi_userinfo", state = "_" + (+new Date());
    // 授权成功后才能发送分享
    Wechat.auth(scope, state, function (response) {
      // alert(response);
      // you may use response.code to get the access token.
      // alert(JSON.stringify(response));
      // 这个code可以用来发送给后台，做用户登录使用
      localStorage.setItem('wechat_code', response.code);

      // 授权成功后发送 @2016/09/28
      this.share(this._toSharedMessage);

    }, function (reason) {
      alert('wechat Failed!');
      localStorage.setItem('wechat_authed', '0');
    });

    // 假设点击就授权了
    localStorage.setItem('wechat_authed', '1');
  }

  /**
   * 授权成功后，可以分享了
   *
   * Scene: {
        SESSION:  0, // 聊天界面
        TIMELINE: 1, // 朋友圈
        FAVORITE: 2  // 收藏
    },
    Type: {
        APP:     1,
        EMOTION: 2,
        FILE:    3,
        IMAGE:   4,
        MUSIC:   5,
        VIDEO:   6,
        WEBPAGE: 7
    },
   * @param  {string} type         分享类型
   * @param  {string} articleURL   文章URL，格式 http://kiscp.kstartup.cn/#/detail/id
   * @param  {string} thumbnailURl 文章缩略图地址
   * @return void              无返回
   */
  share(type:number, title:string, description:string, articleURL:string, thumbnailURl:string){

    // 缓存下来，授权成功后发送
    this._toSharedMessage = {
      title: title,
      description: description,
      articleURL: articleURL,
      thumbnailURl: thumbnailURl
    };

    let authed = localStorage.getItem('wechat_authed')=='1'?true:false;
    // 先检查是否授权过
    if(!authed){
        this.auth();
        return;
    }

    let message: any = {
        title: title,
        thumb: thumbnailURl,
        description: description,
        media: {type: 7, webpageUrl: articleURL}
    };
    let params: MessageParams = {scene:type, message: message};

    Wechat.share(
      params,
      ()=>{
        alert('分享成功!');
      },
      reason=>{
        alert("WX Share Failed: " + reason);
      });
  }


}
