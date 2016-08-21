/**
 * Created by Vlad on 7/18/2016.
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import {VOAsset,VOPlayLists_Assets,VOPlaylist} from "../services/models";
import {Subject} from "rxjs/Rx";





@Injectable()
export class PlayListsListService {
    private _listItems$:Subject<VOPlayLists_Assets[]>;
    private dataStore:{ listItems:VOPlayLists_Assets[]};
    private currentItem:VOPlaylist;
    private currentItemSubject:Subject<VOPlaylist>;
    public currentItem$:Observable<VOPlaylist>;
    offline:boolean = false;
    constructor(private http:Http) {
        this._listItems$ = <Subject<VOPlayLists_Assets[]>> new Subject();
        this.dataStore={ listItems:[]};
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




    private serviceUrl = 'api/playlists/byid/';


    saveData(playlist?:VOPlaylist):void{
        if (playlist) this.currentItem = playlist;
        console.log(this.currentItem)
        this.saveDataInStorage();
        if(!this.offline)this.saveDataOnServer();
    }

    private saveDataInStorage():void{
        localStorage.setItem('playlist_'+this.Id,JSON.stringify(this.currentItem));
    }

    saveDataOnServer():void{
        this.http.post(this.serviceUrl+this.Id,this.currentItem)
            .map( (res) =>{return  res.json().data})
            .catch(this.handleError).subscribe(
            (result)=>{
                if(result.insertId){
                    this.Id = result.insertId;
                }
                this.loadDataFromServer();
            }
        );
    }

    daletePlaylist(){
        this.http.get(this.serviceUrl+"delete/"+this.Id)
            .map( (body:Response) => {
                return body.json ().data;
            })
            .catch(this.handleError).subscribe(
            result=>{
                this.currentItem = new VOPlaylist({});
                this.currentItemSubject.next (this.currentItem);
            }
        );
        localStorage.removeItem('playlist_'+this.Id);
    }



   getData(playlistid?:number) {
       if(playlistid && this.currentItem) this.Id = playlistid;
       if(this.Id == -1) {
           this.currentItem = new VOPlaylist({});
           this.currentItemSubject.next (this.currentItem);
           return;
       }
       if(this.offline)this.getDataFromCache();
       else this.loadDataFromServer();
    }



    private getDataFromCache():void{
        var old:VOPlaylist =  JSON.parse(localStorage.getItem('playlist_'+this.Id));
        if(!old || !old.list) old = new VOPlaylist({});
        this.currentItem = old;
        this.dataStore.listItems=old.list;
        this._listItems$.next(this.dataStore.listItems);
    }

    private loadDataFromServer():void{
        console.log(this.serviceUrl+this.Id)

        this.http.get(this.serviceUrl+this.Id)
            .map( (body:Response) => {
                var data = body.json ().data;
                return new VOPlaylist(data);
            })
            .catch(this.handleError).subscribe(
            result=>{
                console.log(result);
                this.currentItem = result;
                this.currentItemSubject.next (this.currentItem);
            }
        );
    }


    insertAt(item:VOPlayLists_Assets, ind:number):boolean{
        this.dataStore.listItems.splice(ind, 0, item);
        this._listItems$.next(this.dataStore.listItems);
        return true;
    }

    insertItemBefore(subj:VOPlayLists_Assets, rel:VOPlayLists_Assets):boolean{
        var ind:number = this.dataStore.listItems.indexOf(rel);
        return this.insertAt(subj,ind);
    }
    insertItemAfter(subj:VOPlayLists_Assets, rel:VOPlayLists_Assets):boolean{
        var ind:number = this.dataStore.listItems.indexOf(rel);
        return this.insertAt(subj,ind);

    }
    insertItem (item:VOPlayLists_Assets, afterId?: number) {
        this.dataStore.listItems.push(item);
        this._listItems$.next(this.dataStore.listItems);
        // let body = JSON.stringify({ name });
        /*let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        var itm:PlayListItemVO = new PlayListItemVO(item);

        let body = JSON.stringify({
            "assetId": itm.assetId,
            "duration": item.duration,
            "afterId": afterId,
            "listId": this.listId
        });*/


       /* var playListInsert = this.http.post(this.playListUrl+"/insert-content", body, options)
            .map(this.parseOne)
            .catch(this.handleError);

        playListInsert.subscribe(items => {
            console.log(items.data[0])
            let item = items.data[0];
            this.dataStore.listItems.push(item);
            this._listItems$.next(this.dataStore.listItems);
        });*/

    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}