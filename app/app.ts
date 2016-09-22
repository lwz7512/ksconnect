import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';

import {Host} from './providers/host/host';
import {CommunityData} from './providers/community-data/community-data';
import {GroupData} from './providers/group-data/group-data';
import {WikiData} from './providers/wiki-data/wiki-data';
import {InvestorData} from './providers/investor-data/investor-data';
import {User} from './providers/user/user';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      // set StatusBar overlay @2016/08/16
      StatusBar.overlaysWebView(true);
      // 手动隐藏splash @2016/09/10
      Splashscreen.hide();
    });
  }

}

ionicBootstrap(
  MyApp,
  [Host, CommunityData, GroupData, WikiData, User, InvestorData],
  {tabsPlacement: 'top', backButtonText: '', tabsHideOnSubPages:"true"}
);
