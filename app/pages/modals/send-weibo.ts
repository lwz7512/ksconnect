import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, LoadingController, ToastController, ActionSheetController, AlertController} from 'ionic-angular';
import { Loading, Platform, NavParams} from 'ionic-angular';

import { Camera, CameraOptions, Transfer, FileUploadOptions } from 'ionic-native';


import {CommunityData} from '../../providers/community-data/community-data';
import {Host} from '../../providers/host/host';
import {User} from '../../providers/user/user';


@Component({
  templateUrl: 'build/pages/modals/write-weibo.html'
})
export class ModalsContentPage {

  weibo: any = {images:[]};//images字段必须
  loader: Loading;
  showFooter: boolean;

  // 拍照或者选取的图片组
  selectedImgs: Array<string> = ['img/plchdr.png','img/plchdr.png','img/plchdr.png'];
  // 上传成功后得到的图片地址
  uploadedImgs: any = {};
  // 发送状态，绑定到窗口的spinner组件 @2016/09/10
  // 对话框里就不用loading组件了，尽是问题...
  isSending:boolean = false;

  constructor(
      private viewCtrl: ViewController,
      private loadingCtrl: LoadingController,
      private toastCtrl: ToastController,
      private cmntdata: CommunityData,
      private actionSheetCtrl: ActionSheetController,
      private alertCtrl: AlertController,
      private host: Host,
      private user: User
  ) {}


  sendWeibo() {
    if(!this.weibo.content || !this.weibo.tags) {
      this._showAlert('内容和标签是必填项!');
      return;
    }

    // 打开状态开关
    this.isSending = true;

    // 重置
    this.weibo.images = [];
    // 获取上传的图片
    for(let i in this.selectedImgs){
      let localImgFile = this.selectedImgs[i];
      let linkAndId:any = this.uploadedImgs[localImgFile];
      // FIXME, 图片有可能没选择 @2016/09/11
      if(!linkAndId) continue;
      this.weibo.images.push(linkAndId);
    }

    this.cmntdata.sendWeibo(this.weibo).then(data => {
      // console.log(data);
      setTimeout(()=>this._showToast('微博发送成功!'), 1000);

      // 强制刷新主页
      this.cmntdata.forceToRefresh = true;
      // 恢复发送状态 @2016/09/10
      this.isSending = false;

      this.dismiss();

      // 微博发送成功了才能清理缓存 @2016/09/10
      Camera.cleanup();

    }, error => {
      console.error(error);
      this.isSending = false;
      setTimeout(()=>this._showToast('艾玛。。。微博发送失败!'), 500);
      this.dismiss();
    });
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
      // alert(fileURI);
      // 从相机插件返回的图片文件格式：file:///var.xxx.......
      // TODO: 要上传图片，然后返回图片URL地址
      let imgPath = fileURI.split(':')[1].substr(2);
      // 图片路径保存下来准备上传
      window.localStorage.setItem('_localavatar', imgPath);

      this.selectedImgs.push(imgPath);
      // 删除第一个
      if(this.selectedImgs.length>3) this.selectedImgs.splice(0,1);

      // // TODO， 上传选择的图片，把地址存下来
      this._uploadImage(imgPath);


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
      // 图片路径竟然带问号？@2016/09/10
      if(imgPath.indexOf('?')>-1){
        imgPath = imgPath.substr(0,imgPath.indexOf('?'));
      }
      // alert(imgPath);
      // 图片路径保存下来准备上传
      this.selectedImgs.push(imgPath);
      // 删除第一个
      if(this.selectedImgs.length>3) this.selectedImgs.splice(0,1);

      // TODO， 上传选择的图片，把地址存下来
      this._uploadImage(imgPath);

    }, (err) => {
     // Handle error
    });
  }


  _uploadImage(filePath){
    let upres:any;
    let win = (r) => {
      this._dimissLoading();
      // 解析结果
      upres = JSON.parse(r.response);
      // alert(JSON.stringify(upres));
      if(upres.meta.code == 403){
        alert("登录信息已经失效，请重新登录!");
        return;
      }
      // 存起来，发微博用
      this.uploadedImgs[filePath] = upres.res.data[0];

      // FIXME, 不能在这里加清理拍照缓存，否则每次起名都是重复图片 @2016/09/10
      // Camera.cleanup();
    };

    let fail = (error) => {
        // alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
        alert('图片上传失败: '+error.code+','+error.source);
        this._dimissLoading();
    };
    // 获取磁盘文件路径
    let fileURL = filePath;
    let options:FileUploadOptions = {};
    options.fileKey = "files[]";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    options.mimeType = "text/plain";
    // FIXME, 上传图片时也要加token
    // @2016/10/06
    let params:any = {};
    params.token = this.user.getUserToken();
    options.params = params;

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

  _showAlert(message) {
    let alert = this.alertCtrl.create({
      title: '注意',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
