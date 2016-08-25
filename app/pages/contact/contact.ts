import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/contact/contact.html'
})
export class ContactPage {

  pet: string = "myteam";
  isAndroid: boolean = false;

  constructor(private platform: Platform, private navCtrl: NavController) {
    this.isAndroid = platform.is('android');
  }
}
