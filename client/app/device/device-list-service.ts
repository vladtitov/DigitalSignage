import {Injectable} from "@angular/core";
import {VODevice, UpdateResult} from "../services/models";
import {Observable, Subject} from "rxjs/Rx";
import {Http, Response} from "@angular/http";
@Injectable()

export class DeviceListService {

    devices:VODevice[];
    private devicesSubject = new Subject<VODevice[]>();

    devices$:Observable<VODevice[]> = this.devicesSubject.asObservable();

    constructor(private http:Http) {    }

    private serviceUrl = '/api/';

    getDevices(): void {
        this.http.get(this.serviceUrl+'layouts/mydevice-all')
            .map((res:Response)=>{
                var out:VODevice[] =[];
                var ar:any[] = res.json().data;
                ar.forEach(function(item){
                    out.push(new VODevice(item))
                })
                return out;
            })
            .catch(this.handleError)
            .subscribe((devices:any[]) => {
                this.devices = devices;
                this.devicesSubject.next(this.devices);
                // localStorage.setItem("mylayouts", JSON.stringify(layouts))
            });
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        //console.error(errMsg);
        return Observable.throw(errMsg);
    }
}