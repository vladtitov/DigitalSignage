/**
 * Created by Vlad on 7/24/2016.
 */
import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {VOLayout, VODevice, UpdateResult} from "../services/models";
import {DeviceEditorService} from "./device-editor-service";
// import {LayoutThumb} from "../layouts/layout-thumb";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {DevicesList} from "./devices-list";
import {LayoutsListService} from "../layouts/layouts-list-service";
import {TooltipOptions} from "../shared/ng2-md-tooltip/ng2-md-tooltip";

@Component({
    selector:'device-editor'
    ,template:`
<div class="device-editor">
        
            <h4>Device Details</h4>
            <a class="previewUrl" *ngIf="deviceUrl && currentItem.layout_id" target="_blank" href="{{deviceUrl}}"><span class="fa fa-eye"></span> Preview</a>
            <form role="form" *ngIf="currentItem">
            <!--<span>{{currentItem.id}}</span>-->
            <div class="form-group">
                <label >Divice Url: </label> <small>{{deviceUrl}}</small>
            </div>
            <div class="form-group">
                <label>Name</label>
                <small *ngIf="currentItem.id>0" style="margin-left: 15px">ID: {{currentItem.id}}</small>
                <input class="form-control" #inpLabel value="{{currentItem.label}}"/>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="form-control" #inpDescr value="{{currentItem.description}}"></textarea>
            </div>
            <div class="form-group">
                <label for="selectLayout">Layout</label>
                <small *ngIf="currentLayout.props.id>0" style="margin-left: 15px">ID: {{currentLayout.props.id}}</small>
             <select class="form-control"    id="selectLayout"  [(ngModel)]="currentLayout" name="mylayout"> <option *ngFor="let label1 of layouts" [ngValue]="label1">{{label1.props.label}}</option> </select>
            </div>
            <div class="card-256x320">
                <div class="mythumb">
                    <div class="myimage-container">
                        <div class="myid" *ngIf="currentLayout.props.id>0"><span>{{currentLayout.props.id}}</span></div>
                        <img class="myimage " src="{{currentLayout.props.image}}" />
                    </div>
                    <div class="props"></div>
                </div>
            </div>
            <div>
                <a class="btn btn-primary saveBatton" [class.disabled]="currentItem.id==0 || isInProgress" (click)="onSaveClick(inpLabel.value, inpDescr.value)"
                [ng2-md-tooltip]="tooltipOptions" placement="bottom">
            <span class="fa fa-save"></span> Save</a>
            </div>
            </form>
</div>
`
    ,styles:[`
        h4{
            display: inline-block;
        }
        .previewUrl{
            float: right;
            margin-top: 8px;
        }
        .form{
            padding-top: 7px;
        }
        .form-group{
            margin-bottom: 10px;
        }
        .params{
            padding: 3px 5px 0 9px;
            height: 60px;
        }
        .saveBatton{
            float:right;
            margin-top: 15px;
        }
        .device-editor{
            width: 450px;
            
        }

`]
    // ,providers:[DeviceEditorService, LayoutsListService]
    // ,directives:[LayoutThumb]
})

export class DeviceEditor implements OnInit{
@Input() devicelist1:DevicesList;
@Output() onDataChange:EventEmitter<{}> = new EventEmitter();

    currentItem:VODevice;
    currentLayout: VOLayout = new VOLayout({});
    layouts:VOLayout[];
    labels: string[];

    color:string;
    tooltipOptions:TooltipOptions;

    isInProgress:boolean = false;

    deviceUrl:string;
    deviceBaseUrl:string = window.location.protocol+'//'+window.location.host+'/preview/device/';

    private sub: Subscription;

    constructor(
        private deviceEditorService:DeviceEditorService
        , private route: ActivatedRoute
        , private router: Router
        , private layoutsListService: LayoutsListService
    ){

    }

    getDataById(id:number){
        this.deviceEditorService.getData(id);
    }

    ngOnInit():void{
        this.layoutsListService.getLayouts2()
            .subscribe((layouts:VOLayout[]) => {
                this.layouts = layouts;
                this.showLayout();
                // this.labels = layouts.map(function (item:VOLayout) {
                //     return item.props.label;
                // });
                // this.labels.unshift('no layout');
            });

        this.sub = this.route.params.subscribe(params => {
            let id:number = +params['id']; // (+) converts string 'id' to a number
            console.log('id:', id);
            if(isNaN(id)) return;
            if(id === 0){
                this.currentItem = new VODevice({id: 0});
                this.currentLayout = new VOLayout({});
                this.deviceUrl = null;
                this.showLayout();
                // console.log('currentLayout.props.image ', this.currentLayout.props);
            } else if(id === -1){
                this.currentItem = new VODevice({id: -1, label: "New Device", description: "Some Description"});
                this.currentLayout = new VOLayout({});
                this.deviceUrl = null;
                this.showLayout();
                // console.log('currentLayout.props.image ', this.currentLayout.props);
            } else {
                this.deviceEditorService.getData(+id)
                    .subscribe((data:VODevice) => {
                        this.currentItem = data;
                        this.deviceUrl = this.deviceBaseUrl+this.currentItem.id;
                        // console.log('this.currentItem ', this.currentItem);
                        this.showLayout();
                    });
            }
        });
    }

    onSaveClick(label, description){
        this.tooltipOptions = null;

        this.isInProgress = true;
        if(this.currentLayout) this.currentItem.layout_id = this.currentLayout.props.id;
        if(this.currentItem.layout_id == -1) this.currentItem.layout_id = 0;
        this.currentItem.label = label;
        this.currentItem.description = description;
        this.deviceEditorService.saveData(this.currentItem)
            .subscribe(
                (data:UpdateResult) => {
                    console. log(data);
                    console.log(this.currentItem);
                    if(data.insertId){
                        if( this.currentItem.id ===-1 ) this.currentItem.id =data.insertId;
                    }
                    this.tooltipOptions = {message:'Device saved on server',tooltip_class:'btn-success'};
                    this.isInProgress = false;

                    var id = data.insertId ? data.insertId : this.currentItem.id;
                    this.getDataById(id);
                    this.onDataChange.emit(id);
                    this.router.navigate(['./devices-manager',id]);
                    // if(this.devicelist1) this.devicelist1.refreshData();
                },
                error => {
                    this.tooltipOptions = {message:'Server error',tooltip_class:'btn-danger'};
                    this.isInProgress = false;
                });
    }



    showLayout(){
        if(!this.currentItem) return;
        var id:number = this.currentItem.layout_id;
        console.log('id showLayout ', id);
        if(isNaN(id) || !this.layouts) return;
        var layout:VOLayout;
        this.layouts.forEach(function (item:VOLayout) {
            // console.log('item ', item);
            if(item.props.id == id) layout = item;
        });
        console.log('layout ', layout);
        if(layout){
            this.currentLayout = layout;
        } else {
            this.currentLayout = new VOLayout({});
        }
    }


}