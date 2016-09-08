import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {SmartImage} from '../../components/smart-image';

/*
  Generated class for the PubgroupPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  directives: [SmartImage],
  templateUrl: 'build/pages/pubgroup/pubgroup.html',
})
export class PubgroupPage {

  // 二维数组，用于网格组件
  groupsArray: any;

  constructor(
    private navCtrl: NavController,
    private params: NavParams
  ) {
    this.groupsArray = [];
  }

  ionViewDidEnter(){

    this.groupsArray = this.params.data;

    // let i:any;
    // let row: any;
    // for (i in groups) {
    //   var newrow = i % 4;
    //   if(i%4 == 0) {
    //     row = [];
    //     this.groupsArray.push(row);
    //   }
    //   row.push(groups[i]);
    // }
    // console.log(this.groupsArray);
  }

  goToGroupDetail(group){

  }

}
