/**
 * Created by админ on 24.08.2016.
 */
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import {VOUserData, VOUserResult, UpdateResult} from "../../app/services/models";

@Injectable()
export class LoginService {
    constructor(private http:Http) { }


    private dataUrl = 'account/';
    private loginUrl ='login';
    private createUrl ='new-user-admin';
    private resetPassUrl = 'reset-password';
    private changePassUrl = 'change-password';

    loginServer(data:VOUserData):Observable<VOUserResult>{

        // let body = JSON.stringify(data);
        // console.log('body ', body);
        // let headers = new Headers({ 'Content-Type': 'application/json' }); //'application/x-www-form-urlencoded'
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.dataUrl+this.loginUrl, data)
            .map((res)=> {return new VOUserResult(res.json().data)})
            .catch(this.handleError);
    }

    createAccount(data:VOUserData):Observable<VOUserResult>{

        // let body = JSON.stringify(data);
        // // console.log('body ', body);
        // let headers = new Headers({ 'Content-Type': 'application/json' }); //'application/x-www-form-urlencoded'
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.dataUrl+this.createUrl, data)
            .map((res)=> {
                console.log('create account', res.json());
                return new VOUserResult(res.json().data)})
            .catch(this.handleError);
    }

    resetPassword(data:any){

        // let body = JSON.stringify(data);
        // // console.log('body ', body);
        // let headers = new Headers({ 'Content-Type': 'application/json' }); //'application/x-www-form-urlencoded'
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.dataUrl+this.resetPassUrl, data)
            .map(this.parseOne)
            .catch(this.handleError);
    }

    changePassword(data:any):Observable<UpdateResult>{

        // let body = JSON.stringify(data);
        // // console.log('body ', body);
        // let headers = new Headers({ 'Content-Type': 'application/json' }); //'application/x-www-form-urlencoded'
        // let options = new RequestOptions({ headers: headers });

        return this.http.post(this.dataUrl+this.changePassUrl, data)
            .map((res)=> {return new UpdateResult(res.json().data)})
            .catch(this.handleError);
    }

    private parseOne(res: Response) {
        let body = res.json();
        if(!body.data){
            // console.error('data is missing');
        }
        return body.data || { };
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        // console.error(errMsg);
        return Observable.throw(errMsg);
    }

}