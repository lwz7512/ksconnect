import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/contact/quanzi.html'
})
export class ContactPage {

  pet: string = "myteam";
  isAndroid: boolean = false;

  constructor(private platform: Platform, private navCtrl: NavController) {
    this.isAndroid = platform.is('android');
  }

  // 底部幻灯片选项配置
  topslides = {
    slidesPerView: 4,spaceBetween: 1
  };

}
