/**
 * Created by Dmitriy Prilutsky on 15.07.2016.
 */

import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {VOLayout, VOViewport} from "../services/models";

import { AssemblerViewports } from "./assempler-viewports";



@Component({
    selector: 'layoutassembler-view',
    template: `
<div>
                <div>
                <assembler-playlists></assembler-playlists>
                
                </div>
               <div class="layout-view" *ngIf="mylayout">
                  <assembler-viewports   [viewports]="mylayout.viewports" (onview)="onClickViewport()"></assembler-viewports>
               </div>
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
    // directives: [ AssemblerViewports ]
})

export class LayoutAssemplerView implements OnInit {
    @Output () onview = new EventEmitter();

  //  @Output()currentLayout:LayoutVO = new LayoutVO({});

    paramsSub:any;

   // viewports:VOViewport[];
    mylayout:VOLayout

    constructor (private ar:ActivatedRoute, private myrouter:Router) {

    }

    ngOnInit() {

       /* this.asseblerService.currentItem$.subscribe(
            data=>this.mylayout = data
        )*/

       /* this.layoutService.selectedItem$.subscribe(
            (data:LayoutVO)=>{
                this.mylayout = data;
                console.log(data);
                this.viewports = data.viewports;
            }
        )*/

    }

    ngOnDestroy() {
        //this.paramsSub.unsubscribe();
    }

    onClickViewport():void{
        this.onview.emit(null);
    }

}

