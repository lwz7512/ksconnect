import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {TopicDetailPage} from '../topic-detail/topic-detail';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(private navCtrl: NavController) {

  }

  openTopicDetail(){
    console.log('open details...');
    this.navCtrl.push(TopicDetailPage);
  }
}
