import { Injectable } from '@angular/core';
import {ViewController, Content, Events} from 'ionic-angular';

import {SmartImage} from './smart-image';

@Injectable()
export class SmartImageController extends ViewController {

  smtImages: SmartImage[];
  content: Content;

  constructor(private events: Events){
    super();
    this.smtImages = [];
  }

  // public method
  iniLazyLoad(content: Content){
    this.content = content;

    this.events.subscribe('smtImg', params => {
      this.smtImages.push(params[0]);
    });

    // console.log('ng after view init...');
    this.content.addScrollListener(event => {
      // console.log(event.target.scrollTop);
      this.smtImages.forEach(image => {
        image.scrollNotify();
      })
    });
  }

}
