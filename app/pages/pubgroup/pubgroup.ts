import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {SmartImage} from '../../components/smart-image';
import {GroupTopicsPage} from '../group-topics/group-topics';


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

    
  }

  // 打开小组话题页面
  openGroupTopics(group){
    this.navCtrl.push(GroupTopicsPage, group);
  }


}
