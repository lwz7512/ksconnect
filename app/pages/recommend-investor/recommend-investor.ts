import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PersonalPage} from '../personal/personal';

import {WikiData} from '../../providers/wiki-data/wiki-data';
import {Summary} from '../../pipes/summary';
import {MissImage} from '../../pipes/MissImage';

/*
  Generated class for the RankingInvestorPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/recommend-investor/recommend-investor.html',
  pipes: [Summary, MissImage]
})
export class RecommendInvestorPage {

  isLoading: boolean;
  investors: any[] = [];

  constructor(
    private navCtrl: NavController,
    private wiki: WikiData
  ) {
    this.isLoading = true;
  }

  ionViewDidEnter(){
    this.wiki.loadRecommendInvestors().then(data => {
      console.log(data);
      this.investors = data.res.data;
      this.isLoading = false;
    });
  }

  openPersonalPage(user){
    this.navCtrl.push(PersonalPage,user);
  }

}
