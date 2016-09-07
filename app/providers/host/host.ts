import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Host provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Host {

  private prodURL = 'http://api.kstartup.cn';

  constructor(private http: Http) {

  }

  getHostURL(){
    return this.prodURL;
  }


}
