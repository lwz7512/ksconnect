import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, NavParams, AlertController, TextInput } from 'ionic-angular';

import {WeiboImagesPage} from '../modals/weibo-slides';
import {EntrepreneurPage} from '../entrepreneur/entrepreneur';

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
  // 评论
  replys:any[] = [];

  // down icon name
  dnIconName:string = 'ios-thumbs-down-outline';
  // up icon name
  upIconName:string = 'ios-thumbs-up-outline';

  diguped:boolean;
  digdowned:boolean;

  // 微博评论
  replyContent:string;

  // 发送状态开关
  isSending:boolean = false;

  // 接受回复的用户编号
  at:string;

  @ViewChild('replyInput') replyInput: TextInput;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private params: NavParams,
    private cmntdata: CommunityData
  ) {}

  ionViewDidEnter(){
    this._getWeiboDetails();
    // console.log(this.replyInput);
  }

  // TODO, 打开评论用户页面，目前是创业者页面，后面估计要根据用户类型打开对应的模板
  // @2016/09/18
  openPersonalPage(){
    this.navCtrl.push(EntrepreneurPage);
  }

  _getWeiboDetails(){
    this.weibo = this.params.data;
    // console.log(this.weibo);
    this.cmntdata.getWeiboDetails(this.weibo.id).then(result=>{
      this.weibo = result.res.data.weibo;
      // FIXME, 修正没图片的情况
      if(!this.weibo.images) this.weibo.images = [];

      this.replys = result.res.data.replys;
      console.log(this.replys);
    });

  }

  // clear binding data;
  ionViewWillLeave(){
    // this.cmnt = null;
    console.log('detail page leave...');
  }

  replyTo(reply, input){
    //回复用户编号，回复完成后，要清空
    this.at = reply.uid;
    this.replyContent = '@'+reply.fullname+' ';
    input.setFocus();
  }


  // 打开图片幻灯片
  openImgSlides(weibo) {
    let modal = this.modalCtrl.create(WeiboImagesPage, weibo);
    modal.present();
  }

  // 点赞
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
      if(result.meta.code==403){
        this.showAlert('注意', result.res.tips);
        this.weibo.dig = parseInt(this.weibo.dig)-1;
      }
    });
    // 重置开关
    this.diguped = true;
  }

  // 踩一下
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

  // 发送微博评论
  sendReply(){
    if(!this.replyContent) return;
    // console.log('send reply...');
    this.cmntdata.replyWeibo(this.weibo.id, this.replyContent, this.at).then(result=>{
      // 每次发送评论后恢复at参数，这样能区分是否是回复某人，还是直接评论
      this.at = null;
      // TODO: 刷新页面
      this.cmntdata.getWeiboDetails(this.weibo.id).then(result=>{
        this.weibo = result.res.data.weibo;
        // FIXME, 修正没图片的情况
        if(!this.weibo.images) this.weibo.images = [];

        this.replys = result.res.data.replys;
        this.replyContent = null;//clear content
        this.isSending = false;
      });
    });
    // show loading...
    this.isSending = true;
  }

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['好的']
    });
    alert.present();
  }


}
