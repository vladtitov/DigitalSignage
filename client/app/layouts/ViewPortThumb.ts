/**
 * Created by Vlad on 7/23/2016.
 */
import {Component, OnInit, Input} from "@angular/core";
import {VOViewport} from "../services/models";
@Component({
    selector:'viewport-thumb',
    template:`
            <div class="relative">           
                <div class="myview"
                 [style.top]=item.y [style.left]=x 
                 [style.width]=width 
                 [style.height]=height                
                 >
                  <span>{{label}}</span>
                 </div>
            </div>
`
    ,styles:[`
              .relative{
                position:relative;
              }
              .myview{
                  position: absolute;
                  border: solid thin red;
              }

`]
})

export class ViewPortThumb implements OnInit{

    @Input()item:VOViewport;
    scale:number=0.2;
    borderColor:string='red';
    x:number;
    y:number;
    width:number;
    height:number;
    id:number;
    label:string;

    ngOnInit(){
        this.x=this.item.x*this.scale;
        this.y=this.item.y*this.scale;
        this.width = this.item.width*this.scale;
        this.height = this.item.height*this.scale;
        this.label = this.item.label || ''+this.item.id;
        this.id=this.item.id;
       // console.log(this.item);

    }

}