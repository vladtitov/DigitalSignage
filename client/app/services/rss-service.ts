/**
 * Created by Dmitriy Prilutsky on 05.07.2016.
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import {VOAsset} from "./models";

export class RSSItem {
    id:number;
    title:string;
    content: string;
    link: string;
    data: string;
    time:string;
    static count:number = 0;
    constructor(obj:any){
        for(var str in obj)this[str] = obj[str];
        if(this.id && this.id>RSSItem.count) RSSItem.count = this.id;
        if(!this.id) this.id = RSSItem.count++;
    }
}  

@Injectable()
export class RSSService {
    constructor(private http:Http) {
    }




    private dataUrl = 'api/rss/';
    private dataUrlA = 'api/assets/';

    getData (url:string): Observable<RSSItem[]> {
        return this.http.get(this.dataUrl+encodeURIComponent(url))
            .map( (data) => this.parse (data))
            .catch(this.handleError);
    }

    saveOnServer(str:string): Observable<{data:Object}> {
        var item:VOAsset = new VOAsset({id:-1,path:str,mime:"rss",thumb:"/clientAssets/uploads/thumbnails/RSS_128x128.png"});

        let body = JSON.stringify(item);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.dataUrlA+"save-asset", body, options)
            .map(this.parseOne)
            .catch(this.handleError);
    }

    private parse(res: Response) {
        let body: RSSItem [] = res.json().data;
        var out:RSSItem[] = [];
        body.forEach(function(item){ out.push(new RSSItem(item))});
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