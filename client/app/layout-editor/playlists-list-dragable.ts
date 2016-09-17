/**
 * Created by Dmitriy Prilutsky on 20.07.2016.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { RouterConfig } from '@angular/router';

import { VOPlaylist } from "../services/models";

import { PlaylistsService } from "../services/playlists-service";
import {DragPlayListService} from "./drag-playlist-service";



@Component({
    selector: 'playlists-list-dragable',
    template: `
<div>
                <h4>Playlists</h4>
                 <div class="slider-horizont">
                     <!--<div class="mycontent" >-->
                        <div layout="row" class="playlists">
                            <div  class="thumb-128-2" *ngFor="let playlist of playlists" 
                            (dragstart)="onDragStart(playlist)"
                            (dragend)="onDragEnd(playlist)">
                                <div class="image-container-128-2">
                                    <div class="myid"><span>{{playlist.props.id}}</span></div>
                                    <img src="{{ playlist.props.image}}">
                                    <div class="thumb-label">
                                        {{ playlist.props.label}}
                                    </div>
                                </div>
                            </div>
                        </div>
                      <!--</div>-->
                 </div>
</div>
              `,
    styles: [ `

            .slider-horizont{
                width: 100%;
                overflow-x: scroll;
                display: block;
                background-color: whitesmoke;
                padding: 7px;
            }
            /*.mycontent{*/
            /*background-color: #e7f1ff;*/
            /*width: 100%;*/
            /*display: block;*/
            /*}*/
               /*.playlists {*/
                 /*height: 150px;*/
                 /*!*border: 1px solid #ddd;*!*/
                 /*padding: 7px;*/
               /*} */
            `]
    // ,providers:[PlaylistsService]
})

export class AssemblerPlayLists implements OnInit {
    playlist: VOPlaylist;
    playlists: VOPlaylist [];
    dragItem: VOPlaylist;
    dragMove: VOPlaylist;
    errorMessage: string;
    isMove:boolean;

    constructor (private ar:ActivatedRoute, private myrouter:Router, private playlistService: PlaylistsService, private dragService:DragPlayListService) {
        this.playlists =[];
    }

    ngOnInit () {
       this.playlistService.playlists$.subscribe(
            data => this.playlists = data,
            error =>  this.errorMessage = <any>error
        );
        this.playlistService.getPlaylists();
    }

    onDragEnd(item:VOPlaylist):void{
       // console.log(this.dragService.onDragEnd);
        if(this.dragService.onDragEnd) this.dragService.onDragEnd(item);
        //this.dragService.emitDragEnd.emit(item);
    }

    onDragStart (item: VOPlaylist) {
        this.isMove = false;
        this.dragItem = item;
        this.dragService.item = item;
    }

    onPlaylistClick (playlist: VOPlaylist) {
        this.playlistService.setSelected(playlist);
   /*     this.layoutService.setSelectedById(1, this.layouts);
        console.log(this.layout)*/

        /*let link = ['/layout-assembler/', layout.id];
        this.myrouter.navigate(link);*/

           }
}

