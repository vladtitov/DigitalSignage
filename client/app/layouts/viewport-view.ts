/**
 * Created by Vlad on 7/29/2016.
 */
/**
 * Created by Vlad on 7/21/2016.
 */
import {Component, Input, Output, OnInit, EventEmitter} from "@angular/core";
import {VOViewport} from "../services/models";
//import {DragPlayListService} from "../services/DragPlayListService";
/*import {ViewportService} from "../services/viewport-service";*/

import {LayoutViewportPlaylists} from "../layouts/layout-viewport-playlists";

@Component({
    selector:'viewport-view',
    template:`    
                <div class="mydiv"
                 [style.top]=item.y [style.left]=item.x 
                 [style.width]=item.width 
                 [style.height]=item.height
                 [style.border]=borderColor
                >
                    <img src="{{ item.image }}" width="{{ item.width }}" height=" {{ item.height }}">
                        
                    <div class="cover"
                        (dragenter)="onDragEnter($event)"
                        (dragleave)="onDragLeave($event)"
                        (click)="onClickViewport($event)"
                        >                
                     </div>      
                         
                </div>
            `,
    styles:[`
             .mydiv {
                 background-color: whitesmoke; 
                       
                 position: absolute;
                 }
                 .cover{
                     position: absolute;
                     top:0;
                     left: 0;
                     width: 100%;
                     height: 100%;
                     z-index: 1000;
                     background-color: rgba(255, 255, 255, 0.1);
             }
            `],
    // directives: [LayoutViewportPlaylists]
})

export class ViewPortView implements OnInit{
    @Input() item:VOViewport;
    @Output () onview = new EventEmitter();

    toggleview:boolean = true;
    borderColor:string='thin solid black';

    constructor(){

    }

    ngOnInit():void{

        console.log(this.item);
    }


    onDragEnter(evt:DragEvent):void{
        console.log("enter")

       /* setTimeout( () => {this.dragService.onDragEnd = (item) => {
            this.item.playlistid = item.id;
            this.item.image = item.image;
            console.log(item);
        }*/
          //  this.borderColor = 'thin solid red';}, 100);
        /*this.dragService.emitDragEnd.subscribe(
         (item) => {
         this.item.playlistid = item.id;
         this.item.image = item.image;
         }
         )*/


    }

   /* onDragLeave(evt:DragEvent):void{
        //this.dragService.emitDragEnd.unsubscribe();
        setTimeout( () => {
            this.dragService.onDragEnd = null;
            this.borderColor = 'thin solid white';
        }, 50);
        console.log("Leave")
    }
*/
    /*onClickViewport(evt:DragEvent):void{
        this.onview.emit(null);
        var params = {
            "viewport": this.item.id,
        };
        this.utils.setParams(params);
    }*/

}