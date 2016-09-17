/**
 * Created by Vlad on 7/24/2016.
 */
import {Component, ViewChild, Input, OnInit} from "@angular/core";
import { ActivatedRoute, Router} from "@angular/router";
import {DevicesList} from "./devices-list";
import {DeviceEditor} from "./device-editor";
import {VODevice, UpdateResult} from "../services/models";
import {DeviceEditorService} from "./device-editor-service";
import {Subscription} from "rxjs/Rx";
import {TooltipOptions} from "../shared/ng2-md-tooltip/ng2-md-tooltip";

@Component({
    selector:'devices-manager'
    ,template:`
<div class="content-850">
            <div class ="panel-heading">
                <h3>Devices Manager</h3>
                <nav>
                     <a [routerLink]="['/devices-manager', -1]" class="btn btn-default" ><span class="fa fa-plus"></span> Create New Device</a>
                     <!--<a class="btn btn-default" (click)="onEditClick()"> <span class="fa fa-edit"></span> Edit</a>-->
                     <a class="btn btn-default" [ng2-md-tooltip]="deleteTooltip" [class.disabled]="toolsDisadled" (click)="onRemoveClick()"><span class="fa fa-minus"></span> Delete Device</a>
                </nav>
            </div>           
            <div class="panel-body">
            
                <div class="item">
                    <devices-list (selecteditem)= "onCurrentItem($event)" #devicelist2></devices-list>
                </div>
                <div class="item">
                    <device-editor (onDataChange)="onDataChange2($event)" [devicelist1]="devicelist2"></device-editor>
                </div>
            </div>

</div>
`
    ,styles:[`
        .item{
            float: left;
            margin-left: 20px;
            }
    `]
    // ,directives:[ DevicesList, DeviceEditor]
    // ,providers:[DeviceEditorService]
})
export class DevicesManager implements OnInit{

    @ViewChild(DevicesList)
        private devicesList: DevicesList;

    toolsDisadled:boolean;
    currentItem:VODevice;

    private sub: Subscription;
    private deleteTooltip:TooltipOptions;

    constructor(
        private router: Router
        , private route: ActivatedRoute
        , private deviceEditorService: DeviceEditorService
    ){}

    ngOnInit():void{
        this.sub = this.route.params.subscribe(params => {
            let id:number = +params['id']; // (+) converts string 'id' to a number
            // console.log('id ', id);
            if(isNaN(id)){
                this.router.navigate(['./devices-manager',0]);
                return;
            }
            this.toolsDisadled = (id === -1 || id === 0) ? true : false;
            if(this.toolsDisadled) this.devicesList.reset();
        });
    }

    onCurrentItem(evt:VODevice){
        console.log('evt selecteditem', evt);
        this.currentItem = evt;
        if(this.currentItem) this.router.navigate(['./devices-manager', this.currentItem.id])
    }

    onRemoveClick(){
        this.deleteTooltip = null;

        if(!this.currentItem) return;
        var item:VODevice = this.currentItem;
      //  console.log('onRemoveClick ', this.currentItem);
        if(confirm('You want to delete device '+item.label+'?')){
            this.toolsDisadled = true;
            this.deviceEditorService.deleteDevice(item)
                .subscribe((data:UpdateResult) => {

                    if(data.changes){
                        this.deleteTooltip = {placement: 'right', message:'Device '+item.id+' '+item.label+' deleted from database!',tooltip_class:'btn-success'};
                        this.router.navigate(['./devices-manager',0]);
                    }else  this.deleteTooltip = {tooltip_class:'btn-danger',message:'Error to delete device'};
                   console.log('onRemoveResponse', data);
                    this.devicesList.refreshData();
                },
                error => {
                    this.deleteTooltip = {placement: 'right', message:'Server error',tooltip_class:'btn-danger'};
                    this.toolsDisadled = false;
                });
        }


    }

    onDataChange2(deviceId:number){
        this.devicesList.refreshData();
    }

    // onAddClick(){
    //     [routerLink]="['../../devices-manager/-1']"(click)="onAddClick()
    //     if(this.currentItem) this.router.navigate(['./devices-manager', this.currentItem.id])
    // }

    // onEditClick(){
    //     if(this.currentItem) this.router.navigate(['./devices-manager', this.currentItem.id])
    // }

}
