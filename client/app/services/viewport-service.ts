/**
 * Created by Dmitriy Prilutsky on 20.07.2016.
 */

import { Injectable, Input } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

import { VOViewport, VOPlaylist } from "./models";



@Injectable()
export class ViewportService {

    id:string;

    private _selectedItem:VOViewport;

    private selectedItem = new Subject<VOViewport>();
    private viewports = new Subject<VOViewport[]>();

    selectedItem$:Observable<VOViewport> = this.selectedItem.asObservable();
    viewports$:Observable<VOViewport[]> = this.viewports.asObservable();


    constructor(private http:Http) {

    }



    private viewportsUrl = '/serverdata/layout2.json';

    private _viewports: VOViewport[];

    getViewports (){
        this.http.get(this.viewportsUrl+'/'+this._selectedItem.id)
            .map(this.parse)
            .catch(this.handleError)
            .subscribe((viewports) => {
                let body:VOViewport [] = JSON.parse(localStorage.getItem("myviewports"));
                if (body) viewports = body;
                this._viewports = viewports;
                this.viewports.next(viewports);
                localStorage.setItem("myviewports", JSON.stringify(viewports))
            });
    }

    loadDefault () {
        var id:number= Number(localStorage.getItem("myviewport"));
        this.setSelectedById(id);
    }

    setId (id:string) {
        this.id = id;
    }

    setSelectedById(id: number) {
        let viewport: VOViewport;
        viewport = this._viewports.find(viewport => viewport.id === id );
        this.selectedItem.next(viewport);
    }

    setSelected(viewport:VOViewport) {
        localStorage.setItem("myviewport", "" + viewport.id);
        this.selectedItem.next(viewport);
    }

    getData (id:number){
        let viewport: VOViewport;
        let body:VOViewport [] = JSON.parse(localStorage.getItem("myviewports"));
        viewport = body.find(viewport => viewport.id === id );
        this.selectedItem.next(viewport);
    }

    saveData(viewports:VOViewport[]):void{
        localStorage.setItem("myviewports", JSON.stringify(viewports));
    }

    private parse(res: Response) {
        let body:VOViewport [] = res.json().data || [];
        var out:VOViewport [] = [];
        body.forEach (function (item:VOViewport) {
            out.push(new VOViewport(item))
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