/**
 * Created by Vlad on 7/24/2016.
 */
import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {VOLayout, VODevice, UpdateResult} from "../services/models";
import {DeviceEditorService} from "./device-editor-service";
import {LayoutThumb} from "../layouts/layout-thumb";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {DevicesList} from "./devices-list";
import {LayoutsListService} from "../layouts/layouts-list-service";

@Component({
    selector:'device-editor'
    ,template:`
<div class="device-editor">
        
            <h4>Device Details</h4>
            <form role="form" *ngIf="currentItem">
            <!--<span>{{currentItem.id}}</span>-->
            <div class="form-group">
                <label>Divice Url: <a href="{{deviceUrl}}">{{deviceUrl}}</a></label>
            </div>
            <div class="form-group">
                <label>Name</label>
                <input class="form-control" #inpLabel value="{{currentItem.label}}"/>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="form-control" #inpDescr value="{{currentItem.description}}"></textarea>
            </div>
            <div class="form-group">
                <label for="selectLayout">Layout</label>
             <select class="form-control"    id="selectLayout"  [(ngModel)]="currentLayout" name="mylayout"> <option *ngFor="let label1 of layouts" [ngValue]="label1">{{label1.props.label}}</option> </select>
            </div>
            <div class="card-256x320">
                <div class="mythumb">
                    <div class="myimage-container">
                        <img class="myimage " src="{{currentLayout.props.image}}" />
                    </div>
                    <div class="props"></div>
                </div>
            </div>
            <div>
                <a class="btn btn-primary saveBatton" [class.disabled]="currentItem.id==0" (click)="onSaveClick(inpLabel.value, inpDescr.value)"><span class="fa fa-save"></span> Save</a>
            </div>
            </form>
</div>
`
    ,styles:[`
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
    ,providers:[DeviceEditorService, LayoutsListService]
    ,directives:[LayoutThumb]
})

export class DeviceEditor implements OnInit{
@Input() devicelist1:DevicesList;
@Output() onDataChange:EventEmitter<{}> = new EventEmitter();

    currentItem:VODevice;
    currentLayout: VOLayout = new VOLayout({});
    layouts:VOLayout[];
    labels: string[];

    deviceUrl:string;
    deviceBaseUrl:string = window.location.protocol+'//'+window.location.host+'/screen/mydevice/';

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
        if(this.currentLayout) this.currentItem.layout_id = this.currentLayout.props.id;
        if(this.currentItem.layout_id == -1) this.currentItem.layout_id = 0;
        this.currentItem.label = label;
        this.currentItem.description = description;
        this.deviceEditorService.saveData(this.currentItem)
            .subscribe((data:UpdateResult) => {
                var id = data.insertId ? data.insertId : this.currentItem.id;
                this.getDataById(id);
                this.onDataChange.emit(id);
                // if(this.devicelist1) this.devicelist1.refreshData();
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