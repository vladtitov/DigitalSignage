/**
 * Created by Dmitriy Prilutsky on 15.07.2016.
 */

import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {VOLayout, VOTemplate} from "../services/models";
import { LayoutsTemlatesService } from "../services/layouts-templates-service";
import {LayoutThumb} from "./layout-thumb";



@Component({
    selector: 'layouts-template-list',
    template: `
<div>
                <h4>Templates library</h4>
                 <div class="slider-horizont">
                     <div class="mycontent" >
                            <div  flex layout="row"  class="layouts">
                                <div *ngFor="let layout of layouts" class="layout box-shadow thumb-150" [class.box-selected]="layout.selected"  (click)="onLayoutClick(layout)">                               
                                    <img class="image" src="{{layout.image}}"  />
                                </div>
                            </div>
                    </div>
                </div>
 </div>              
              `,
    styles: [ `

            .slider-horizont{
                width: 100%;
                overflow-x: scroll;
                display: block;
                background-color: #e7f1ff;
            }
            .mycontent{
                background-color: #e7f1ff;
                width: 100%;
                display: block;
            }
           
           .layout {
                margin: 10px; 
                
           } 
           .thumb-150{
                position: relative;
                width: 156px;
                height: 156px;
            }
           .image{
               max-width: 150px;
               max-height: 150px;
               position:absolute;
               top:0;
               bottom: 0;
               left: 0;
               right:0;
               margin:auto;
           }
           
     `]
    // ,
    // directives: [ LayoutThumb ]
    // ,providers:[LayoutsTemlatesService]
})

export class LayoutsTemplateList implements OnInit {
    selectedItem:VOTemplate;
    layouts: VOTemplate [];
    errorMessage: string;
    @Output () onselect = new EventEmitter();

    constructor (private ar:ActivatedRoute, private myrouter:Router, private templatesService: LayoutsTemlatesService) {
        this.layouts =[];
    }

    ngOnInit () {
        /*this. templatesService.layouts$.subscribe(
            data => {

                this.layouts = data
            },
            error =>  this.errorMessage = <any>error
        );*/
        this. templatesService.getLayouts()
            .subscribe((templates:VOTemplate[]) => {
                this.layouts = templates;

            });
    }

    onLayoutClick (layout:VOTemplate) {
        if(this.selectedItem) this.selectedItem.selected=false
        this.selectedItem = layout;
        this.selectedItem.selected = true;
     this.onselect.emit(this.selectedItem);
    }
}