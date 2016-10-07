import { Component } from '@angular/core';
import { NavController, ModalController, NavParams,AlertController, ActionSheetController } from 'ionic-angular';

import {WikiData} from '../../providers/wiki-data/wiki-data';
import {Social} from '../../providers/social/social';

@Component({
    templateUrl: 'build/pages/project/project.html',
})
export class ProjectPage {

    project : any = {img:'img/thumbnail-totoro.png'};
    isLoading: boolean = true;

    constructor(
      private navCtrl: NavController,
      private modalCtrl: ModalController,
      private alertCtrl: AlertController,
      private params: NavParams,
      private wiki: WikiData,
      private actionSheetCtrl: ActionSheetController,
      private social: Social
    ) {}

    ionViewDidEnter(){
      this.project = this.params.data;
      this.wiki.loadReportDetail(this.project.id).then(data => {
        console.log(data);

        this.project.content = data.res.data['0'].content;

        this.isLoading = false;
      });
    }

    showPrompt() {
      let prompt = this.alertCtrl.create({
      message: "有什么想对他说的...",
      inputs: [
          {
              name: 'title',
              placeholder: '说点什么..'
          },
      ],
      buttons: [
          {
              text: '取消',
              handler: data => {
                  console.log('Cancel clicked');
              }
          },
          {
              text: '发送',
              handler: data => {
                  console.log('Saved clicked');
              }
          }
      ]
    });
    prompt.present();
  }

  sharePage():void {
    let actionSheet = this.actionSheetCtrl.create({
      title: '分享给',
      buttons: [
        {
          text: '小组',
          icon: 'people',
          handler: () => {
            console.log('share to group');
          }
        },{
          text: '微信好友',
          icon: 'chatbubbles',
          handler: () => {
            // 四个参数：标题、摘要、文章地址、缩略图地址
            let title = this.project.title;
            let description = this.project.summary;
            let articleURL = 'http://kiscp.kstartup.cn/#/detail/'+this.project.id;
            let thumbnailURL = this.project.img;
            this.social.share(0, title, description, articleURL, thumbnailURL);
          }
        },{
          text: '朋友圈',
          icon: 'aperture',
          handler: () => {
            console.log('share to friends');
            // TODO: params ? ...
            this.social.share(1, '', '', '', '');
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();

  }

  markPage():void {

  }


}
