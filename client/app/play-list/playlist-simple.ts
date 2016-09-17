/**
 * Created by Vlad on 7/24/2016.
 */
import {Component, Input} from "@angular/core";
import {PlayListFrame} from "./playlist-frame";
import {VOPlaylist, VOPlayLists_Assets, VOPlayListProps} from "../services/models";
import {PlaylistsService} from "../services/playlists-service";

@Component({
    selector:'playlist-simple',
    template:`
              <div class="title" [ngClass]="{selected: _selected}">
              <small style="margin-right: 10px">ID: {{playlistprops.id}};</small>
                Name: {{playlistprops.label}};
                Duration: {{playlistprops.duration}};
                <span *ngIf="playlistprops.dimension">Dimension: {{playlistprops.dimension}};</span>
                <span *ngIf="playlistprops.description">Description: {{playlistprops.description}};</span>
              </div>
              <div class="container-scroll">
                     <div class="scroll-content">      
                        <div flex layout="row">
                          <div class="item"  *ngFor="let item of playlistlist; let i = index" layout="row">
                               <playlist-frame [item]="item" #myitem ></playlist-frame>  
                          </div>
                       
                     </div>
                  </div>
              </div>
            `,
    styles:[`
            .container-scroll{
                width: 100%;
                display: block;
                background-color: #e7f1ff;
            }
            
            .scroll-content{
                background-color: #e7f1ff;
                width: 100%;
                display: block;
                height: 150px;
                padding-left: 10px;
            }
            
            .title{
                width: 100%;
                height: 20px;
                background-color: #4b7caa;
                color: white;
                margin-bottom: 2px;    
                padding-left: 10px;
            }              
    
            .selected {
                background-color: #aa861e;
               }
            
            .item {
                height: 130px;
                width: 130px;
                float: left;
                margin-right: 10px;
            }

            `],
    // directives:[PlayListFrame]
})



export class PlayListSimple{
    playlistlist: VOPlayLists_Assets [];
    playlistprops: VOPlayListProps;



    @Input() set playlist (item:VOPlaylist) {
        this.playlistprops = item.props;
        var out: VOPlayLists_Assets [] = [];
        for (var i=0; i < 6; i++) {
            var tmp = item.list.length>i?item.list[i]:{};
            out.push ( new VOPlayLists_Assets( tmp ));
        }
        this.playlistlist = out;
    };

    _selected:boolean = false;

    constructor ( private playlistsService:PlaylistsService) {

    }

    set selected (jj:boolean) {
        this._selected = jj;
    }

}