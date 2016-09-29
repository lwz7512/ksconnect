import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController} from 'ionic-angular';

import {WikiData} from '../../providers/wiki-data/wiki-data';
import {RelativeTime} from '../../pipes/RelativeTime';

import {Social} from '../../providers/social/social';
/*
  Generated class for the ReportDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/report-detail/report-detail.html',
  pipes: [RelativeTime]
})
export class ReportDetailPage {

  isSending: boolean;
  report: any;
  details: any;

  constructor(
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private params: NavParams,
    private reportdata: WikiData,
    private social: Social
  ) {
    // 默认进来加载报告详情
    this.isSending = true;
    this.report = {};//必须初始化数据，不然模板绑定出错
    this.details = {'0':{}, 'images':[]};//必须为模板初始化数据...
  }

  ionViewWillEnter(){
    this.report = this.params.data;
    // console.log(this.report);
  }

  ionViewDidEnter(){
    this.reportdata.loadReportDetail(this.report.id).then(data => {
      this.details = data.res.data;
      // console.log(this.details);
      this.isSending = false;//loading complete...
    });
  }

  shareReport(){
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
            let title = this.report.title;
            let description = this.report.summary;
            let articleURL = 'http://kiscp.kstartup.cn/#/detail/'+this.report.id;
            let thumbnailURL = 'http://connect.kstartup.cn/public/images/groupShadow.gif';
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


}
