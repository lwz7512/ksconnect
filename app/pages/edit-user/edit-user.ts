import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {User} from '../../providers/user/user';

/*
  Generated class for the EditUserPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/edit-user/edit-user.html',
})
export class EditUserPage {

  isSending:boolean = false;
  userInfo:any;

  constructor(
    private navCtrl: NavController,
    private userdata:User,
    private params:NavParams
  ) {
    // 初始化图片地址，防止出现null的请求
    this.userInfo = {
      middle_face: "img/avatar_fml.png",
      sign: "梦想总该有一个，万一实现了呢。。。即使实现不了那也是很美好的呀。。。",
      tags: []
    };
  }

  _merge(src, des){
    for(let k in des){
      src[k] = des[k];
    }
  }

  ionViewWillEnter(){
    // 先用本地缓存字段显示
    // this.userInfo = this.params.data;
    this._merge(this.userInfo, this.params.data);
    // console.log(this.userInfo);

    this.userdata.getUserDetail(this.userInfo.uid).then(result=>{
      console.log(result);
      // update local value with remote!
      this.userInfo.fullname = result.res.data.user.fullname;
      this.userInfo.sex = result.res.data.user.sex;
      this.userInfo.tags = result.res.data.tags;

      this.isSending = false;
    });
    this.isSending = true;
  }

  sendUserinfo(){
    this.userdata.updateUserInfo(this.userInfo);
    this.isSending = true;
  }

}
