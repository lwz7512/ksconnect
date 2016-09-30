import { Component } from '@angular/core';
import { NavController, ModalController, NavParams,AlertController  } from 'ionic-angular';

import {WikiData} from '../../providers/wiki-data/wiki-data';


@Component({
    templateUrl: 'build/pages/project/project.html',
})
export class ProjectPage {

    project : any = {img:'img/thumbnail-totoro.png'};
    isLoading: boolean = true;

    constructor(
      private navCtrl: NavController,
      private modalCtrl: ModalController,
      private alertCtrl: AlertController,
      private params: NavParams,
      private wiki: WikiData
    ) {}

    ionViewDidEnter(){
      this.project = this.params.data;
      this.wiki.loadReportDetail(this.project.id).then(data => {
        // console.log(data);

        this.project.content = data.res.data['0'].content;

        this.isLoading = false;
      });
    }

    showPrompt() {
        let prompt = this.alertCtrl.create({
            message: "有什么想对他说的...",
            inputs: [
                {
                    name: 'title',
                    placeholder: '说点什么..'
                },
            ],
            buttons: [
                {
                    text: '取消',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '发送',
                    handler: data => {
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    }


}
