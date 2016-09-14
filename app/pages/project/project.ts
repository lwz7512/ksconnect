import { Component } from '@angular/core';
import { NavController, ModalController, NavParams,AlertController  } from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/project/project.html',
})
export class ProjectPage {
    project : string;
    round : string;

    constructor(private navCtrl: NavController,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private params: NavParams) {

    }

    ionViewDidEnter(){
        console.log(this.params);
        this.project = this.params.data.name;
        this.round = this.params.data.rand;
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
