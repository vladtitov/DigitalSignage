/**
 * Created by Vlad on 7/18/2016.
 */
import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {VOAsset, VOPlayLists_Assets, VOPlaylist, VOPlayListProps} from "../services/models";
import {PlayListService} from "./playlist-service";
import {PlayListItem} from "./playlist-editable-item";
import {PlayListSpacer} from "./PlayListSpacer";
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {TimeCellVO, TimeCellCompnent} from "./TimeCell";
import {URLSearchParams} from "@angular/http"
import {Subscribable} from "rxjs/Observable";
import {Subscription} from "rxjs/Rx";
import {UpdateResult} from "../../../server/db/dbDriver";



@Component({
    selector:'playlist-editable',
    template:`
<div>       
            
            <a class="btn btn-default" (click)="createPlayList()"><span class="fa fa-plus"> </span> Create New</a>
            <a class="btn btn-default" [class.disabled]="toolsDisadled" (click)="deletePlayList()"><span class="fa fa-remove"></span> Delete</a>             
            <a class="btn btn-default" (click)="saveOnServer()"><span class="fa fa-life-saver"></span> Save on Server</a>
        
        
            <label class="PNameLabel" for="PName">Playlist Name</label>
           <input id="PName" type="text" [(ngModel)]="playlistProps.label" name="plalistname"/>
            
            <span> Duration:</span><span>{{playlistProps.duration}}</span>
            
            <div class="pl-container">
                <div class="pl-content" >
                    <div class="timeline" flex layout="row" >
                        <div *ngFor="let mytime of timeCells">
                            <time-cell [timecell]="mytime" ></time-cell>
                        </div>                 
                    </div>
                    <div flex layout="row"  class = "cart" (dragend)="onItemDragend(item)">
                        <div class="item"  *ngFor="let item of playlistItems; let i = index" layout="row"  (dragend)="onDragItemEnd($event, item)">
                            <div>                                                        
                                <playlist-editable-item
                                    [item]="item" [position]="i" #myitem                               
                                    (dragmove)="onDragMove$event(item)"
                                    (dragend)="onDragEnd($event,item)" 
                                    (onremovemeDrag)="onremovemeDrag($event)"
                                    (dragstart)="onDragItemStart($event,item,myitem)" 
                                    (dragover)="onItemDragOver($event,item)"                                                       
                                ></playlist-editable-item>
                            </div>
                        </div>
                        <div id="emtyline">
                                                               
                        </div>
                    </div>
                </div>                 
            </div>
</div>
`,
    styles:[`
            .pl-container{
                width: 100%;
                min-height: 160px;
                overflow-x: scroll;
                display: block;
                background-color: #e7f1ff;
                margin-top: 10px;
            }
            .pl-content{
                background-color: #e7f1ff;
                width: 100%;
                display: block;
            }
            .title{
            
            }
            .PNameLabel{
                margin-left: 50px;
            }
            time-cell{
                width: 128px;
                height: 20px;
                background-color: #0000AA;
                color: white;                
            }       
         
                
`],
    directives:[PlayListItem,PlayListSpacer,TimeCellCompnent],
    providers:[PlayListService]

})



export class PlaylistEditable implements OnInit{
    @Input() playlistid:number;
    @Input() set dragEnter(item:VOAsset){
       // console.log(item);
       //  if(item)this.selectedItem = new VOPlayLists_Assets({item,position:-1})
        if(item)this.selectedItem = new VOPlayLists_Assets(item)
    }

    @Output() isMove:boolean = false;

    @Input() set addToCart(item:VOAsset){

        this.addAssetToCollection(item);
    };

    inputItem:VOAsset;
    playlist:VOPlaylist;
    playlistItems: VOPlayLists_Assets[];
    timeCells:TimeCellVO[];
    playlistProps:VOPlayListProps = new VOPlayListProps({});
    errorMessage:string;

    toolsDisadled:boolean;

   // private dragItem:VOPlayLists_Assets;
    private selectedItem:VOPlayLists_Assets

    private sub:Subscription;

    constructor(private playlistservice:PlayListService,private route:ActivatedRoute,private router:Router){

    }

    @Output() selectInnerEmitter:EventEmitter<{}> = new EventEmitter();
    onremovemeDrag(item){
        this.selectInnerEmitter.next(item);
    }



    calculateDuration():void{
        if(!this.playlist) return;
        var total:number=0;
        this.playlistItems.forEach(function(item:VOPlayLists_Assets){
            total+=item.lasting;
        })
        this.playlistProps.duration = total;
        console.log('total', total);
    }

    createCover(){
        if(!this.playlist) return;
        var cover:VOPlayLists_Assets;
        var image:string;
        this.playlistItems.forEach(function(item:VOPlayLists_Assets){
            if(item.isCover) cover = item;
        });
        if(!cover){
            cover = this.playlistItems[0];
        }
        switch(cover.type){
            case 'image':
                image = cover.path;
                break;
            case 'video':
                image = cover.thumb.split(',')[0];
                break;
            default:
                image = cover.path;
                break;
        }
        this.playlistProps.image = image;
    }

