import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';

import {MissImage} from '../../pipes/MissImage';
import {Summary} from '../../pipes/summary';

import {WikiData} from '../../providers/wiki-data/wiki-data';
import {Social} from '../../providers/social/social';


@Component({
  templateUrl: 'build/pages/personal/personal.html',
  pipes: [MissImage, Summary]
})
export class PersonalPage {

    person: any = {img: 'img/avatar_fml.png', summary: ''};
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
      // console.log(this.params.data);
      this.person = this.params.data;
      this.wiki.loadReportDetail(this.person.id).then(data => {
        console.log(data);

        this.person.content = data.res.data['0'].content;

        this.isLoading = false;
      });
    }

    showPrompt() {
      let prompt = this.alertCtrl.create({
          message: "有什么想对他说的...",
          inputs: [
              {
                  name: 'title',
                  placeholder: '说点什么，让投资人更青睐你。'
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
            let title = this.person.title;
            let description = this.person.summary;
            let articleURL = 'http://kiscp.kstartup.cn/#/detail/'+this.person.id;
            let thumbnailURL = this.person.img;
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
