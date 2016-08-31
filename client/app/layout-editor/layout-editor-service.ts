/**
 * Created by Dmitriy Prilutsky on 20.07.2016.
 */

import { Injectable, Input } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

import {VOViewport, VOPlaylist, VOLayout, UpdateResult} from "../services/models";



@Injectable()
export class LayoutEditorService {


   // private dataStore:{ layout:LayoutVO};
    private currentItem:VOLayout;
    private currentSubject = new Subject<VOLayout>();
    currentItem$:Observable<VOLayout> = this.currentSubject.asObservable();
    offlibe:boolean;

    constructor(private http:Http) {
}

    private serviceUrl = '/api/layouts/byid';


    deleteLayoutById(id:number):Observable<UpdateResult>{
        // console.log(this.serviceUrl+'/'+id);
        return this.http.delete(this.serviceUrl+'/'+id)
            .map(function(res:Response){
                return new UpdateResult(res.json().data);
            })
            .catch(this.handleError)
    }


    setLayout(item:VOLayout):void{
        this.currentItem = item;
        this.currentSubject.next(this.currentItem);
    }


    getLayoutById(id?:number):void{
        if(!id) id = this.currentItem?this.currentItem.props.id:-1;
        this.http.get(this.serviceUrl+'/'+id)
            .map(function(res:Response){
                return new VOLayout(res.json().data);
            })
            .catch(this.handleError).
            subscribe((data)=>{
                this.currentItem = data;
                this.currentSubject.next(this.currentItem);
        })
    }

    getLayoutById2(id:number): Observable<VOLayout>{
        return this.http.get(this.serviceUrl+'/'+id)
            .map(function(res:Response){
                return new VOLayout(res.json().data);
            })
            .catch(this.handleError);
    }

    loadDefault () {
        var id:string = localStorage.getItem("myviewport");
       // this.setSelectedById(id);
    }

    saveOnServer(layout?:VOLayout):Observable<UpdateResult>{
        if(layout)this.currentItem = layout;

        var id = this.currentItem?this.currentItem.props.id:-1;
        layout = new VOLayout(this.currentItem);

        return this.http.post(this.serviceUrl+'/'+id,layout)
            .map(function(res:Response){ return res.json().data; })
            .catch(this.handleError);
    }

    setId (id:number) {
       this.currentItem.props.id=id;
    }



    saveData(viewports:VOViewport[]):void{
        localStorage.setItem("myviewports", JSON.stringify(viewports));
    }

    private parse(res: Response) {
        let body:any = res.json().data || {};
        return new VOPlaylist(body)
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}

