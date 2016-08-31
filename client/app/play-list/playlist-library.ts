/**
 * Created by Vlad on 7/24/2016.
 */
import { Component, OnInit } from "@angular/core";
import { ROUTER_DIRECTIVES, RouterConfig, Router} from '@angular/router';
import { PlaylistsService } from "../services/playlists-service";
import { VOPlaylist } from "../services/models";
import { PlayListSimple } from "./playlist-simple";
import {PlayListService} from "../playlist-editor/playlist-service";
import {UpdateResult} from "../../../server/db/dbDriver";
//import {PlayListEditor} from "../playlist-editor/play-list-editor";


@Component({
    selector:'playlist-library',
    template:`
<div class="content-850">
            <div class ="panel-heading">
                <h3>Playlists Manager</h3>
                <nav>                     
                     <a class="btn btn-default" (click)="goAddPlaylist()"><span class="fa fa-plus"></span> Create New Playlist</a>
                     <a class="btn btn-default" [class.disabled]="toolsDisadled" (click)="goEditPlaylist()"><span class="fa fa-edit"></span> Edit Playlist</a>
                     <a class="btn btn-default" [class.disabled]="toolsDisadled" (click)="DeletePlaylist()"><span class="fa fa-remove"></span> Delete Playlist</a>
                </nav>
                 <router-outlet></router-outlet>
            </div>
            <div class="panel-body">
                <h4>Playlists</h4>
                <div class="container-scroll">
                    <div class="scroll-content"> 
                        <div class="item" *ngFor="let item of playlists; let i = index" layout="row" >
                           <playlist-simple [playlist]="item" #myItem (click)="onPlaylistClick(item, myItem)"></playlist-simple>
                        </div>
                    </div>
                </div>
            </div>
</div>            
             `,
    styles: [`
              .container-scroll {
                width: 870px;
                height: 425px;
                overflow-y: scroll;
                overflow-x: hidden;
              }
              
              .scroll-content {
                width: 770px;
              }
               
               .item {
                margin-bottom: 20px;
               }
              
            `],
    directives: [ROUTER_DIRECTIVES, PlayListSimple],
    providers: [PlaylistsService,PlayListService]
})

export class PlayListLibrary implements OnInit {
    playlists: VOPlaylist [];
    errorMessage: string;
    selectedview: PlayListSimple;
    selecteditem: VOPlaylist;
    playlistid:number;

    layoutsLabels:string;
    usedInLayout:boolean;

    toolsDisadled:boolean;

    constructor ( private playlistsService:PlaylistsService, private playlistService:PlayListService,  private router: Router ) {

    }

    ngOnInit() {
        this.playlistsService.playlists$.subscribe(
            data => this.playlists = data,
            error =>  this.errorMessage = <any>error
        );
        this.playlistsService.getPlaylists();
        this.toolsDisadled = true;
    }

    onPlaylistClick (item:VOPlaylist, myItem:PlayListSimple) {
        if (this.selectedview) this.selectedview.selected = false;
        this.selecteditem = item;
        this.playlistid = this.selecteditem.props.id;
        this.selectedview = myItem;
        this.selectedview.selected = true;
        this.toolsDisadled = false;
        this.playlistsService.getUsedLayouts(item.props.id)
            .subscribe((res:VOPlaylist) => {
                if(res.usedLayout && res.usedLayout.length){
                    this.selecteditem.usedLayout = res.usedLayout;
                    var labelArr:string[] = res.usedLayout.map(function (item) {
                        return item.label;
                    });
                    this.layoutsLabels = labelArr.join(', ');
                    this.usedInLayout = true;
                    // console.log('this.layoutsLabels', this.layoutsLabels);
                } else {
                    this.layoutsLabels = 'no layouts';
                    this.usedInLayout = false;
                }
            });
    }

    goAddPlaylist() {
        let link = ['/playlist-editor/-1'];
        this.router.navigate(link);
    }

    goEditPlaylist() {
        if (this.playlistid) {
            let link = ['/playlist-editor', this.playlistid];
            this.router.navigate(link);
        }
    }

    DeletePlaylist() {
        // console.log('selecteditem', this.selecteditem);
        if (this.playlistid && confirm('Are you want to delete playlist "' + this.selecteditem.props.label + '" ?\n' +
                'Used layouts: ' + this.layoutsLabels)){
            this.playlistService.daletePlaylist(this.selecteditem.props.id)
                .subscribe(
                    (res:UpdateResult)=>{
                        this.playlistsService.getPlaylists();
                        if(this.usedInLayout){
                            alert("resave layout: " + this.layoutsLabels);
                        }
                    }
                )
        }
    }
}