/**
 * Created by Vlad on 7/24/2016.
 */
import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";

import {VOLayout,UpdateResult} from "../services/models";
import {LayoutThumb} from "../layouts/layout-thumb";
import {LayoutsListService} from "./layouts-list-service";


@Component({
    selector:'layouts-list-cards'
    ,template:`
<div>

             <h4>Layouts</h4>
                 <div class="slider-vertical">
                     <div class="mycontent" >
                            <div class="layouts">
                                <div #mylayout class="card-256x320" *ngFor="let layout of layouts" (click)="onLayoutClick(layout)">                               
                                    <layout-thumb [layout]="layout" ></layout-thumb>                                                      
                                </div>
                            </div>
                    </div>
                  </div>

</div>
`
    ,styles:[`

    .slider-vertical{
        overflow-y: scroll;
        height: 600px;
        width: 100%;
    }


`]

    // ,directives:[LayoutThumb]
    // ,providers:[LayoutsListService]
})

export class LayoutsListCards implements OnInit{

    @Output() onselect:EventEmitter<{}> = new EventEmitter();
    @Input() set changesResult(evt:UpdateResult){
                    this.listService.getLayouts();
                }
    layouts:VOLayout[];

    constructor(private listService:LayoutsListService){

    }

    reload():void{

    }
    ngOnInit():void{
        this.listService.layouts$.subscribe((data)=>{
           // console.log(data);
            this.layouts = data;
        },(err)=>{

        })
        this.listService.getLayouts()
    }
    private selectedItem:VOLayout;
    onLayoutClick(layout:VOLayout):void{
        if(this.selectedItem)this.selectedItem.selected = false;
        this.selectedItem = layout;
        this.selectedItem.selected = true;
        this.onselect.emit(this.selectedItem);
    }

}
