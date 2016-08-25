import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
  constructor(private navCtrl: NavController) {
  }
  // 幻灯片选项
  mySlideOptions = {
    loop: true, pager: true,
    autoplay: 2000
  };
  // 底部幻灯片选项配置
  bottomslides = {
    slidesPerView: 3,spaceBetween: 1
  };

}
