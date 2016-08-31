import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, LoadingController, ToastController, ActionSheetController, Platform, NavParams, Loading} from 'ionic-angular';

import { Camera, CameraOptions } from 'ionic-native';

import {TopicDetailPage,} from '../topic-detail/topic-detail';
import {CommunityData} from '../../providers/community-data/community-data';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  topics: any;
  loader: Loading;

  constructor(
    private navCtrl: NavController,
    private cmntdata: CommunityData,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {

    // let innerTxt = "a#b.c#de,f#g-h#....";
    // let converted = innerTxt.replace(/#*#/g, ' ');
    let innerTxt = '....#abc# , #FFF #';
    let converted = innerTxt.replace(/#([^#]*)#/g, "<a>$1</a>");
    console.log(converted);
    let attopic = '...@#some blabla...';
    let convertat = attopic.replace(/@#([^@#]*)\s/g, "<a>@#$1</a>");
    console.log(convertat);
  }

  // 每次进来都要执行
  ionViewDidEnter() {

    this.cmntdata.load().then(data => {
      // console.log(data.res.data);
      this.topics = data.res.data;
    });
  }


  openTopicDetail(){
    console.log('open details...');
    this.navCtrl.push(TopicDetailPage);
  }

  openModal(characterNum) {

    let modal = this.modalCtrl.create(ModalsContentPage, characterNum);
    modal.present();
  }



}

@Component({
  templateUrl: 'build/pages/modals/write-weibo.html'
})
class ModalsContentPage {

  weibo: any = {images:[]};//images字段必须
  loader: Loading;
  showFooter: boolean;

  // 拍照或者选取的图片组
  selectedImgs: Array<string> = [];


  constructor(
      private platform: Platform,
      private params: NavParams,
      private viewCtrl: ViewController,
      private loadingCtrl: LoadingController,
      private toastCtrl: ToastController,
      private cmntdata: CommunityData,
      private actionSheetCtrl: ActionSheetController
  ) {}


  presentActionSheet() {

    let actionSheet = this.actionSheetCtrl.create({
      title: '选择图片来源',
      buttons: [
        {
          text: '拍 照',
          handler: () => {
            // console.log('Destructive clicked');
            this._takeShot();
          }
        },{
          text: '相 册',
          handler: () => {
            // console.log('Archive clicked');
            this._openAlblumn();
          }
        },{
          text: '取 消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    // 延迟打开窗口，这样按钮图标不会闪烁，体验好！
    // @2016/08/31
    setTimeout(()=>{
      actionSheet.present();
    }, 100);
  }

  _takeShot(){

    let options:CameraOptions = {};
    options.destinationType = Camera.DestinationType.FILE_URI;
    options.sourceType = Camera.PictureSourceType.CAMERA;
    options.allowEdit = true;
    options.encodingType = Camera.EncodingType.PNG;
    options.targetWidth = 400;
    options.targetHeight = 360;
    options.saveToPhotoAlbum = true;

    Camera.getPicture(options).then((fileURI) => {
      // 从相机插件返回的图片文件格式：file:///var.xxx.......
      // TODO: 要上传图片，然后返回图片URL地址
      let imgPath = fileURI.split(':')[1].substr(2);
      // 图片路径保存下来准备上传
      window.localStorage.setItem('_localavatar', imgPath);

      this.selectedImgs.push(imgPath);
      // 删除第一个
      if(this.selectedImgs.length>3) this.selectedImgs.splice(0,1);

      // TODO， 上传选择的图片，把地址存下来

      // 貌似没啥用
      Camera.cleanup();

    }, (err) => {
     // Handle error
    });
  }



  _openAlblumn(){
    let options:CameraOptions = {};
    options.destinationType = Camera.DestinationType.FILE_URI;
    options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
    options.allowEdit = true;
    options.encodingType = Camera.EncodingType.PNG;
    options.targetWidth = 400;
    options.targetHeight = 360;
    // options.saveToPhotoAlbum = true;

    Camera.getPicture(options).then((fileURI) => {
      // 从相机插件返回的图片文件格式：file:///var.xxx.......
      // TODO: 要上传图片，然后返回图片URL地址
      let imgPath = fileURI.split(':')[1].substr(2);
      // 图片路径保存下来准备上传
      window.localStorage.setItem('_localavatar', imgPath);

      this.selectedImgs.push(imgPath);
      // 删除第一个
      if(this.selectedImgs.length>3) this.selectedImgs.splice(0,1);

      // TODO， 上传选择的图片，把地址存下来

      // 貌似没啥用
      Camera.cleanup();

    }, (err) => {
     // Handle error
    });
  }

  sendWeibo() {
    if(!this.weibo.content || !this.weibo.tags) return;

    // console.log(this.weibo);
    // console.log('sending weibo...');

    this.cmntdata.sendWeibo(this.weibo).then(data => {
      console.log(data);
      this._dimissLoading();
      this.dismiss();
      setTimeout(()=>this._showToast('微博发送成功!'), 500);
      // TODO, refresh homepage....
      //
    }, error => {
      console.error(error);
    });
    this._presentLoading();//open loading...
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  autoGrowTextAreaHeight(event){
  	var element = event.target;
    element.style.height = "auto";//这行是必要的，当内容减少会收缩！
  	element.style.height =  element.scrollHeight + "px";

    // this.showFooter = true;
  }

  _uploadImage(filePath){
    
  }

  _presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "sending...",
      // duration: 3000
    });
    this.loader.present();
  }

  _dimissLoading(){
    if(this.loader) this.loader.dismiss();
  }

  _showToast(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
