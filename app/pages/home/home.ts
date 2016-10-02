import {Component, ViewChild} from '@angular/core';
import {NavController, ViewController, ModalController, Content, Events} from 'ionic-angular';

import { Camera, CameraOptions, Transfer, FileUploadOptions } from 'ionic-native';

import {User} from '../../providers/user/user';
import {TopicDetailPage,} from '../topic-detail/topic-detail';
import {CommunityData} from '../../providers/community-data/community-data';
import {ModalsContentPage} from '../modals/send-weibo';
// 这里没必要打开微博图片幻灯片
// import {WeiboImagesPage} from '../modals/weibo-slides';

import {SmartImage} from '../../components/smart-image';
import {RelativeTime} from '../../pipes/RelativeTime';
import {SmartImageController} from '../../components/smtimg-ctrlr';

@Component({
  directives: [SmartImage],
  templateUrl: 'build/pages/home/home.html',
  pipes: [RelativeTime]
})
export class HomePage {

  weibos: any[];//绑定到首页卡片
  // 加载状态开关
  isSending:boolean = false;

  @ViewChild(Content)
  content:Content;

  smtImages: SmartImage[] = [];

  constructor(
    private navCtrl: NavController,
    private cmntdata: CommunityData,
    private modalCtrl: ModalController,
    private user: User,
    private events: Events,
    private smtCtrl: SmartImageController
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

  ngAfterViewInit() {

    this.smtCtrl.iniLazyLoad(this.content);

  }



  // 每次进来都要执行
  ionViewDidEnter() {
    // console.log('>>> enter the home view...@' + new Date().getTime());
    // FIXME, 这里加开关控制，不然从详情页面返回首页时报错
    // @2016/09/13
    if(!this.cmntdata.forceToRefresh) return;// 依据开关刷新

    // console.log('load home data...');

    // 如果发了微博，则刷新
    this.cmntdata.loadWeibo().then(data => {
      // console.log(data.res.data);

      // token expirated @2016/09/29
      if(data.meta.code == 403){
        console.log('token timeout, need relogin...');
        this.user.restoreToInstall();
        this.navCtrl.parent.select(3);//跳到登录窗口
      }

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
    // console.log('open details...');
    this.navCtrl.push(TopicDetailPage, weibo);
  }

  // 打开微博发送窗口
  openWeiboModal() {
    if(!this.user.getUserObj()){
      console.log('login first!');
      // 选中最后一个tab页，引导用户登录 @2016/09/26
      this.navCtrl.parent.select(3);
      return;
    }
    let modal = this.modalCtrl.create(ModalsContentPage);
    modal.present();
  }

  // 打开图片幻灯片
  // openImgSlides(weibo) {
  //   let modal = this.modalCtrl.create(WeiboImagesPage, weibo);
  //   modal.present();
  // }

  // presentLoading() {
  //   this.loader = this.loadingCtrl.create({
  //     content: "loading...",
  //     // duration: 3000
  //   });
  //   this.loader.present();
  // }

  contentScroll(){
    console.log('content scrolled...');
  }

}
