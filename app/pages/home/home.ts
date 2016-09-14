import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, LoadingController, ToastController, ActionSheetController, Platform, NavParams, Loading} from 'ionic-angular';

import { Camera, CameraOptions, Transfer, FileUploadOptions } from 'ionic-native';

import {Host} from '../../providers/host/host';
import {TopicDetailPage,} from '../topic-detail/topic-detail';
import {CommunityData} from '../../providers/community-data/community-data';
import {ModalsContentPage} from '../modals/send-weibo';
// import {WeiboImagesPage} from '../modals/weibo-slides';

import {SmartImage} from '../../components/smart-image';
import {RelativeTime} from '../../pipes/RelativeTime';

@Component({
  directives: [SmartImage],
  templateUrl: 'build/pages/home/home.html',
  pipes: [RelativeTime]
})
export class HomePage {

  weibos: any[];//绑定到首页卡片
  loader: Loading;
  // 加载状态开关
  isSending:boolean = false;

  constructor(
    private navCtrl: NavController,
    private cmntdata: CommunityData,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private host: Host
  ) {

    // let innerTxt = "a#b.c#de,f#g-h#....";
    // let converted = innerTxt.replace(/#*#/g, ' ');
    let innerTxt = '....#abc# , #FFF #';
    let converted = innerTxt.replace(/#([^#]*)#/g, "<a>$1</a>");
    // console.log(converted);
    let attopic = '...@#some blabla...';
    let convertat = attopic.replace(/@#([^@#]*)\s/g, "<a>@#$1</a>");

    // 打开刷新开关，做一次查询
    this.cmntdata.forceToRefresh = true;
  }

  // 每次进来都要执行
  ionViewDidEnter() {
    // console.log('>>> enter the home view...');
    // FIXME, 这里加开关控制，不然从详情页面返回首页时报错
    // @2016/09/13
    if(!this.cmntdata.forceToRefresh) return;// 依据开关刷新

    // 如果发了微博，则刷新
    this.cmntdata.loadWeibo().then(data => {
      // console.log(data.res.data);
      this.weibos = data.res.data;
      // 更新数据后关闭强制刷新
      this.cmntdata.forceToRefresh = false;
      // 关闭进度条
      this.isSending = false;
    });
    // 打开进度条
    this.isSending = true;
  }

  // 打开微博详情
  openTopicDetail(weibo){
    console.log('open details...');
    this.navCtrl.push(TopicDetailPage, weibo);
  }

  // 打开微博发送窗口
  openWeiboModal() {
    let modal = this.modalCtrl.create(ModalsContentPage);
    modal.present();
  }

  // 打开图片幻灯片
  // openImgSlides(weibo) {
  //   let modal = this.modalCtrl.create(WeiboImagesPage, weibo);
  //   modal.present();
  // }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "loading...",
      // duration: 3000
    });
    this.loader.present();
  }

}
