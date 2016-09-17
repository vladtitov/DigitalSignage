/**
 * Created by Dmitriy Prilutsky on 19.07.2016.
 */

import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { VOViewport } from "../services/models";


declare var  domtoimage:any;
declare var  html2canvas:any;
@Component({
    selector: 'assembler-viewports',
    template: `
<div>
               <p>Playlists available</p>
              <playlists-list></playlists-list>
                <a class="btn btn-default" (click) = "makeSnap()"><span class="fa fa-life-saver"></span> MakeSnap</a>
               <div   id="assebleVP"  class="assembler-viewports">
                    <div class="mycontent" #myview *ngFor="let item of viewports">
                    <viewport-assembler [item]="item" [viewports]="viewports" (onview)="onClickViewport()"></viewport-assembler>
                      
                    </div>
               </div>
               <div id="SnapResult">
               
               
                </div>
</div>
              `,
    styles: [`  
                .mycontent {
                    position: relative;
                }
                
                          
                
                p {
                    text-align: center;
                }
            `]
})

export class AssemblerViewports implements OnInit {
    @Output () onview = new EventEmitter();
    @Input() viewports:VOViewport [] =[];

    errorMessage: string;
    //viewport:VOViewport;


    constructor (private ar:ActivatedRoute, private myrouter:Router) {

    }

    ngOnInit() {
       /* this.viewportService.viewports$.subscribe(
            data => this.viewports = data,
            error =>  this.errorMessage = <any>error
        );
        this.viewportService.getViewports();*/

    }

    makeSnap():void{
        var node = document.getElementById('assebleVP');
        domtoimage.toPng(node)
            .then(function (dataUrl) {
                var img = new Image();
                img.src = dataUrl;
                document.body.appendChild(img);
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });

    }

    ngOnDestroy() {
        //this.paramsSub.unsubscribe();
    }

    onClickViewport():void{
      this.onview.emit(null);
    }

}