    saveOnServer():void{
        //console.log(this.playlistProps)
        this.calculateDuration();
        this.createCover();
        this.playlistservice.saveDataOnServer()
            .subscribe(
                (result:UpdateResult)=> {
                    if (result.insertId) {
                        console.log(result);
                        this.router.navigate(['./playlist-editor',result.insertId])

                    }
                })
                   // this.getDataFromServer();

    }
    onItemDragend(evt:DragEvent):void{

    }
    ngOnInit():void{
            var ar:TimeCellVO[] = [];
        for(var i=0;i<20;i++){
            ar.push(new TimeCellVO(i))
        }
        this.timeCells = ar;
        this.playlistservice.currentItem$.subscribe((item)=> {
            this.playlist = item
            this.playlistItems = this.playlist.list;
            this.playlistProps = item.props;

        }, (error)=> {alert (error.toString())})


        this.sub = this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            if(id == -1) this.toolsDisadled = true;
            console.log(params)
            if(!isNaN(id)) this.playlistservice.getData(id);
        });
    }

    savePlayList(){
        this.playlistservice.saveData();
    }

    createPlayList(){
        if(this.route.params['id'] == '-1') window.location.reload();
        else this.router.navigate(['playlist-editor',-1]);
    }

    deletePlayList(){
        if(this.playlist && confirm('You want to delete Playlist '+this.playlist.props.label+'?')){
            this.playlistservice.daletePlaylist(this.playlist.props.id)
                .subscribe(
                    (result:UpdateResult)=>{
                        if(result.changes)this. createPlayList();
                    });
        }

    }

    onPlayListDargEnter(evt:DragEvent):void{
      //  console.log(evt);
    }
    private inserAt(item:VOPlayLists_Assets, ind:number):void{
        var oldIndex = this.playlistItems.indexOf(item);
        if(oldIndex === ind) return;
        if(oldIndex !==-1) this.playlistItems.splice(oldIndex,1);
        this.playlistItems.splice(ind, 0, item);
        var i=0;
        this.playlistItems.forEach(function (item:VOPlayLists_Assets) {
            item.position=i++;
        })

    }

    hilitedItem:VOPlayLists_Assets;
    resetHilited():void{
        if(this.hilitedItem)this.hilitedItem.hilited = false;
        this.hilitedItem = null;
    }

    resetSelected():void{
        if(this.selectedItem) this.selectedItem.selected = false;
        this.selectedItem = null;
    }
    private hilite(item:VOPlayLists_Assets):void{
        if(this.hilitedItem && this.hilitedItem.position === item.position) return;
       this.resetHilited();
        this.hilitedItem = item;
        this.hilitedItem.hilited = true;
    }


    insertBeforeHilited():void{
        this.inserAt(this.selectedItem,this.playlistItems.indexOf(this.hilitedItem))
    }
    onItemDragOver(evt:DragEvent,item:VOPlayLists_Assets):void{

        if(!this.selectedItem) return;
     /*   if(this.dragEnter){
            var vo:VOPlayLists_Assets = new VOPlayLists_Assets({asset:this.dragEnter,id:this.playlistItems.length});
            this.inserAt(vo,item.position);
            this.dragEnter = null;
            this.selectedItem = null;

            return
        }*/

        if(item.position == this.selectedItem.position){
            this.resetHilited();
           return;
        }

         if(evt.offsetX<20){

             this.hilite(item);
               // this.inserAt(this.selectedItem._item,item.position);

      }else if(evt.offsetX>100){

      }
    }

    addAssetToCollection(item:VOAsset):void{

            // var vo:VOPlayLists_Assets = new VOPlayLists_Assets({item,position:this.playlistItems.length});
            var vo:VOPlayLists_Assets = new VOPlayLists_Assets(item);
            if(!vo.lasting) vo.lasting = 10;
            this.selectedItem = vo;
            if(!this.playlistItems) this.playlistItems = [];
            this.playlistItems.push(vo);
            // console.log('VO ', vo);
            // console.log('this.selectedItem ', this.selectedItem);
            // console.log('this.playlistItems ', this.playlistItems);
            this.calculateDuration();
    }

    onDragEnd(evt:DragEvent,item:VOPlayLists_Assets):void{
        var d:number = evt.screenY - this.startY;
        if(d>200)this.removeItemFromCart(item);
        this.insertBeforeHilited();
        this.resetHilited();
        this.resetSelected();
    }

    private removeItemFromCart(item:VOPlayLists_Assets):void{
        var ind = this.playlistItems.indexOf(item);
        if(ind!==-1) {
            this.playlistItems.splice(ind,1);
            this.calculateDuration();
        }

    }
    private startY:number;

    onDragItemStart(evt:DragEvent, item:VOPlayLists_Assets, view:PlayListItem):void{
        this.dragEnter = null;
        this.resetSelected()

        this.selectedItem = item;
        this.selectedItem.selected = true;

        this.startY = evt.screenY;
    }


    onDragItemEnd(item:VOPlayLists_Assets):void{

    }
    onDragOut(evt:DragEvent):void{
        //var spacer:PlayListSpacer = <any>evt.target;
       // var spacer = <any>evt.target;
       // var itemId = spacer.getAttribute("item-id");
       // if(itemId)
           // this.service.deleteItem(+itemId);
       // console.log('onDragOut ',evt,spacer.getAttribute("item-id"));
    }
    insertToCardAt (item: VOAsset, i:number) {
     /*   console.log(item, i, this.isMove);
        if (item && i !== -1) {
            if (this.isMove) {
                console.log(22)

                let index:number = this.playlistItems.indexOf(item);
                if (index > -1) {
                    this.playlistItems.splice(index,1);
                }
                this.playlistItems.splice(i + 1, 0, item);
            }
            else {
                if (i === (this.playlistItems.length - 1) ){
                    this.playlistItems.push(item);
                    this.service.addItem(1, item.id, i, 10).subscribe(
                        (res)=>{
                            console.log(res);
                        },
                        error =>  this.errorMessage = <any>error);
                }
                else this.playlistItems.splice(i + 1, 0, item);

            }
            if (!this.isMove) this.dragItem = null;

        }*/
    }
}