import {Component} from '@angular/core';
import {NavController, ViewController, ModalController, LoadingController, ToastController, ActionSheetController, Platform, NavParams, Loading} from 'ionic-angular';

import { Camera, CameraOptions, Transfer, FileUploadOptions } from 'ionic-native';

import {Host} from '../../providers/host/host';
import {TopicDetailPage,} from '../topic-detail/topic-detail';
import {CommunityData} from '../../providers/community-data/community-data';
import {ModalsContentPage} from '../modals/send-weibo';

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
