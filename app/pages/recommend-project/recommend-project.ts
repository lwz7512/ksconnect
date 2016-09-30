import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ProjectPage} from '../project/project';

import {WikiData} from '../../providers/wiki-data/wiki-data';
import {Summary} from '../../pipes/summary';

@Component({
  templateUrl: 'build/pages/recommend-project/recommend-project.html',
  pipes: [Summary]
})
export class RecommendProjectPage {

    rank: string = "rank_C";
    ranks : any[] = [];
    rankst : any[] = [];
    ranksx : any[] = [];

    isLoading: boolean;
    projects: any[] = [];

    constructor(
      private navCtrl: NavController,
      private wiki: WikiData
    ) {
      this.isLoading = true;
    }

    ionViewDidEnter(){
      this.wiki.loadRecommendProjects().then(data => {
        // console.log(data);
        this.projects = data.res.data;
        this.isLoading = false;
      });
    }

    openProjectPage(project){
      // console.log(project);
      this.navCtrl.push(ProjectPage, project);
    }

    viewByRankType(rank){
      console.log(rank);
    }

}
