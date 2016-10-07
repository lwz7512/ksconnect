import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {WikiData} from '../../providers/wiki-data/wiki-data';

import {Summary} from '../../pipes/summary';
import {RelativeTime} from '../../pipes/RelativeTime';

import {ReportDetailPage} from '../report-detail/report-detail';

@Component({
  templateUrl: 'build/pages/report/report.html',
  pipes: [RelativeTime, Summary]
})
export class ReportPage {

    reports : any[];

    isSending: boolean;

    constructor(
      private navCtrl: NavController,
      private reportdata: WikiData
    ) {
      this.isSending = true;
    }

    ionViewDidEnter() {
      this.reportdata.loadWikiReport().then(data => {
        // console.log(this.datas.res.data);
        // FIXME, for tag string...
        // @2016/10/07
        for(let i in data.res.data){
          let tag = data.res.data[i].tag;
          if(typeof tag == 'string') data.res.data[i].tag = [tag];
        }
        this.reports = data.res.data;
        this.isSending = false;//loading complete...
      });
    }

    navtoReportDetail(report){
      this.navCtrl.push(ReportDetailPage, report);
    }


}
