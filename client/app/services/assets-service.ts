/**
 * Created by Dmitriy Prilutsky on 05.07.2016.
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import {VOAsset} from "./models";



@Injectable()
export class AssetsService {
    selectedItem:VOAsset;
    constructor(private http:Http) {    }


    private dataUrl = 'api/assets/select-all';
    private dataUrlA = 'api/assets/';

    setSelected(item:VOAsset){
        this.selectedItem = item;
    }


    getData (): Observable<VOAsset[]> {
        return this.http.get(this.dataUrl)
            .map( (data) => this.parse (data))
            .catch(this.handleError);
    }

    addItem (name: string): Observable<VOAsset> {

        let body = JSON.stringify({ name });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.dataUrl, body, options)
            .map(this.parseOne)
            .catch(this.handleError);
    }

    private parse(res: Response) {
        let body: VOAsset [] = res.json().data;
        var out:VOAsset[]=[]
        body.forEach (function (item: any) {
            if(!item.type) item.type = 'image';
            out.push(new VOAsset(item));
        });
        return out;
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