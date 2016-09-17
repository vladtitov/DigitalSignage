/**
 * Created by Dmitriy Prilutsky on 15.07.2016.
 */

import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router, Route} from '@angular/router';

import {VOLayout, VOViewport, VOTemplate} from "../services/models";

import {ViewportsView} from "./viewports-view";
import {LayoutsTemplateList} from "./layouts-template-list";




@Component({
    selector: 'layouts-template',
    template: `
<div>
            <div class ="panel-heading">            
            <h3>New Layout from template</h3>
                <a *ngIf="currentItem" class="btn btn-default" [class.disabled]="!currentItem.id" (click)="onNextClick()"><span class="fa fa-arrow-right"></span> Next</a>
            </div>
            <div class="panel-body">
                <div>
                    <layouts-template-list (onselect)="onSelect($event)"></layouts-template-list>  
                </div>
                <div class="layout-view">
                    <img  src="{{currentItem.image}}" />                
                </div>
            </div>
</div>
              `,
    styles: [ ` 
             h3{
                display: inline;
             }
              .layout-view {
                   margin: 20px auto;
                   text-align: center;
                   width: 800px;
                   height: 800px;
                }
                .layout-view>img{
                    max-width: 800px;
                    max-height: 800px;
                }
                
                
              `]
    // directives: [ LayoutsTemplateList ]
})

export class LayoutsTemplate implements OnInit {
    @Output () onview = new EventEmitter();
    currentItem:VOTemplate = new VOTemplate({});

  //  @Output()currentLayout:LayoutVO = new LayoutVO({});

    paramsSub:any;

   /// viewports:VOViewport[];

    constructor (private ar:ActivatedRoute, private myrouter:Router,private sroute:ActivatedRoute, private router:Router) {

    }

    onSelect(item:VOTemplate):void{
        this.currentItem = item;
        if (this.currentItem) {

            let link = ['/layout-template', this.currentItem.id];
          this.router.navigate(link);
        }
    }
    ngOnInit() {


    }

    onNextClick():void{
        if (this.currentItem) {
            let link = ['/layout-editor/template/', this.currentItem.id];
            this.router.navigate(link);
        }
    }
    ngOnDestroy() {
        //this.paramsSub.unsubscribe();
    }

    onClickViewport():void{
        this.onview.emit(null);
    }

}
