/**
 * Created by Vlad on 7/23/2016.
 */
import {Component, Input, OnInit} from "@angular/core";
import {VOViewport, VOLayout} from "../services/models";
import {ViewPortThumb} from "./ViewPortThumb";
@Component({
    selector:'layout-thumb'
    ,template:`
            <div class="mythumb" [class.box-selected]="layout.selected">
            
                  <div class="myimage-container">
                      <img  class="myimage" src="{{layout.props.image}}"/>       
                  </div>
                  <div class="myid"><span>{{layout.props.id}}</span></div>
                  <div class="params pos-bottom">
                  <div>{{layout.props.label}}</div>
                  
                </div>
                           
            </div>
`
        ,styles:[`


 

`]

    // ,directives:[ViewPortThumb]
})







export class LayoutThumb implements OnInit{
    @Input()layout:VOLayout = new VOLayout({});



    ngOnInit(){

      // console.log(this.layout);

    }
}