/**
 * Created by Vlad on 7/16/2016.
 */
import {Component, OnInit} from "@angular/core";
import {VODevice, VOLayout, VOViewport} from "../app/services/models";
import {DeviceService} from "./services/device-service";
import {Subscription} from "rxjs/Rx";
import {ActivatedRoute} from "@angular/router";
import {PlayerViewPort} from "./player-view-port";

@Component({
    selector:'device-view'
    ,template:`
<div>
        <div class="pos-relative">
            <div class="pos-absolute">
                <div *ngFor="let vp of viewports" class="pos-absolute">
                    <player-view-port [myviewport]="vp"  class="pos-absolute"></player-view-port>
                </div>
             </div>
        </div>

</div>`
    ,directives:[PlayerViewPort]
    ,providers:[DeviceService]
})

export class DeviceController implements OnInit{

    private sub:Subscription
    constructor(
        private deviceService:DeviceService,
        private route:ActivatedRoute
    ){}

    device:VODevice;
    layout:VOLayout;
    viewports:VOViewport[];


    ngOnInit():void{
        this.sub = this.route.params.subscribe(params => {
            console.log(params);
            this.deviceService.getDevice(+params['deviceid']).subscribe((resp:VODevice)=>{
                this.device  = resp;
                this.layout = new VOLayout(resp.layout);
                this.viewports = this.layout.viewports;

            })
        });
       //
    }



}