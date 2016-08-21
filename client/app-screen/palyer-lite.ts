import {Component, OnInit, Input} from "@angular/core";

import {VOPlaylist, VOPlayLists_Assets} from "../app/services/models";
import {DeviceService} from "./services/device-service";
@Component({
    selector:'player-lite'
    ,template:`
        <h2>Player Lite id {{playlist.props.label}}</h2>       
         <h2>Screen {{screenid}}</h2> 
         <div *ngIf="currentImage">
            <img  src="{{currentImage}}" />
        </div>
               <div *ngIf="currentVideo" >
               <video width="1280" height="720" autoplay>
                    <source src="{{currentVideo}}" type="video/mp4">                               
                </video>
                </div>
    `
    ,providers:[]
})
export class PlayerLite implements OnInit{
    @Input() playlist_id;
    playlist:VOPlaylist = new VOPlaylist({});
    playliasItes:VOPlayLists_Assets[];
    screenid:string;
    private _data:any;
    private _error:string;
    private current:number=0;
    private currentItem:VOPlayLists_Assets;
    currentImage:string;
    currentVideo:string;


    constructor(private deviceService:DeviceService){

    }

    ngOnInit():void{
        if(this.playlist_id) this.deviceService.getPlaylist((this.playlist_id)).subscribe(
            (playlist:VOPlaylist) =>{
                this.playlist = playlist;
                this.playliasItes = playlist.list;
                this.startPlay();
                this.playNext();
            }
        )

        // this.service.getPlaylist(this.playerid).subscribe(data=>this._data=data, err=>this._error = err);
    }


    myInterval:any;

    startPlay():void{
    this.myInterval = setInterval(()=>this.onTick(),10000);
    }
    stopPlay():void{
        clearInterval(this.myInterval);
    };

    onTick():void{
        this.playNext();
    }

    onPlayListEnd():void{
        this.current=0;
    }

    onPlayListStart():void{

    }


    playNext():void{
        this.current++;
        if(this.current>=this.playliasItes.length){
           this.onPlayListEnd();
        }
        this.currentItem = this.playliasItes[this.current]
        this.playCurrentItem();

    }

    playCurrentItem():void{
        var item:any= this.currentItem
        console.log(item.path);
        switch(item.type){
                case 'image':
                    this.currentImage = item.path;
                    break;
                case 'video':
                    this.currentImage=null;
                    this.currentVideo = item.path;
                    this.stopPlay();
                    break;
            default:
                this.currentImage = item.path
                break

        }

        console.log(this.currentImage,this.currentVideo);
    }

}
