import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {InvestorData} from '../../providers/investor-data/investor-data';

@Component({
  templateUrl: 'build/pages/report/report.html',
})
export class ReportPage {
    reports : any[];
    datas : any;

    constructor(private navCtrl: NavController,
        private investordata: InvestorData
    ) {
    }

    ionViewDidEnter() {
        this.investordata.loadWiki().then(data => {
            this.datas = data;
            console.log(this.datas.res.data);
            this.reports = this.datas.res.data;
        });
    }



}
