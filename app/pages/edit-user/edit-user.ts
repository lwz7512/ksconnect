import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';

import {User} from '../../providers/user/user';

import {ResponsibleItem} from '../../components/responsible-item';

/*
  Generated class for the EditUserPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  directives: [ResponsibleItem],
  templateUrl: 'build/pages/edit-user/edit-user.html',
})
export class EditUserPage {

  isSending:boolean = false;
  userInfo:any;

  constructor(
    private navCtrl: NavController,
    private userdata:User,
    private params:NavParams,
    private alertCtrl: AlertController
  ) {
    // 初始化图片地址，防止出现null的请求
    this.userInfo = {
      middle_face: "img/avatar_fml.png",
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

    if(!this.userInfo.uid) return;

    this.userdata.getUserDetail(this.userInfo.uid).then(result=>{
      console.log(result);
      // update local value with remote!
      this.userInfo.fullname = result.res.data.user.fullname;
      this.userInfo.sex = result.res.data.user.sex;
      this.userInfo.tags = result.res.data.tags;
      this.userInfo.department = result.res.data.baseinfo.department;

      if(result.res.data.user.sign) this.userInfo.sign = result.res.data.user.sign;

      // 更新缓存
      this.userdata.saveUser(this.userInfo);

      this.isSending = false;
    });
    this.isSending = true;
  }

  sendUserinfo(){
    this.userdata.updateUserInfo(this.userInfo);
    this.isSending = true;
  }

  modFullname(){
    // console.log('modify fullname...');
    this.showPrompt('修改昵称', this.userInfo.fullname, 'fullname');
  }

  modSex(){
    this.showRadio('修改性别', this.userInfo.sex);
  }

  modSign(){
    this.showPrompt('修改签名', this.userInfo.sign, 'sign');
  }

  showRadio(title, origValue) {
    let alert = this.alertCtrl.create();
    alert.setTitle(title);
    let checked = origValue=='male'?true:false;
    alert.addInput({type: 'radio',label: '男',value: 'male',checked: checked});
    alert.addInput({type: 'radio',label: '女',value: 'female',checked: !checked});

    alert.addButton('取消');
    alert.addButton({
      text: '保存',
      handler: data => {
        this.userInfo.sex = data;
        this.autoSave();
      }
    });
    alert.present();
  }

  showPrompt(title, origValue, property) {
    let prompt = this.alertCtrl.create({
      title: title,
      message: "",
      inputs: [
        {
          name: 'title',
          placeholder: 'write here',
          value: origValue
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '保存',
          handler: data => {
            this.userInfo[property] = data['title'];
            this.autoSave();
          }
        }
      ]
    });
    prompt.present();
  }

  // TODO, save user info...
  autoSave(){
    // console.log(this.userInfo);
    this.userdata.updateUserInfo(this.userInfo).then(result=>{
      console.log('userinfo updated!');
      console.log(result);
      // 更新缓存
      this.userdata.saveUser(this.userInfo);
    });
  }

}
