/**
 * Created by Vlad on 7/30/2016.
 */
import {Component, Input, OnInit} from "@angular/core";
import {VOAsset} from "../services/models";
@Component({
    selector:'asset-item'
    ,template:`
<div class="item">
            <div class="image">
                    <img  src="{{image}}" width="128px" />
            </div>
            <div>
            <span>{{label}}</span>
</div>
</div>

`
    ,styles:[`
.image{
width :128px;
height: 128px;
overflow: hidden;
}
.item{
width: 128px;
height: 150px;

}
`]
})
export class AssetItem implements OnInit{
    @Input()item:VOAsset
    image:string;
    label:string;

    ngOnInit():void{
        switch(this.item.type){
            case 'video':
                this.image = this.item.thumb.split(',')[0];
                break;
            case 'image':
                this.image = this.item.thumb;
                break;
            default:
                this.image = this.item.thumb;
                break;
        }

        this.label = this.item.label;

    }
}