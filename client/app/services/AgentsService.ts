/**
 * Created by Vlad on 7/6/2016.
 */
import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import { Observable }     from 'rxjs/Observable';


@Injectable()
export class HeroService {
    private url:string = 'http://front-desk.ca/tableblue/agents/getagents.php';
    constructor(private http:Http){

    }
    private parse(res:Response):any{
        
        return res.json().list;
    }
    private onError (error: any):any {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
    getHeroes() {

        return this.http.get(this.url).map(this.parse);//.catch(this.onError);
    }
}