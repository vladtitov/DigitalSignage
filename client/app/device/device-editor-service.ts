import {Injectable} from "@angular/core";
import {VODevice, UpdateResult, VOLayout, VOLayoutProps} from "../services/models";
import {Observable, Subject} from "rxjs/Rx";
import {Http, Response} from "@angular/http";

@Injectable()

export class DeviceEditorService {

    constructor(private http:Http) {  }

    private serviceUrl = '/api/';


    getData (id:number): Observable<VODevice>{
        return this.http.get(this.serviceUrl+'layouts/mydevice/'+id)
            .map(function (res:Response) {
                var data = res.json();
                return new VODevice(data.data);
            })
            .catch(this.handleError);
    }

    getUsedDevice(layout:VOLayoutProps): Observable<VODevice[]> {
        var layout_id = layout.id;
        return this.http.get(this.serviceUrl+'layouts/mydevice-layout/'+layout_id)
                .map(function (res:Response) {
                    var data = res.json();
                    return data.data;
                })
                .catch(this.handleError);
    }

    updateByLayoutId(layout_id:number): Observable<UpdateResult> {
        return this.http.post(this.serviceUrl+'layouts/mydevice-update/'+layout_id, layout_id)
            .map(function (res:Response) {
                var data = res.json();
                return new UpdateResult(data.data);
            })
            .catch(this.handleError);
    }

    saveData(item:VODevice): Observable<UpdateResult>{
        return this.http.post(this.serviceUrl+'layouts/mydevice-new/'+item.id, item)
            .map(function (res:Response) {
                var data = res.json();
                return new UpdateResult(data.data);
            })
            .catch(this.handleError);
    }

    deleteDevice(device): Observable<UpdateResult>{
        console.log('deleteDevice ', device);
        console.log('post ', this.serviceUrl+'layouts/mydevice');
        return this.http.delete(this.serviceUrl+'layouts/mydevice/'+ device.id)
            .map(function (res:Response) {
                var data = res.json();
                console.log('deleteDevice ', data);
                return new UpdateResult(data.data);
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