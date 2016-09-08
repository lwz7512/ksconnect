import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, LoadingController, ToastController, ActionSheetController, Platform, NavParams, Loading} from 'ionic-angular';

import { Camera, CameraOptions, Transfer, FileUploadOptions } from 'ionic-native';

import {Host} from '../../providers/host/host';
import {TopicDetailPage,} from '../topic-detail/topic-detail';
import {CommunityData} from '../../providers/community-data/community-data';
import {ModalsContentPage} from '../modals/send-weibo';

import {SmartImage} from '../../components/smart-image';

@Component({
  directives: [SmartImage],
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  weibos: any;//绑定到首页卡片
  loader: Loading;

  constructor(
    private navCtrl: NavController,
    private cmntdata: CommunityData,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private host: Host) {

    // let innerTxt = "a#b.c#de,f#g-h#....";
    // let converted = innerTxt.replace(/#*#/g, ' ');
    let innerTxt = '....#abc# , #FFF #';
    let converted = innerTxt.replace(/#([^#]*)#/g, "<a>$1</a>");
    // console.log(converted);
    let attopic = '...@#some blabla...';
    let convertat = attopic.replace(/@#([^@#]*)\s/g, "<a>@#$1</a>");
    // console.log(convertat);
  }

  // 每次进来都要执行
  ionViewDidEnter() {
    console.log('>>> enter the home view...');
    
    this.cmntdata.loadWeibo().then(data => {
      // console.log(data.res.data);
      this.weibos = data.res.data;
      // 更新数据后关闭强制刷新
      this.cmntdata.forceToRefresh = false;
      // 延迟关闭
      if(!this.cmntdata.forceToRefresh) return;// 依据开关刷新
      setTimeout(()=>{this.loader.dismiss();}, 100);
    });
    // 延迟打开，不然没法显示 @2016/09/
    if(!this.cmntdata.forceToRefresh) return;// 依据开关刷新
    setTimeout(()=>{this.presentLoading();}, 100);
  }

  openTopicDetail(){
    console.log('open details...');
    this.navCtrl.push(TopicDetailPage);
  }

  openModal(characterNum) {
    let modal = this.modalCtrl.create(ModalsContentPage, characterNum);
    modal.present();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "loading...",
      // duration: 3000
    });
    this.loader.present();
  }

}
