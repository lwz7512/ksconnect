import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, NavParams} from 'ionic-angular';

import {SmartImage} from '../../components/smart-image';

@Component({
  directives: [SmartImage],
  templateUrl: 'build/pages/modals/weibo-slides.html'
})
export class WeiboImagesPage {

  images: any[];

  constructor(
    private viewCtrl: ViewController,
    private params: NavParams
  ){}

  ionViewDidEnter(){
    let weibo = this.params.data;
    // console.log(weibo);
    this.images = weibo.images;
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
