/**
 * Created by Dmitriy Prilutsky on 30.07.2016.
 */

import {Component, Input, OnInit} from "@angular/core";
import {VOAsset} from "../services/models";

@Component ({
    selector : 'asset-card',
    template : `
<div>
            <div class="card-{{size}}">
                <div class="thumb-{{size}}" [class.selected]="item.selected">
                    <div class="image-container-{{size}}">
                            <img class="image-{{size}}" src="{{image}}" />
                    </div>
                    <div class="myid"><span>{{item.id}}</span></div>
                    <div class="info pos-bottom">
                        <div class="deviceText-{{size}}"><span>{{item.label}}</span></div>
                        <div class="deviceText-{{size}}" *ngIf="duration">Duration: <span>{{duration}}</span></div>
                    </div>
                </div>
            </div>
</div>    
              `,
    styles : [`                
                .selected {
                    border: 2px solid red;
                }
                
                img {
                    display: block;
                    margin: 0 auto;
                }
                
              `]
})


export class AssetCard implements OnInit{
    @Input () item:VOAsset;
    @Input () size:number;  // 128 || 256

    label:string;
    image:string;
    duration:number;

    ngOnInit(){

        if(!this.item.label) this.item.label = this.item.originalname;
        switch(this.item.type){
            case 'video':
                if(this.item.thumb) this.image = this.item.thumb.split(',')[0];
                this.duration = this.item.duration;
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