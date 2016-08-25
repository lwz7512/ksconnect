import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {TopicDetailPage} from '../topic-detail/topic-detail';
import {CommunityData} from '../../providers/community-data/community-data';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  topics: any;

  constructor(private navCtrl: NavController, private cmntdata: CommunityData) {
    // let innerTxt = "a#b.c#de,f#g-h#....";
    // let converted = innerTxt.replace(/#*#/g, ' ');
    let innerTxt = '....#abc# , #FFF #';
    let converted = innerTxt.replace(/#([^#]*)#/g, "<a>$1</a>");
    console.log(converted);
    let attopic = '...@#some blabla...';
    let convertat = attopic.replace(/@#([^@#]*)\s/g, "<a>@#$1</a>");
    console.log(convertat);
  }

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
}
