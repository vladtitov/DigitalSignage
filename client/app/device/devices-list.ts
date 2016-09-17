/**
 * Created by Vlad on 7/24/2016.
 */
import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {VODevice} from "../services/models";
import {DeviceListService} from "./device-list-service";
// import {DeviceThumb} from "../layouts/device-thumb";
// import {DeviceListItem} from "./device-list-item";
import {Router} from "@angular/router";

@Component({
    selector:'devices-list'
    ,template:`
<div>
             <h4>Devices</h4>
             <div class="slider-vertical">
                 <div class="mycontent" >
                    <div class="device" *ngFor="let mydevice2 of devicesList" (click)="onDeviceClick(mydevice2)">                                                      
                        <device-list-item [mydevice]="mydevice2"></device-list-item>
                    </div>
                </div>
              </div>


</div>
`
    ,styles:[`

    .slider-vertical{
        overflow-y: scroll;
        height: 600px;
        width: 286px;
    }
    .device{
        height: 128px;
        background-color: whitesmoke;
        margin: 10px;
        margin-left: 0px;
        box-shadow: grey 3px 5px 4px;
    }

`]
    // ,providers:[DeviceListService]
    // ,directives:[DeviceThumb,DeviceListItem]
})

export class DevicesList implements OnInit{
@Output() selecteditem:EventEmitter<{}> = new EventEmitter();
    selectedItem:VODevice = new VODevice({});
    devicesList:VODevice[];

    constructor(
        private deviceListService:DeviceListService
        , private router: Router){

    }

    ngOnInit():void{

        this.deviceListService.devices$.subscribe((data:VODevice[])=>{
            this.devicesList = data;
            // console.log('devices ', this.devicesList);
        },(err)=>{

        });

        this.refreshData();
        // this.deviceListService.getDevices();
    }

    onDeviceClick(mydevice2:VODevice){
        this.diselectCurentItem();
        if(this.selectedItem) this.selectedItem.selected = false;
            this.selectedItem = mydevice2;
        this.selectedItem.selected = true;
        this.selecteditem.emit(this.selectedItem);
    }

    reset(){
        this.diselectCurentItem();
    }

    diselectCurentItem(){
        if(this.selectedItem) this.selectedItem.selected = false;
    }

    refreshData(){
        this.deviceListService.getDevices();
    }

}
