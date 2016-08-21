/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
    selector: 'web-content',
    template: `
               <div class="wraper">
                <form class="form-horizontal">
                    <div class="form-group">
                    <label class="col-sm-1 control-label" for="UrlWeb">URL</label>
                    <div class="col-sm-11">
                        <input type="text" name="url" class="form-control" id="UrlWeb" placeholder="Enter Url" #urlInput (change)="onChange(urlInput.value)">
                    </div>
                    </div>
                    <div id="web-content-view">
                    
                    </div>
                    <div class="buttons">
                        <button type="submit" class="btn btn-default">Save</button>
                        <button type="button" class="btn btn-default" (click)="goBack()">Close</button>
                    </div>
                </form>
              </div>
              `,
    styles : [`
               .wraper {
                 height: 350px;
               }
               
               .form-horizontal {
                 position: relative;
                 height: 350px;
               }
               
               .buttons {
                 position: absolute;
                 top: 90%;
                 left: 60%;
                 width: 170px;
               }
               
               .btn {
                 margin-left: 20px;
               }
              `]

})

export class WebContent {
    url:string;

    constructor(private router: Router) {
        this.url='';
    }

    onChange (input:string) {

    }

    goBack() {
        this.router.navigate(["./content-manager",'view',0]);
    }
}


