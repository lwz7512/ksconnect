import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import {Host} from '../host/host';


@Injectable()
export class InvestorData {

    data: any;
    _hostURL: string;

    constructor(private http: Http, private host:Host) {
        this._hostURL = host.getHostURL();
    }

    loadWiki(){
        return new Promise(resolve => {
            this.http.get(this._hostURL+'/wiki?type=3').subscribe(res => {
                this.data = res.json();
                resolve(this.data);
            });
        });
    }

}
