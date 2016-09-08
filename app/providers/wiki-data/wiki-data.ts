import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import {Host} from '../host/host';

/*
  Generated class for the WikiData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WikiData {

  //json result fetched
  data: any;

  _hostURL: string;

  constructor(private http: Http, private host:Host) {
    this._hostURL = host.getHostURL();
  }



}
