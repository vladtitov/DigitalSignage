/**
 * Created by админ on 24.08.2016.
 */
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import {VOUserData} from "../../app/services/models";

@Injectable()
export class LoginService {
    constructor(private http:Http) { }


    private dataUrl = 'account/';
    private loginUrl ='login';
    private createUrl ='new-user-player';

    loginServer(data:any){

        let body = JSON.stringify(data);
        console.log('body ', body);
        let headers = new Headers({ 'Content-Type': 'application/json' }); //'application/x-www-form-urlencoded'
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.dataUrl+this.loginUrl, body, options)
            .map(this.parseOne)
            .catch(this.handleError);
    }

    createAccount(data:any){

        let body = JSON.stringify(data);
        console.log('body ', body);
        let headers = new Headers({ 'Content-Type': 'application/json' }); //'application/x-www-form-urlencoded'
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.dataUrl+this.createUrl, body, options)
            .map(this.parseOne)
            .catch(this.handleError);
    }

    private parseOne(res: Response) {
        let body = res.json();
        if(!body.data){
            console.error('data is missing');
        }
        return body.data || { };
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}