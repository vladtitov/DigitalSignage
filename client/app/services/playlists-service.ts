/**
 * Created by Dmitriy Prilutsky on 20.07.2016.
 */

import { Injectable, Input } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

import { VOPlaylist } from "./models";
import {UpdateResult} from "../../../server/db/dbDriver";



@Injectable()
export class PlaylistsService {

    id:string;

    private selectedItem = new Subject<VOPlaylist>();
    private playlists = new Subject<VOPlaylist[]>();

    selectedItem$:Observable<VOPlaylist> = this.selectedItem.asObservable();
    playlists$:Observable<VOPlaylist[]> = this.playlists.asObservable();


    constructor(private http:Http) {

    }



    private serviceUrl = '/api/playlists';

    private _playlists: VOPlaylist[];

    getPlaylists (){
        this.http.get(this.serviceUrl+"/all")
            .map(this.parseAll)
            .catch(this.handleError)
            .subscribe((playlists) => {
                this._playlists = playlists;
                this.playlists.next(playlists);
                this.loadDefault();
                localStorage.setItem("myplaylists", JSON.stringify(playlists))
            });
    }

    getUsedLayouts(id: number){
        return this.http.get(this.serviceUrl+"/used/"+id)
            .map( (body:Response) => {
                var data = body.json ().data;
                return new VOPlaylist({usedLayout:data});
            })
            .catch(this.handleError);
    }

    loadDefault () {
        var id:number = +localStorage.getItem("myplaylist");
        this.setSelectedById(id);
    }

    setId (id:string) {
        this.id = id;
    }

    setSelectedById(id: number | string) {
        var playlist: VOPlaylist;
        playlist = this._playlists.find(playlist => playlist.props.id === +id );
        this.selectedItem.next(playlist);
    }

    setSelected(playlist:VOPlaylist) {
        localStorage.setItem("myplaylist", "" + playlist.props.id);
        this.selectedItem.next(playlist);
    }

    getSelected():number {
        return localStorage.getItem("myplaylist");
    }

    savePlaylist(id:number) {
        localStorage.setItem("myplaylist", "" + id);
    }

    private parseAll(res: Response) {
        let body:VOPlaylist [] = res.json().data || [];
        // console.log('body ', body);
        var playlistOBJ = {};
        var addItem = function (item:any) {
            if(!playlistOBJ[item.playlist_id]) playlistOBJ[item.playlist_id] = new VOPlaylist({props:item})
        }
        var out:VOPlaylist [] = [];
        body.forEach (function (item:VOPlaylist) {
            out.push(new VOPlaylist(item))
        })
        return out;
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}