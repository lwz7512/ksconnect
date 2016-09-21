import {Component, ViewChild} from '@angular/core';
import { Events, ionicBootstrap, MenuController, Nav, Platform, Tabs,  } from 'ionic-angular';


import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';

import {MinePage} from '../mine/mine';
import {LoginPage} from '../login/login';

import {User} from '../../providers/user/user';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;
  private tab4Root: any;

  @ViewChild(Tabs) tabs: Tabs;

  constructor(private userdata:User, private events: Events) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = AboutPage;
    this.tab3Root = ContactPage;
    this.tab4Root = MinePage;

    // this.events.subscribe('user:login', () => {
    //   console.log('>>> received login event...');
    //   // 刷新应用...
    // });
    // console.log('>>> tabs constructed!');
  }

  ionViewWillEnter(){
    // console.log('>>> will enter tabs page...');

  }

  ionViewDidEnter(){
    // console.log('>>> did enter tabs page...')
  }

  tabChanged(event){
    // console.log('tab changed!');
    // console.log(event);

  }

}
