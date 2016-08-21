/**
 * Created by Dmitriy Prilutsky on 15.07.2016.
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { VOLayout } from "../services/models";
import {Subscriber} from "rxjs/Rx";



@Injectable()
export class LayoutsListService {

    selectedItem:VOLayout;
    private selectedSabject = new Subject<VOLayout>();
    private layoutsSubject = new Subject<VOLayout[]>();

    private layouts: VOLayout[];
    selectedItem$:Observable<VOLayout> = this.selectedSabject.asObservable();
    layouts$:Observable<VOLayout[]> = this.layoutsSubject.asObservable();


    constructor(private http:Http) {  }
    private serviceUrl = '/api/layouts/assembled-all';

    getLayouts (){
        this.http.get(this.serviceUrl)
            .map((res:Response)=>{
                var out:VOLayout[] =[];
                var ar:any[] = res.json().data;
                ar.forEach(function(item){
                    out.push(new VOLayout(item))
                })
                return out;
            })
            .catch(this.handleError)
            .subscribe((layouts:any[]) => {
                this.layouts = layouts;
                this.layoutsSubject.next(this.layouts);
               // localStorage.setItem("mylayouts", JSON.stringify(layouts))
            });
    }

    getLayouts2 (): Observable<VOLayout[]>{
        return this.http.get(this.serviceUrl)
            .map((res:Response)=>{
                var out:VOLayout[] =[]
                var ar:any[] = res.json().data;
                ar.forEach(function(item){
                    out.push(new VOLayout(item))
                })
                return out;
            })
            .catch(this.handleError)
    }

    loadDefault () {
        var id:number = +localStorage.getItem("mylayout");
        this.setSelectedById(id);
    }


    setSelectedById(id: number | string) {
        this.selectedItem = this.layouts.find(layout => layout.id ===+id );
        this.selectedSabject.next(this.selectedItem);
    }

    setSelected(layout:VOLayout) {
       // localStorage.setItem("mylayout", "" + layout.id);
        this.selectedItem = layout;
        this.selectedSabject.next(layout);
    }


    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        //console.error(errMsg);
        return Observable.throw(errMsg);
    }


}