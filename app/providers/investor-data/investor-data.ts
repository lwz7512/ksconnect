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

    

}
