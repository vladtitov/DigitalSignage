/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import {RSSService, RSSItem} from "../services/rss-service";
// import {DomSanitizationService, SafeHtml} from "@angular/platform-browser";
import {buffer} from "rxjs/operator/buffer";

@Component({
    selector:'rss-view',
    template:`
                <div  class="rss-item">
                    <div *ngIf="rssItem" >
                      <h3>
                        {{rssItem.title}}            
                        </h3>
                        <div [innerHTML]="_sanitizer.bypassSecurityTrustHtml(rssItem.content)" >            
                        </div>       
                    </div>           
                </div>
                <!--<button class="btn btn-default" (click)="onCapture()">Capture</button>-->
            `,

})

export class RSSView implements OnInit{
    @Input() rssItem:RSSItem;
    // rssContent:SafeHtml;

    constructor(
        // private _sanitizer:DomSanitizationService
    ){

    }
    ngOnInit(): void {
       // this.rssContent = this._sanitizer.bypassSecurityTrustHtml(this.rssItem.content);
    }

    onCapture():void{

    }
}



@Component({
    selector: 'rss-content',
    // directives:[RSSView],
    providers: [RSSService],
    template: `<div class="wraper">
                <div class="form-horizontal">
                  <div class="form-group">
                    <label class="col-sm-1  control-label" for="UrlOfRSS">URL</label>
                    <div class="col-sm-11">
                        <input type="text" name="url" class="form-control" id="UrlOfRSS" placeholder="Enter Url of RSS"  #urlInput >
                        <button type="button"  class="btn btn-default" (click)="onGetFeed(urlInput.value)">Get</button>
                    </div>
                  </div>
                  <div class="rss-content-view">
                        <rss-view [rssItem]="rssSelected" ></rss-view>                  
                  </div>
                  <div *ngIf="hideArrows" class="buttons-nav">
                        <button type="button" class="arrow left"  [style.background-image]="bgimage" *ngIf="hideLeftArrow" (click)="onPreviousRssItem()"></button>
                        <button type="button" class="arrow right"  [style.background-image]="bgimage" *ngIf="hideRightArrow" (click)="onNextRssItem()"></button>
                  </div>
                  <div class="buttons">
                      <a type="submit" class="btn btn-default" (click)="onSaveClick(urlInput.value)">Save</a>
                      <button type="button" class="btn btn-default" (click)="goBack()">Close</button>
                  </div>
                </div>
               </div>
             `,
    styles : [`
               .wraper {
                 height: 350px;
               }
               
               .form-group input {
                 width: 80%;
                 float: left;
               }
               
               .form-horizontal {
                 position: relative;
                 height: 350px;
               }
               
               .arrow {
                 position: absolute;
                 top: 80%;
               }
               
               .buttons {
                 position: absolute;
                 top: 90%;
                 left: 60%;
                 width: 170px;
               }
               .arrow {
                 width: 56px;
                 height: 30px;
                 border: none;
               }
               
               .arrow:focus {
                outline: none;
               }
               
               .left {
                 left: 35%;
               }
               
               .right {
                 left: 50%;
                 transform: scale(-1, 1)
               }
               
               .btn {
                 margin-left: 20px;
               }
               
               .rss-content-view{
                 position: absolute;
                 top:0;
                 right:-30px;
                 height: 200px;
                 transform: scale(0.5);
               }

               `]
})

export class RssContent {
    hideArrows:boolean;
    hideLeftArrow:boolean;
    hideRightArrow:boolean = true;
    rssfeeds:RSSItem[];
    rssSelected:RSSItem;
    private selectedIndex:number;
    bgimage: string = "url('/app/content-add/arrows.png')";
    constructor(private router: Router, private feed:RSSService) {

    }


    onSaveClick(evt:string){
        this.feed.saveOnServer(evt).subscribe((res)=>{
            console.log('onSaveClick res', res);
        }, (err)=>{
            console.log('onSaveClick error ', err);
            this.handleError(err); // = <any>err;
        });
        console.log('onSaveClick ', evt);
    }

    onGetFeed (input:string) {
        this.hideArrows = true;
        console.log(input);
        this.feed.getData(input).subscribe(
            data => {
                this.rssfeeds = data;
                this.selectedIndex = 0;
                this.rssSelected = this.rssfeeds[0];
                console.log(this.rssSelected);
            },
            error =>  this.handleError = <any>error
        )
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return errMsg;
    }

    onPreviousRssItem() {
        let id = this.rssSelected.id;
        if (id > 0) {
            this.rssSelected = this.rssfeeds[id - 1];
            this.hideRightArrow = true;
        }
        if (id-1 === 0) this.hideLeftArrow = false;
    }

    onNextRssItem() {
        let id = this.rssSelected.id;
        if (id < this.rssfeeds.length - 1) {
            this.rssSelected = this.rssfeeds[id + 1];
            this.hideLeftArrow = true;
        }
        if (id + 1 === this.rssfeeds.length - 1) this.hideRightArrow = false;
    }

    goBack() {
        this.router.navigate(["./content-manager",'view',0]);
    }
}


