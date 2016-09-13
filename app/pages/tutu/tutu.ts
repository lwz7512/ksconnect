import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Host} from '../../providers/host/host';
import {CommunityData} from '../../providers/community-data/community-data';
/*
  Generated class for the TutuPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/tutu/tutu.html',
})
export class TutuPage {
    weibos : any;
    constructor(
        private navCtrl: NavController,
        private cmntdata: CommunityData,
    ){

    }

    ionViewDidEnter() {
        console.log('>>> enter the home view...')
        this.cmntdata.loadWeibo().then(data => {
            console.log(data.res.data);
            this.weibos = data.res.data;
            // 更新数据后关闭强制刷新
            this.cmntdata.forceToRefresh = false;
        });
    }

    test(){
        console.log(123);
    }


}
