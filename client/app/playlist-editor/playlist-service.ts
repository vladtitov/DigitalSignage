/**
 * Created by Vlad on 7/18/2016.
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import {VOAsset, VOPlayLists_Assets, VOPlaylist, UpdateResult} from "../services/models";
import {Subject} from "rxjs/Rx";





@Injectable()
export class PlayListService {
    private currentItem:VOPlaylist;
    private currentItemSubject:Subject<VOPlaylist>;
    public currentItem$:Observable<VOPlaylist>;
    offline:boolean = false;

    constructor(private http:Http) {
       // this.dataStore={ listItems:[]};
        this.currentItem = new VOPlaylist({});
        this.currentItemSubject = <Subject<VOPlaylist>> new Subject();
        this.currentItem$ = this.currentItemSubject.asObservable();
    }

    get Id():number{
       return  this.currentItem.props.id
    }

    set Id(id:number){
        this.currentItem.props.id=id
    }

    private serviceUrl = 'api/';


    saveData(playlist?:VOPlaylist):void{
        if (playlist) this.currentItem = playlist;
        console.log(this.currentItem)
        //this.saveDataInStorage();
        if(!this.offline)this.saveDataOnServer();
    }

    private saveDataInStorage():void{
        localStorage.setItem('playlist_'+this.Id,JSON.stringify(this.currentItem));
    }


    saveDataOnServer():Observable<UpdateResult>{
        // console.log(this.currentItem);

        return this.http.post(this.serviceUrl+'playlists/byid/'+this.Id,this.currentItem)
            .map( (res) =>{return  new UpdateResult(res.json().data)})
            .catch(this.handleError);
    }

    daletePlaylist(id:number):Observable<UpdateResult>{
        return this.http.delete(this.serviceUrl+'playlists/byid/'+id)
            .map( (res) =>{    return  new UpdateResult(res.json().data)})
            .catch(this.handleError);
    }


    getData(playlistid?:number) {
       if(playlistid == -1) {
           this.currentItem = new VOPlaylist({});
           this.Id=-1;
           this.currentItemSubject.next (this.currentItem);
           return;
       }
       if(playlistid && this.currentItem) this.Id = playlistid;

       if(this.offline)this.getDataFromCache();
       else this.getDataFromServer();
    }



    private getDataFromCache():void{
        var old:VOPlaylist =  JSON.parse(localStorage.getItem('playlist_'+this.Id));
        if(!old || !old.list) old = new VOPlaylist({});
        this.currentItem = old;
       // this.dataStore.listItems=old.list;
       // this._listItems$.next(this.dataStore.listItems);
    }

    getDataFromServer(id?:number):void{

        this.http.get(this.serviceUrl+'playlists/byid/'+this.Id)
            .map( (body:Response) => {
                var data = body.json ().data;
                return new VOPlaylist(data);
            })
            .catch(this.handleError).subscribe(
            result=>{
                // console.log(result);
                this.currentItem = result;
                this.currentItemSubject.next (this.currentItem);
            }
        );
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}