/**
 * Created by Vlad on 7/21/2016.
 */
import {Component, Input, Output, OnInit, EventEmitter} from "@angular/core";
import {VOViewport, VOPlaylist} from "../services/models";
import {DragPlayListService} from "./drag-playlist-service";
/*import {ViewportService} from "../services/viewport-service";*/
import {LayoutViewportPlaylists} from "../layouts/layout-viewport-playlists";

@Component({
    selector:'layout-editor-viewport',
    template:`    
    
                <div class="mydiv"
                    [style.top]=item.y
                    [style.left]=item.x 
                    [style.width]=item.width 
                    [style.height]=item.height
                    [style.border]=borderColor
                >
                    
                            <img class="myimage" src="{{ item.image || 'images/transparent.png' }}" 
                                [style.max-width]=item.width 
                                [style.max-height]=item.height
                            > <!--width="{{ item.width }}" height=" {{ item.height }}"-->
                        
                    
                    
                        
                    <div class="cover"
                        (dragenter)="onDragEnter($event)"
                        (dragleave)="onDragLeave($event)"
                        (click)="onViewportClick($event)"
                        >                
                    </div>      
                         
                </div>
            `,
    styles:[`
             .mydiv {
                 background-color: whitesmoke; 
                       
                 position: absolute;
                 }
                /*.card-256x320{*/
                    /*width: 270px;*/
                    /*height: 320px;*/
                    /*background-color: #fcfcfc;*/
                    /*margin: 10px;*/
                    /*float: left;;*/
                /*}*/
                
                .mydiv .mythumb{
                    position: relative;
                    /*width: 270px;*/
                    /*height: 320px;*/
                    box-shadow: grey 5px 5px 10px;
                
                }
                
                .mydiv .mythumb .props{
                    position: absolute;
                    bottom: 0;
                    padding: 3px 5px 0 9px;
                    height: 60px;
                }
                
                
                .mydiv .myimage-container{
                    /*width:260px;*/
                    /*height:260px;*/
                    background-color: #EFF5FB; /*#e7f1ff;*/
                
                    margin: 4px;
                    position: absolute;
                }
                
                .mydiv .myimage{

                    border: 1px solid #c3c3c3;
                    position:absolute;
                    top:0;
                    bottom: 0;
                    left: 0;
                    right:0;
                    margin:auto;
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
    directives: [],
    providers:[ ]
})

export class LayoutEditorViewport implements OnInit{
    @Input() item:VOViewport;
    @Output () onportclick = new EventEmitter();


    toggleview:boolean = true;
    borderColor:string='thin solid black';

    constructor(private dragService:DragPlayListService){


    }

    ngOnInit():void{

       // console.log(this.item);
    }



    onDragEnter(evt:DragEvent):void{
        console.log("enter")

        setTimeout( () => {this.dragService.onDragEnd = (item:VOPlaylist) => {

            this.item.playlist_id = item.props.id;
            this.item.image = item.props.image;
           // console.log(this.item.playlistid)
        }
        this.borderColor = 'thin solid red';}, 100);
       /*this.dragService.emitDragEnd.subscribe(
            (item) => {
                this.item.playlistid = item.id;
                this.item.image = item.image;
            }
        )*/


    }

    onDragLeave(evt:DragEvent):void{
        //this.dragService.emitDragEnd.unsubscribe();
        setTimeout( () => {
            this.dragService.onDragEnd = null;
            this.borderColor = 'thin solid white';
        }, 50);
        console.log("Leave")
    }

    onViewportClick(evt:DragEvent):void{
        this.onportclick.emit(null);
    }

}