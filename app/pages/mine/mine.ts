import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {User} from '../../providers/user/user';

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
  userAvatar:string = "img/avatar_fml.png";

  constructor(private navCtrl: NavController, private userdata:User) {
    // img/avatar-rey.png
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
  }

  ionViewDidEnter(){

  }

}
