import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, NavParams, } from 'ionic-angular';
import { ActionSheetController, AlertController, TextInput,  } from 'ionic-angular';

import {WeiboImagesPage} from '../modals/weibo-slides';
import {EntrepreneurPage} from '../entrepreneur/entrepreneur';

import {SmartImage} from '../../components/smart-image';
import {RelativeTime} from '../../pipes/RelativeTime';

import {CommunityData} from '../../providers/community-data/community-data';
import {Social} from '../../providers/social/social';


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
  weibo:any;
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
  // 默认进来时查询微博详情 显示加载状态 @2016/09/26
  isSending:boolean = true;

  // 接受回复的用户编号
  at:string;

  // TODO:
  // 默认不是帖子，待后台查出来类型才能判断出来
  // @2016/09/27
  isArticle:boolean;


  @ViewChild('replyInput') replyInput: TextInput;


  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private params: NavParams,
    private cmntdata: CommunityData,
    private social: Social
  ) {
    // 先初始化数据，比如时间，不然显示: NaN
    this.weibo = {images:[], ctime: new Date().getTime()/1000};
  }

  ionViewDidEnter(){
    this._getWeiboDetails();
    // console.log(this.replyInput);
  }

  shareTopic(){
    // console.log('share topic...');

  }

  // TODO, 打开评论用户页面，
  // 目前是静态的创业者页面，后面估计要根据用户类型打开对应的模板
  // @2016/09/18
  openPersonalPage(reply){
    // console.log('open: ');
    // console.log(reply);
    this.navCtrl.push(EntrepreneurPage);
  }

  // TODO, 获取内容类型，是微博还是帖子
  // @2016/09/27
  _getWeiboDetails(){
    this.weibo = this.params.data;
    this.cmntdata.getWeiboDetails(this.weibo.id).then(result=>{
      this.weibo = result.res.data.weibo;
      this.replys = result.res.data.replys;
      // console.log(result.res);
      // FIXME, 修正没图片的情况
      if(!this.weibo.images) this.weibo.images = [];

      // console.log(this.replys);
      this.isSending = false;

      // TODO, 类型呢？
      this.isArticle = true;

    });
    this.isSending = true;
  }

  // clear binding data;
  ionViewWillLeave(){
    // this.cmnt = null;
    // console.log('detail page leave...');
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
