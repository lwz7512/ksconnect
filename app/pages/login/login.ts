import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import {User} from '../../providers/user/user';
import {TabsPage} from '../../pages/tabs/tabs';

import {BlankPage} from '../blank/blank';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(
    private navCtrl: NavController,
    private userData: User,
    private events: Events
  ) { }

  ionViewWillEnter(){
    // console.log(this.navCtrl.parent.);
  }


  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      // reload page...
      this.events.publish('user:login');


    }

  }

  onSignup() {

  }

}
