import { Component } from '@angular/core';
import { NavController, ModalController, NavParams,AlertController  } from 'ionic-angular';


@Component({
    templateUrl: 'build/pages/personal/personal.html',
})
export class PersonalPage {
    username : string;
    avatar : string;

    constructor(private navCtrl: NavController,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private params: NavParams) {

    }

    ionViewDidEnter(){
        console.log(this.params);
        this.username = this.params.data.username;
        this.avatar = this.params.data.avatar;
    }

    showPrompt() {
        let prompt = this.alertCtrl.create({
            message: "有什么想对他说的...",
            inputs: [
                {
                    name: 'title',
                    placeholder: '说点什么，让投资人更青睐你。'
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
