import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, LoadingController, ToastController, ActionSheetController, Platform, NavParams, Loading} from 'ionic-angular';

import { Camera, CameraOptions, Transfer, FileUploadOptions } from 'ionic-native';


import {CommunityData} from '../../providers/community-data/community-data';
import {Host} from '../../providers/host/host';


@Component({
  templateUrl: 'build/pages/modals/write-weibo.html'
})
export class ModalsContentPage {

  weibo: any = {images:[]};//images字段必须
  loader: Loading;
  showFooter: boolean;

  // 拍照或者选取的图片组
  selectedImgs: Array<string> = [];
  // 上传成功后得到的图片地址
  uploadedImgs: any = {};

  constructor(
      // private platform: Platform,
      // private params: NavParams,
      private viewCtrl: ViewController,
      private loadingCtrl: LoadingController,
      private toastCtrl: ToastController,
      private cmntdata: CommunityData,
      private actionSheetCtrl: ActionSheetController,
      private host: Host
  ) {}


  sendWeibo() {
    if(!this.weibo.content || !this.weibo.tags) return;
    // 重置
    this.weibo.images = [];
    // 获取上传的图片
    for(let i in this.selectedImgs){
      let localImgFile = this.selectedImgs[i];
      let linkAndId:any = this.uploadedImgs[localImgFile];
      this.weibo.images.push(linkAndId);
    }

    this.cmntdata.sendWeibo(this.weibo).then(data => {
      console.log(data);
      this._dimissLoading();
      this.dismiss();
      setTimeout(()=>this._showToast('微博发送成功!'), 500);
      // TODO, refresh homepage....
      //
    }, error => {
      console.error(error);
      setTimeout(()=>this._showToast('艾玛。。。微博发送失败!'), 500);
      this._dimissLoading();
      this.dismiss();
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
      this._uploadImage(imgPath);
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
      this._uploadImage(imgPath);
      // 貌似没啥用
      Camera.cleanup();

    }, (err) => {
     // Handle error
    });
  }


  _uploadImage(filePath){
    let upres:any;
    let win = (r) => {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        // 解析结果
        upres = JSON.parse(r.response);
        // let imgURL = upres.res.data[0].link;
        // 存起来，发微博用
        this.uploadedImgs[filePath] = upres.res.data[0];
        this._dimissLoading();
    };

    let fail = (error) => {
        alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
        alert('图片上传失败: '+error.code);
        this._dimissLoading();
    };
    // 获取磁盘文件路径
    let fileURL = filePath;
    let options:FileUploadOptions = {};
    options.fileKey = "files[]";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    options.mimeType = "text/plain";

    let fileTransfer = new Transfer();
    let url = encodeURI(this.host.getHostURL()+'/images');
    // upload...
    fileTransfer.upload(fileURL, url, options).then(win, fail);
    this._presentLoading();
  }

  _presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Sending...",
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
