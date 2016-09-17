/**
 * Created by Vlad on 7/18/2016.
 */
import {Component, OnInit} from '@angular/core';
import { ActivatedRoute} from '@angular/router';

//import {PlayListService} from "./playlist.service";
import {PlaylistEditable} from "./playlist-editable";

import {AssetsService} from "../services/assets-service";
import {VOAsset, VOPlaylist} from "../services/models";
import {Observable, Subscription} from "rxjs/Rx";
import {AssetItem} from "./asset-item";
// // import {ContentFilterPipe} from "../assets/content-filter.pipe";
// import {ContentSearchPipe} from "../assets/content-search.pipe";
// import {AssetCard} from "../assets/asset-card";


@Component({
    selector: 'playlist-editor',
    template: `
<div>
            <!--<div class ="panel panel-default">-->
                <div class ="panel-heading">
                    <h3>Playlist</h3>
                    <div 
                        (dragenter)="onPlayListDargEnter($event)"
                        (dragleave)="onPlayListDargLeave($event)"
                    >
                        <playlist-editable
                            [playlistid] = "playlistid" 
                            [dragEnter]="dragEnter"
                            (selectInnerEmitter)="onDragStartInner($event)" 
                            [addToCart]="addToCart"
                            (addToCartEnd)="addToCartEnd()"
                        ></playlist-editable>
                    </div>
                </div>
                <div class="panel-body">
                    <h4>Assets</h4>
                    <div class="tools control-group pull-right form-inline">
                        <label for="types"><span class="fa fa-file-code-o"></span></label>
                        <select class="form-control" id="types" #dropdowntype (change)="onChange(dropdowntype.value)">
                            <option *ngFor="let i of types">{{i}}</option>
                        </select>
                        <div class="form-group has-feedback has-feedback-left">
                            <input type="text" class="form-control" #inputsearch (input)="onSearch(inputsearch.value)">
                            <i class="form-control-feedback fa fa-search"></i>
                        </div>
                    </div>
                    
                             
                    <div class="container-scroll">
                        <div class="myscroll">
                            <div class="myscroll-content"> 
                                <div class="card" *ngFor="let item of assetslist | contentfilter: typevalue | contentsearch: searchvalue">
                                    <asset-card
                                        [item]="item"                                             
                                        (dragend)="onDragEnd(item)"
                                        (dragstart)="onDragStart(item)" 
                                        (dblclick)="onItemDobleClick(item)" 
                                        (click)="onClickItem(item)"
                                        [size]="128"
                                    >
                                    </asset-card>
                                </div>                          
                            </div>
                        </div>
                    </div>
                                      
                    <div class="full-image" *ngIf="fullItem"> 
                        <img src=" {{ fullItem.img }} " width="200" (click)="hideFullImage()">
                    </div>
                </div>
            <!--</div>-->
</div>
                `,
    styles: [`
                h4{
                    display: inline;
                }
              
                .myscroll {
                    height: 400px;
                    overflow-y: scroll;
                    width: 100%;
                }
                
                .myscroll-content{
                    width: 100%;
                }
                
                .card {
                    float: left;
                }
                
                .card p {
                    text-align: center;
                }

`],
    // directives: [PlaylistEditable,AssetCard]
    // ,providers: [AssetsService]
    // ,pipes: [ContentFilterPipe, ContentSearchPipe]
})


export class PlayListEditor implements OnInit{
    errorMessage: string;
    assetslist:VOAsset[];
    dragItem: VOAsset;
    fullItem: VOAsset;
    addToCart:VOAsset;
    dragEnter:VOAsset;
    playlist:VOPlaylist;
    playlistid:number;
    private sub: Subscription;


    types:string[] = ['all', 'video', 'image'];
    typevalue:string = 'all';
    searchvalue:string = "";


    enterY:number;
    constructor ( private  assetsSevice:AssetsService, private route: ActivatedRoute ) {
       // this.playlistItems =[new VOAsset({})];
    }

    onChange (value:string) {
        this.typevalue = value;
    }
    onSearch (value:string) {
        this.searchvalue = value;
    }

    onPlayListDargLeave(evt:DragEvent):void{
        // console.log('onPlayListDrag   Leave');
        this.dragEnter = null;
        this.addToCartEnd();
        // console.log(this.enterY,evt.offsetY)
    }

    onPlayListDargEnter(evt:DragEvent):void{


    // console.log('onPlayListDargEnter');
       if(this.dragItem){
           this.enterY = evt.offsetY;
           this.addToCart = this.dragItem;
           this.dragEnter = this.dragItem;
           this.dragItem = null;
       }
    }

    onPlayListDargEnterBody(evt){
        //console.log(this.obj)

    }

    onDragStartInner(evt){
       // this.obj = evt;
    }

    ngOnInit () {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
          //  this.playlistservice.getData(id);
        });
        this.getAssets();
    }

    getAssets() {

        this.assetsSevice.getData()
            .subscribe(
                data => this.assetslist = data,
                error =>  this.errorMessage = <any>error);
    }

    onClickItem (item: VOAsset) {
        this.fullItem = item;
    }

    hideFullImage () {
        this.fullItem = null;
    }
    onDragStart (item: VOAsset) {
        // console.log(item);
        this.dragItem = item;
    }
    onDragEnd(item:VOAsset){

    }

    onItemDobleClick(item:VOAsset):void{

        this.addToCart = item;
        setTimeout(()=>this.addToCart = null, 500);
    }

    onDragOut (evt) {
       // if (!this.isMove) this.offCart(this.dragItem);
    }

    addToCartEnd(){
        // console.log('addToCartEnd');
        this.addToCart = null
    }



   /* toCart (item) {
        if (item) {
            this.playlistItems.push(item);
            let spacer = new VOAsset ({});
            /!*            this.playlistItems.push(spacer);*!/
        }
    }

    offCart (item) {
        if (item) {
            let index:number = this.playlistItems.indexOf(item);
            console.log("offcart" + index);
            if (index > -1) {
                this.playlistItems.splice(index,1);
            }
        }
    }*/

  //  isMove:boolean;

  /*  onCartDragItemStart (item: Asset) {
        this.isMove = true;
        this.dragMove = item;
        this.dragItem = item;
    }

    onCartDragItemEnd (evt, item: Asset) {
        if (this.isMove && evt.y > 300) this.offCart (item);
        this.isMove = false;
        this.dragMove = null;
        this.dragItem = null;
    }*/
}