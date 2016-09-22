/**
* 创投圈模块
*/
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {WikiData} from '../../providers/wiki-data/wiki-data';
import {RankingPage} from '../ranking/ranking';
import {RankingInvestorPage} from '../ranking-investor/ranking-investor';
import {RecommendInvestorPage} from '../recommend-investor/recommend-investor';
import {RecommendProjectPage} from '../recommend-project/recommend-project';
import {ReportPage} from '../report/report';
import {InvestorData} from '../../providers/investor-data/investor-data';

@Component({
    templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {

    weibos: any;

    constructor(
        private navCtrl: NavController,
        private investordata: InvestorData,
        private wikidata: WikiData) {}

        // 幻灯片选项
        mySlideOptions = {
            loop: true, pager: true,
            // autoplay: 2000
        };
        // 底部幻灯片选项配置
        bottomslides = {
            slidesPerView: 3,spaceBetween: 1
        };

        ionViewDidEnter() {

        }

        openRanking(){
            console.log('open details...');
            this.navCtrl.push(RankingPage);
        }

        openRankingInvestor(){
            console.log('open details...');
            this.navCtrl.push(RankingInvestorPage);
        }

        openRecommendInvestor(){
            console.log('open details...');
            this.navCtrl.push(RecommendInvestorPage);
        }

        openRecommendProject(){
            this.navCtrl.push(RecommendProjectPage);
        }

        openReport(){
            this.navCtrl.push(ReportPage);
        }


    }
