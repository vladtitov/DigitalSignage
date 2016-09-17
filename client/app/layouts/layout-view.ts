/**
 * Created by Dmitriy Prilutsky on 15.07.2016.
 */

import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {VOLayout, VOViewport} from "../services/models";

import {ViewportsView} from "./viewports-view";



@Component({
    selector: 'layout-view',
    template: `
               <div class="layout-view">              
                   <viewports-view [viewports]="viewports" (onview)="onClickViewport()"></viewports-view>
               </div>
              `,
    styles: [ ` 
               .layout-view {
                   margin-top: 20px; 
                   width: 800px;
                   height: 800px;
                }
              `]
    ,
    // directives: [ ViewportsView ]
})

export class LayoutView implements OnInit {


    paramsSub:any;
    viewports:VOViewport[];
    constructor (private ar:ActivatedRoute, private myrouter:Router) {

    }

    ngOnInit() {

      /*  this.layoutService.selectedItem$.subscribe(
            (data:LayoutVO)=>{
              //  this.layout = data;
                console.log(data);
                if (data) this.viewports = data.viewports;
            }
        )*/

    }

    onNextClick():void{

    }
    ngOnDestroy() {
        //this.paramsSub.unsubscribe();
    }

    onClickViewport():void{
      //  this.onview.emit(null);
    }

}
