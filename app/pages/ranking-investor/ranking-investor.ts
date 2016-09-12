import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the RankingInvestorPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/ranking-investor/ranking-investor.html',
})
export class RankingInvestorPage {
    rank: string = "rank_C";
    ranks : any[] = [
        {top:1,username:'程科屹', title:'创始人',company:'险峰华兴',avatar:'img/thumbnail-puppy-1.jpg'},
        {top:2,username:'雷军', title:'首席执行官',company:'小米科技',avatar:'img/thumbnail-kitten-2.jpg'},
        {top:3,username:'李峰', title:'创始合伙人',company:'IDG资本',avatar:'img/thumbnail-puppy-3.jpg'},
        {top:4,username:'Eric Liu', title:'投资经理',company:'险峰华兴',avatar:'img/thumbnail-puppy-4.jpg'},
        {top:5,username:'屈田', title:'创始合伙人',company:'小米科技',avatar:'img/thumbnail-kitten-1.jpg'},
        {top:6,username:'程科屹', title:'创始人',company:'小米科技',avatar:'img/thumbnail-puppy-1.jpg'},
        {top:7,username:'雷军', title:'首席执行官',company:'小米科技',avatar:'img/thumbnail-kitten-2.jpg'},
        {top:8,username:'李峰', title:'创始合伙人',company:'小米科技',avatar:'img/thumbnail-puppy-3.jpg'},
        {top:9,username:'Eric Liu', title:'投资经理',company:'小米科技',avatar:'img/thumbnail-puppy-4.jpg'},
        {top:10,username:'屈田', title:'创始合伙人',company:'小米科技',avatar:'img/thumbnail-kitten-1.jpg'},
    ];
    constructor(
        private navCtrl: NavController
    ) {}
}
