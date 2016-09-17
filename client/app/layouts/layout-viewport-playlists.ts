/**
 * Created by Dmitriy Prilutsky on 22.07.2016.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PlaylistsService } from "../services/playlists-service";
import { VOViewport, VOPlaylist } from "../services/models";


@Component({
    selector: 'layout-viewport-playlists',
    template: `
                <div class="layout-viewport-playlists">
                    <h5>TEST </h5>
                     <div class="playlist" *ngFor="let playlist of playlists">
                          <div class="playlistitem" *ngFor="let item of playlist.list">
                                <img src="{{ item.asset.path }}" width="100px">
                          </div>
                    </div>
               </div>
      
              `,
    styles: [ `
              .playlistitem {
                float:left;
              }  
              `]
})

export class LayoutViewportPlaylists implements OnInit {

    errorMessage: string;
    viewport:VOViewport;
    playlist:VOPlaylist;
    playlists:VOPlaylist[];

    constructor (private playlistService: PlaylistsService) {

    }

    ngOnInit() {


       /* this.viewportService.selectedItem$.subscribe(
            data => this.viewport = data,
            error =>  this.errorMessage = <any>error
            );
        let params = this.utils.getUrlParams();
        if(params && params.viewport) {
            this.viewportService.getData(params.viewport);
            this.playlistService.playlists$.subscribe(
                (data) => {
                    this.playlists = data;
                 },
                error =>  this.errorMessage = <any>error

            );*/
            /*this.playlistService.selectedItem$.subscribe(
                (data) => {
                    this.playlist = data
                },
                error =>  this.errorMessage = <any>error
            );*/
            //this.playlistService.savePlaylist(this.viewport.playlistid);
           // this.playlistService.getPlaylists();

       // }
    }
    ngOnDestroy() {
        //this.paramsSub.unsubscribe();
    }

}
