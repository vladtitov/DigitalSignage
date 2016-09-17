/**
 * Created by админ on 29.07.2016.
 */
import {Component, Input, OnInit} from "@angular/core";
import {VODevice, VOLayout} from "../services/models";
import {LayoutEditorService} from "../layout-editor/layout-editor-service";
@Component({
    selector: 'device-list-item'
    ,template:`
<div [class.selected]="mydevice.selected" class="myitem">
            <div class="deviceVO float-left item-128">
                <div class="myid"><span>{{mydevice.id}}</span></div>
                <div class="fa fa-desktop icon"></div>
                <div class="deviceText">{{mydevice.label}}</div>
                <div class="deviceText">{{mydevice.description}}</div>
            </div>
            <div class="layoutVO float-left item-128">
                <div class="pos-relative">
                    <div class="pos-absolute item-128" >
                        <img class="pos-center max-128" src="{{currentLayout.props.image}}" />
                    </div>
                </div>
                <div class="myid" *ngIf="currentLayout.props.id>0"><span>{{currentLayout.props.id}}</span></div>
            </div>
</div>

`
    ,styles:[`
        .myitem{
            width: 260px;
            height: 128px;
        }
        .deviceVO{
            text-align: center;
            padding: 22px 0;
            position: relative;
        }
        .layoutVO{
            position: relative;
        }
        .image{
        
        }
        .deviceText{
            width: 128px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .icon{
            font-size: 50px;
        }
        .selected{
            border:thin solid red;
        }
`]
    // ,providers:[LayoutEditorService]

})

export class DeviceListItem implements OnInit{
    @Input() mydevice:VODevice =new VODevice({});

    currentLayout:VOLayout = new VOLayout({});

    constructor(private layoutService: LayoutEditorService){}

    ngOnInit(){
        var id:number = +this.mydevice.layout_id;
        if(isNaN(id) || id === 0) return;

        this.layoutService.getLayoutById2(id)
            .subscribe((data:VOLayout)=>{
                this.currentLayout = data;
        });
    }

}