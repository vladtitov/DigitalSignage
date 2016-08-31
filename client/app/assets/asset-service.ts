/**
 * Created by Dmitriy Prilutsky on 28.07.2016.
 */

import { Injectable } from "@angular/core";
import { VOAsset, UpdateResult } from "../services/models";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import {Subject} from "rxjs/Rx";


@Injectable()
export class AssetService {

    private assets: VOAsset[];
    private assetsSubject = new Subject<VOAsset[]>();
    assets$:Observable<VOAsset[]> = this.assetsSubject.asObservable();

    private selectedAsset: VOAsset;
    private selectedAssetSubject = new Subject<VOAsset>(); // дает Observable-у событие
    selectedAsset$:Observable<VOAsset> = this.selectedAssetSubject.asObservable(); // Observable

    constructor(private http:Http) { }
    serverUrl = "api/"; //  /server/assets/manager

    selectAsset(asset:VOAsset){
        if (this.selectedAsset) this.selectedAsset.selected = false;
        this.selectedAsset = asset;
        this.selectedAsset.selected = true;
        this.selectedAssetSubject.next(asset);
        console.log('selectAsset ', asset.label);
    }

    getAssets (){
        this.http.get(this.serverUrl+'assets/select-all')
            .map((res:Response)=>{
                var out:VOAsset[] =[];
                var ar:any[] = res.json().data;
                ar.forEach(function(item){
                    out.push(new VOAsset(item))
                });
                return out;
            })
            .catch(this.handleError)
            .subscribe((assets:any[]) => {
                this.assets = assets;
                this.assetsSubject.next(this.assets);
            });
    }

    saveItem (asset:VOAsset): Observable<UpdateResult> {
        // console.log('asset ', asset);
        // console.log('selectedAsset ', this.selectedAsset);

        this.selectedAssetSubject.next(asset);
        let newasset = new VOAsset(asset);
        delete newasset.selected;
        delete newasset.usedPlayList;
        return this.http.post(this.serverUrl + "assets/byid/" + asset.id, newasset)
            .map((res:Response)=>{return res.json().data})
            .catch(this.handleError);
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    getItemById (id:number):Observable<VOAsset> {
        // return this.selectedAsset$;
        return this.http.get(this.serverUrl + "assets/byid/" + id)
            .map((res:Response)=>{return new VOAsset (res.json().data)})
            .catch(this.handleError);
    }

    getUsedPlayList(asset:VOAsset){
        var asset_id = asset.id;
        return this.http.get(this.serverUrl+'assets/used-playlist/'+asset_id)
            .map((res:Response)=> {
                var data = res.json().data;
                return new VOAsset({usedPlayList:data});
            })
            .catch(this.handleError);
    }

    deleteAssetById(id:number):Observable<UpdateResult>{
        // console.log(this.serviceUrl+'/'+id);
        return this.http.delete(this.serverUrl+'assets/byid/'+id)
            .map(function(res:Response){
                return new UpdateResult(res.json().data);
            })
            .catch(this.handleError)
    }

}