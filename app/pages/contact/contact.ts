/**
 * 群组模块
 */
import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';

import {GroupData} from '../../providers/group-data/group-data';
import {SmartImage} from '../../components/smart-image';
import {PubgroupPage} from '../pubgroup/pubgroup';


@Component({
  directives: [SmartImage],
  templateUrl: 'build/pages/contact/quanzi.html'
})
export class ContactPage {

  pet: string = "myteam";
  // 底部幻灯片选项配置
  topslides = {
    slidesPerView: 4,spaceBetween: 1
  };
  // 绑定到模板上的数据
  pubgroups: any;
  top4groups: any;

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private groupdata:GroupData) {
      // 先放四个占位幻灯片
      this.top4groups = [
        {name:'', icon:'img/plchdr.png', members:0},
        {name:'', icon:'img/plchdr.png', members:0},
        {name:'', icon:'img/plchdr.png', members:0},
        {name:'', icon:'img/plchdr.png', members:0}];
    }

  ionViewDidEnter(){
    this.groupdata.loadPublicGroups().then(data=>{
      // console.log(data);

      this.pubgroups = data.res.data;
      this.top4groups = data.res.data.slice(0, 4);

    });
  }

  // 把获取到的公开组送到新页面打开
  openPublicGroups(){
    this.navCtrl.push(PubgroupPage, this.pubgroups);
  }


}
