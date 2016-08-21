/**
 * Created by Dmitriy Prilutsky on 15.07.2016.
 */

import { Injectable, Input } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

import {VOLayout, VOTemplate} from "./models";



@Injectable()
export class LayoutsTemlatesService {

    id:string;
    selectedId:number;
    selectedItem:VOLayout;
    private selectedSabject = new Subject<VOLayout>();
    private layouts: VOLayout[];
    private layoutsSubject= new Subject<VOLayout[]>();


    selectedItem$:Observable<VOLayout> = this.selectedSabject.asObservable();
    layouts$:Observable<VOLayout[]> = this.layoutsSubject.asObservable();


    constructor(private http:Http) {

    }
    private layoutsUrl = '/api/layouts/templates';


    getTemplateById(id:number):Observable<VOTemplate>{
        return this.http.get(this.layoutsUrl)
            .map((res:Response)=>{
                var data:any[] = res.json().data;
                var out:VOTemplate;
                data.forEach(function(item){
                    if(item.id==id) out= new VOTemplate(item);
                })
                return out;
            })
            .catch(this.handleError);
    }

    getLayouts ():Observable<VOTemplate[]>{
        return this.http.get(this.layoutsUrl)
            .map((res:Response)=>{
                var data:any[] = res.json().data;
                var out:VOTemplate[]=[];
                data.forEach(function(item){
                    out.push(new VOTemplate(item))
                })
                return out;
            })
            .catch(this.handleError);

    }



    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        //console.error(errMsg);
        return Observable.throw(errMsg);
    }


}