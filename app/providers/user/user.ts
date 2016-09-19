import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Events, LocalStorage, Storage } from 'ionic-angular';

import 'rxjs/add/operator/map';

/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class User {

  HAS_LOGGED_IN = 'hasLoggedIn';

  storage = new Storage(LocalStorage);

  constructor(private http: Http) {}


  login(username) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    console.log('user: '+username + 'logged!');
    
    // this.setUsername(username);
    // this.events.publish('user:login');
  }

  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }



}
