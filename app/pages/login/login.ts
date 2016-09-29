import { Component } from '@angular/core';
import { NavController, Events, LoadingController, Loading, AlertController} from 'ionic-angular';

import {User} from '../../providers/user/user';
import {TabsPage} from '../../pages/tabs/tabs';

import {CommunityData} from '../../providers/community-data/community-data';

import {Md5} from 'ts-md5/dist/md5';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

  // 校验表单用
  submitted = false;
  login: {username?: string, password?: string} = {};
  loader: Loading;

  constructor(
    private navCtrl: NavController,
    private userData: User,
    private events: Events,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private cmntdata: CommunityData
  ) { }

  ionViewWillEnter(){

  }


  onLogin(form) {
    this.submitted = true;

    if(!form.valid) return;

    let md5pswd = Md5.hashStr(this.login.password);
    // console.log(md5pswd);

    this.userData.login(this.login.username, md5pswd).then(result=>{
      // console.log(result);
      this._dimissLoading();

      if(result.meta.code==200){
        this._closeMe();
        // TODO, 本地记录用户资料
        this.userData.saveUser(result.res.data[0]);

        // 打开首页数据刷新开关
        this.cmntdata.forceToRefresh = true;

      }else if(result.meta.code==400){
        let tips = result.res.tips;
        this._showAlert(tips);
      }else{
        this._showAlert('神马情况？');
      }

    });

    // reload page...
    // this.events.publish('user:login');
    this._presentLoading();

  }

  onSignup() {

  }

  _presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Sending...",
      // duration: 3000
    });
    this.loader.present();
  }

  _dimissLoading(){
    if(this.loader) this.loader.dismiss();
  }

  _showAlert(message) {
    let alert = this.alertCtrl.create({
      title: '登录失败',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  // HACK, 因为有loading要关闭，所以这里延迟销毁窗口
  _closeMe(){
    setTimeout(()=>{this.navCtrl.pop();}, 500);
  }

}
