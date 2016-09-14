import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ProjectPage} from '../project/project';

@Component({
  templateUrl: 'build/pages/recommend-project/recommend-project.html',
})
export class RecommendProjectPage {
    rank: string = "rank_C";
    ranks : any[] = [
        {top:1,name:'雪瓣',rand:'Pre-A轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:2,name:'EMGRehab',rand:'A轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:3,name:'CoffeeBar',rand:'天使轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:4,name:'斯凯智能',rand:'B轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:5,name:'快投Qcast',rand:'天使轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:6,name:'蜂巢天下',rand:'天使轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:7,name:'斯凯智能',rand:'天使轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:8,name:'斯凯智能',rand:'天使轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:9,name:'斯凯智能',rand:'天使轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:10,name:'斯凯智能',rand:'天使轮',content:'Badges are small that typically communicate a numerical value to the user.'},
    ];
    rankst : any[] = [
        {top:1,name:'EMGRehab',rand:'A轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:2,name:'斯凯智能',rand:'天使轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:3,name:'雪瓣',rand:'Pre-A轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:4,name:'斯凯智能',rand:'B轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:5,name:'CoffeeBar',rand:'天使轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:6,name:'斯凯智能',rand:'天使轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:7,name:'蜂巢天下',rand:'天使轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:8,name:'快投Qcast',rand:'天使轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:9,name:'斯凯智能',rand:'天使轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:10,name:'斯凯智能',rand:'天使轮',content:'Badges are small that typically communicate a numerical value to the user.'},
    ];
    ranksx : any[] = [
        {top:1,name:'斯凯智能',rand:'B轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:2,name:'雪瓣',rand:'Pre-A轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:3,name:'EMGRehab',rand:'A轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:4,name:'CoffeeBar',rand:'天使轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:5,name:'快投Qcast',rand:'天使轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:6,name:'蜂巢天下',rand:'天使轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:7,name:'斯凯智能',rand:'天使轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:8,name:'斯凯智能',rand:'天使轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:9,name:'斯凯智能',rand:'天使轮',content:'Badges are small that typically communicate a numerical value to the user.'},
        {top:10,name:'斯凯智能',rand:'天使轮',content:'Badges are small that typically communicate a numerical value to the user.'},
    ];
    constructor(
        private navCtrl: NavController
    ) {}

    openProjectPage(i){
        console.log(i);
        var pro = this.ranks[i];
        this.navCtrl.push(ProjectPage,pro);
    }

    
}
