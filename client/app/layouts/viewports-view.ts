/**
 * Created by Dmitriy Prilutsky on 19.07.2016.
 */

import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { VOViewport } from "../services/models";
import {ViewPortView} from "./viewport-view";



@Component({
    selector: 'viewports-view',
    template: `
               
               <div class="viewports-view">
                    <div class="mycontent" #myview *ngFor="let item of viewports">
                    <viewport-view [item]="item" [viewports]="viewports" (onview)="onClickViewport()"></viewport-view>
                      
                    </div>
               </div>
              `,
    styles: [`  
                .mycontent {
                    position: relative;
                }
                
                viewport-view {
                    position: absolute;
                }
                
                p {
                    text-align: center;
                }
            `]
    ,
    // directives: [ ViewPortView ]
})

export class ViewportsView implements OnInit {
    @Output () onview = new EventEmitter();
    @Input() viewports:VOViewport [];

    errorMessage: string;
    viewport:VOViewport;


    constructor (private ar:ActivatedRoute, private myrouter:Router) {

    }

    ngOnInit() {
       /* this.viewportService.viewports$.subscribe(
            data => this.viewports = data,
            error =>  this.errorMessage = <any>error
        );
        this.viewportService.getViewports();*/

    }


    ngOnDestroy() {
        //this.paramsSub.unsubscribe();
    }

    onClickViewport():void{
      this.onview.emit(null);
    }

}
