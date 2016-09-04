/**
 * Created by Vlad on 7/18/2016.
 */
import {Component, OnInit, Input, Output,EventEmitter} from "@angular/core";
import {VOPlayLists_Assets, VOAsset} from "../services/models";

@Component({
    selector:'playlist-editable-item',
    template:`



        <div class="item" [style.width.px]="myWidth" [class.selected]="item.selected" [class.hilited]="item.hilited" (dblclick)="onItemDobleClick(item)" (dragstart)="onDragStart(item)" >
                <div class="myid"><span>{{id}}</span></div>
                <div class="myimage" [class.pictures]="image2">                
                
                            <img src="{{image}}" [class.img1]="!image2" [class.img2]="image2" (onerror)="onImageLoadError($event)">
                            <img *ngIf="image2" class="img2" src="{{image2}}" width="120">
                            <img *ngIf="image3" class="img2" src="{{image3}}" width="120">
                           
                </div>
                <div class="label">{{label}}</div>
        </div>
`,
    styles:[`
           .item{
                border-left: 6px solid #e1f5fe;
                margin-left: -2px;
                padding:0;               
                height: 128px;
                background-color: rgba(225, 193, 193, 0.51);
                position: relative;
           }
           .myimage{
                overflow: hidden;
           }
           .item > .myimage > .img1 {
                max-width: 120px;
                max-height: 120px;
                /*border: 1px solid #c3c3c3;*/
                position:absolute;
                top:0;
                bottom: 0;
                left: 0;
                right:0;
                margin:auto;
                border-radius: 5px;
                border: 2px solid #e7f1ff;
           }           
           
            .pictures {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                align-content: center;
            
                height: 128px;
            }
            .img2 {  
                max-width: 120px;
                max-height: 120px;
                text-align: center;
                line-height: 120px;        
                border-radius: 5px;
                border: 2px solid #e7f1ff;
                margin: auto;
            }
                 
           .selected{
                opacity: 0.5;
           }
           .hilited{
                border-left: 6px red solid;
           }
           
           .label{
               position: absolute;
               bottom: 0;
               color: black;
               background-color: ghostwhite;              
           }
         
`]
})

export class PlayListItem implements OnInit{

    @Input() item:  VOPlayLists_Assets;
    @Input() position:number;

    myOpacity:number = 1;

    image:string;
    image2:string;
    image3:string;

    myWidth:number = 130;
    sellWidth:number = 130
    //hilited:boolean;
    asset:VOAsset;


    @Output()onremoveme:EventEmitter<{}> = new EventEmitter();
    @Output()onremovemeDrag:EventEmitter<{}> = new EventEmitter();
    onDragStart(item){
        this.onremovemeDrag.next(item);
    }

    id:number;
    label:string;

    constructor(){ }




    onItemDobleClick(item){
        this.onremoveme.next(item);
    }


    setPosition(num:number):boolean{
        if(this.position ===num) return false;
        return true
    }
    ngOnInit():void{
       // this.item.position = this.position;
       //  this.id=this.position;
       //  console.log('this.item ', this.item);
        var asset:VOAsset = new VOAsset(this.item);
        // console.log('asset ', asset);

        if(!asset.duration || isNaN(asset.duration))  asset.duration = 10;
        switch(asset.type){
            case 'video':
                var arr:string[] =  asset.thumb.split(',');
                if(arr.length) this.image = arr[0];
                if(arr.length > 1 && asset.duration > 19) this.image2 = arr[1];
                if(arr.length > 2 && asset.duration > 29) this.image3 = arr[2];
                break;
            case 'image':
                this.image = asset.thumb;
                break;
            default:
                this.image = asset.thumb;
                break;
        }


        if(!this.item.duration)this.item.duration = asset.duration;

        this.setDuration(this.item.duration);

        this.id = asset.id;
        this.label = asset.label || 'no label';
    }

    setDuration(dur:number):void{
        this.item.duration=dur;
        this.myWidth = Math.round(this.sellWidth*this.item.duration/10);
    }
    setOpacity(num:number):void{
        this.myOpacity = num;
    }

    // removeMe():void{
    //     VOPlayLists_Assets.removeMe(this.item);
    // }

    onImageLoadError(evt):void{
        console.log(evt);
    }
}