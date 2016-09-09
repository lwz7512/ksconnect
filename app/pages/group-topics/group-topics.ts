import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {TopicDetailPage,} from '../topic-detail/topic-detail';
import {GroupDetailsPage, } from '../group-details/group-details';

/*
  Generated class for the GroupTopicsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/group-topics/group-topics.html',
})
export class GroupTopicsPage {

  constructor(private navCtrl: NavController) {

  }

  openTopicDetail(){
    console.log('open details...');
    this.navCtrl.push(TopicDetailPage);
  }

  openGroupDetails(){
    this.navCtrl.push(GroupDetailsPage);
  }

}
