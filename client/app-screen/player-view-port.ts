/**
 * Created by Vlad on 8/2/2016.
 */
import {Component, Input, OnInit} from "@angular/core";
import {VOViewport} from "../app/services/models";
import {PlayerLite} from "./palyer-lite";
@Component({
selector:'player-view-port'
    ,template:`
<div class="pos-absolute player-view-port"
                 [style.top]=myviewport.y 
                 [style.left]=myviewport.x 
                 [style.width]=myviewport.width 
                 [style.height]=myviewport.height
                 >
                 <player-lite [playlist_id]="myviewport.playlist_id "  ></player-lite>     
</div>
`
    ,directives:[PlayerLite]
})

export class PlayerViewPort implements OnInit{
    @Input()myviewport:VOViewport;

    ngOnInit(){

console.log(this.myviewport);

    }
}