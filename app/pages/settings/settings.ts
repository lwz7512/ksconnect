import { Component } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';

import {ResponsibleItem} from '../../components/responsible-item';
import {User} from '../../providers/user/user';

/*
  Generated class for the SettingsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  directives: [ResponsibleItem],
  templateUrl: 'build/pages/settings/settings.html',
})
export class SettingsPage {

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private userdata: User
  ) {}

  logout(){
    this.showConfirm();
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: '确定要注销登录账号?',
      message: '注销后将以游客身份访问应用内容',
      buttons: [
        {
          text: '算了',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.userdata.logout();
            setTimeout(()=>{this.navCtrl.pop()}, 500);
          }
        }
      ]
    });
    confirm.present();
  }

}
