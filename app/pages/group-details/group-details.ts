import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {GroupMembersPage} from '../group-members/group-members';

/*
  Generated class for the GroupDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/group-details/group-details.html',
})
export class GroupDetailsPage {

  constructor(private navCtrl: NavController) {

  }

  openGroupMembers(){
    this.navCtrl.push(GroupMembersPage);
  }

}
