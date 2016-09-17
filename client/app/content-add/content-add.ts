/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { Component, Output, EventEmitter } from '@angular/core';
//import { MD_TABS_DIRECTIVES } from '@angular2-material/tabs';
import { Router, ActivatedRoute } from '@angular/router';
// import {FileContent} from "./content-files";
//import {RssContent} from "./content-rss";
//import {WebContent} from "./content-web";



@Component({
    selector: 'add-content',
    template: `
                <div class="add-content">
                    <multiple-progressbar 
                            (hided)="onHided()" 
                            (showed)="onShowed()"
                            (closed)="onModalClose()"
                            (changed)="onUpload()">
                    </multiple-progressbar>
                </div>
  `,
    styles:[`
                .add-content-title {
                    margin-top: 20px;
                    text-align: center;
                    font-weight: bold;
                }
            `],
    // directives: [ROUTER_DIRECTIVES, FileContent]
})

export class AddContent {
    contm2:any;
    paramsSub:any;
    selectedIndex:number = 0;

    @Output () hided = new EventEmitter();
    @Output () showed = new EventEmitter();
    @Output () closed = new EventEmitter();
    @Output () changed = new EventEmitter();

    constructor(  private router: Router, private activatedRoute: ActivatedRoute) {

    }


    ngOnInit() {
        this.paramsSub = this.activatedRoute.params.subscribe((params) => {
            switch (params['contm2']) {
                case "files":
                    this.selectedIndex = 0;
                    break;
                case "rss":
                    this.selectedIndex = 1;
                    break;
                case "web-content":
                    this.selectedIndex = 2;
                    break;
            };
            this.contm2 = +params['contm2']
        });
        /*        this.router.navigate(['./files']);*/
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe();
    }

    handleFocus(evt:Event) {

    }

    onHided() {
        this.hided.emit(null);
    }

    onShowed() {
        this.showed.emit(null);
    }

    onModalClose () {
        this.closed.emit(null);
    }

    onUpload() {
        this.changed.emit(null);
    }
}