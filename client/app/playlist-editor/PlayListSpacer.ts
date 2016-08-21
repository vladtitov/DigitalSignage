/**
 * Created by Vlad on 7/18/2016.
 */
import {Component, Input, OnInit} from "@angular/core";
import {VOAsset,VOPlayLists_Assets} from "../services/models";
@Component({
    selector:'playlist-spacer',
    template:`<div class="spacer" [style.width]="width"  >
                <img src="{{thumb}}"/>
              </div>
     `,
    styles:[`
          .spacer {               
                height: 128px;
                border: thin solid gray;
                transition: width 0.5s;
                -webkit-transition:width 0.5s;
           }
           img{          
          width: inherit;
           }

`]
})
export class PlayListSpacer implements OnInit{
   @Input()set item(item:VOAsset){
       this._item = item;
       this.thumb = item.thumb;
       this.width=item?100:40;
   }

    width:number=40;
    private _item:VOAsset;
    thumb:string;

    ngOnInit():void{

    }

    onItemIn(item:VOAsset):void{
        this.item = item;
        this.width=128;
    }
    onItemOut():void{
        this.item = null;
        this.width = 40;
    }
}

