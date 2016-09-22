import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {LoginPage} from '../login/login';
import {RegisterPage} from '../register/register';
import {EditUserPage} from '../edit-user/edit-user';
import {SettingsPage} from '../settings/settings';

import {User} from '../../providers/user/user';


interface UserInfo {
  uid?: number,
  email?: string,
  fullname?: string,
  middle_face?: string,
  small_face?: string,
  name?: string,
  sex?: string,
  uname?: string,
  description?: string,
  sign?:string
}

/*
  Generated class for the MinePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/mine/mine.html',
})
export class MinePage {

  // 视图状态绑定开关
  isLogged:boolean;

  // 默认的头像，表示未登录状态
  userInfo:UserInfo;


  constructor(
    private navCtrl: NavController,
    private userdata:User
  ) {
    // 初始化图片地址，防止出现null的请求
    this.userInfo = {
      small_face: "img/avatar_fml.png",
      middle_face: "img/avatar_fml.png"
    };
  }


  ionViewWillEnter(){
    // TODO, 不确定是否已经登录过，所以要动态设置
    this.userdata.hasLoggedIn().then(result=>{
      if(!result){
        this.isLogged = false;
      }else{
        this.isLogged = true;
      }
    });
    // 同时查询用户信息缓存，只从缓存拿数据，不从后台取！
    // @2016/09/22
    this.userdata.getLocalUserInfo().then(result=>{
      if(!this.isLogged) return;
      if(!result) return;
      this.userInfo = JSON.parse(result);
      // console.log(this.userInfo);
      if(!this.userInfo.sign) this.userInfo.sign = "用户还没填写签名";
    });

    console.log('mine page will enter...');
  }

  // TODO, 从远程查询用户资料，用于检查更新
  ionViewDidEnter(){

  }

  openLogin(){
    this.navCtrl.push(LoginPage);
  }

  openRegister(){
    this.navCtrl.push(RegisterPage);
  }

  openEditUser(){
    this.navCtrl.push(EditUserPage, this.userInfo);
  }

  navToSettings(){
    this.navCtrl.push(SettingsPage);
  }

}
