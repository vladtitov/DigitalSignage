/**
 * Created by Vlad on 7/16/2016.
 */
import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {UpdateResult, VODevice, VOPlaylist, VOStats, VOLayout} from "../../app/services/models";


@Injectable()
export class DeviceService{
    screenid:number;

    constructor(private http:Http){
        }

        private service:string='api/player';


        getDevice(id:number):Observable<VODevice>{
            this.screenid = id;
            return this.http.get(this.service+'/mydevice/'+id)
                .map((resp:Response) => {return new VODevice(resp.json().data)})
                .catch(this.handleError);
        }

        getPlaylist(id:string):Observable<VOPlaylist>{
           return  this.http.get(this.service+'/playlist/'+id)
                .map((resp:Response) => {return new VOPlaylist(resp.json().data) })
                .catch(this.handleError);
        }

       getLayout(id:number):Observable<VOLayout>{
            return this.http.get(this.service+'/layout/'+id)
                .map((resp:Response) => {return new VOLayout(resp.json().data)})
                .catch(this.handleError);
        }

        seveStatistics(stats:VOStats[],id:number):Observable<UpdateResult>{
            return this.http.post(this.service+'/statistics/'+id,stats)
                .map((resp:Response) =>{
                   return new UpdateResult(resp.json().data)
                })
                .catch(this.handleError);
        }

        private handleError (error: any) {
            let errMsg = (error.message) ? error.message :
                error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error(errMsg);
            return Observable.throw(errMsg);
        }
}

export class PlaylistItem{

}
