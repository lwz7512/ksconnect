import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import {WeiboImagesPage} from '../modals/weibo-slides';

import {SmartImage} from '../../components/smart-image';
import {RelativeTime} from '../../pipes/RelativeTime';

import {CommunityData} from '../../providers/community-data/community-data';

/*
  Generated class for the TopicDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  directives: [SmartImage],
  templateUrl: 'build/pages/topic-detail/topic-detail.html',
  pipes: [RelativeTime]
})
export class TopicDetailPage {

  // 必须初始化数据，不然模板报错
  weibo:any = {images:[]};

  // down icon name
  dnIconName:string = 'ios-thumbs-down-outline';
  // up icon name
  upIconName:string = 'ios-thumbs-up-outline';

  diguped:boolean;
  digdowned:boolean;


  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController,
    private params: NavParams,
    private cmntdata: CommunityData
  ) {}

  ionViewDidEnter(){
    this.weibo = this.params.data;
    console.log(this.weibo);
  }

  // 打开图片幻灯片
  openImgSlides(weibo) {
    let modal = this.modalCtrl.create(WeiboImagesPage, weibo);
    modal.present();
  }

  digup(){
    if(this.diguped) return;

    // 变化样式
    let isOutline = this.upIconName=='ios-thumbs-up-outline';
    this.upIconName = isOutline?'thumbs-up':'ios-thumbs-up-outline';
    // 累加数字
    this.weibo.dig = parseInt(this.weibo.dig)+1;
    // 发送请求
    this.cmntdata.digWeibo(this.weibo.id, 1).then(result=>{
      console.log(result);
    });
    // 重置开关
    this.diguped = true;
  }

  digdown(){
    if(this.digdowned) return;

    let isOutline = this.dnIconName=='ios-thumbs-down-outline';
    this.dnIconName = isOutline?'thumbs-down':'ios-thumbs-down-outline';
    // 累加数字
    this.weibo.dig = parseInt(this.weibo.dig)-1;
    // 发送请求
    this.cmntdata.digWeibo(this.weibo.id, 0).then(result=>{
      console.log(result);
    });
    // 重置开关
    this.digdowned = true;
  }


}
