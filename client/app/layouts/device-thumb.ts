/**
 * Created by Vlad on 7/23/2016.
 */
import {Component, Input, OnInit} from "@angular/core";
import {VOViewport, VOLayout} from "../services/models";
import {ViewPortThumb} from "./ViewPortThumb";
@Component({
    selector:'device-thumb'
    ,template:`
            <div class="relative">
                        <div *ngFor="let myport of layout.viewports">                         
                        <viewport-thumb [item]="myport"></viewport-thumb>
                       </div>
            
            </div>
`
    ,styles:[`

.relative{
position: relative;
}

`]

    // ,directives:[ViewPortThumb]
})







export class DeviceThumb implements OnInit{
    @Input()layout:VOLayout;


    ngOnInit(){
       // console.log(this.layout);

    }
}