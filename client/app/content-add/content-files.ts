/**
 * Created by Vlad on 7/12/2016.
 */
import { Component, NgZone, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UPLOAD_DIRECTIVES } from './uploader/ng2-uploader';
// import { UPLOAD_DIRECTIVES } from 'ng2-uploader/ng2-uploader';

@Component({
    selector: 'multiple-progressbar',
    template:`
              <div class="wraper">
                <div class="wraper-tools">
                    <button *ngIf="isInProgress && !onCancel" type="button" class="btn btn-danger" (click)="onCancelClick()">Cancel</button>
                    <a title="Click to upload files" [class.disabled]="isInProgress" class="btn btn-primary upload-button">
    
                        <label [class.disabled]="isInProgress" for="files-pb" class="ui black button icon">
                            Browse
                        </label>
    
                        <input [class.disabled]="isInProgress"
                               type="file"
                               id="files-pb"
                               style="display:none;"
                               [ng-file-select]="options"
                               name="userImages"
                               (onUpload)="handleUpload($event)"
                               [onCancel]="onCancel"
                               (change)="onBrowseChange($event)"
                               multiple>
                    </a>
                    <button type="button" class="btn btn-default" (click)="goBack()">Close</button>
                </div>
                <div *ngIf="!toolsDisadled" class="progress-window">
                        <div *ngFor="let progressObj of uploadProgresses">
                            <label>File name: {{progressObj.original_name}}</label>
                            <div class="ui indicating olive progress">
                                <div class="bar"
                                    [class.bar-done]="progressObj.percent==100" 
                                    [style.width]="progressObj.percent + '%'">                              
                                </div>
                            </div>
                            <div class="label">Uploading file: ({{ progressObj.percent }}%)</div>
                        </div>
                </div>
              </div>
                 
             `,
    // directives: [UPLOAD_DIRECTIVES],
    styles:[`
            
            .wraper {
                height: 350px;
            }
               
            .wraper-tools {
                position: absolute;
                bottom: 20px;
                right: 20px;
            }
            
            .wraper-tools > a {
                padding: 0;
            }
            
            .wraper-tools label {
                margin-bottom: 0px;
                font-weight: normal;
                padding: 6px 12px;
            }
            
            .progress-window {
                width: 440px;
                height: 250px;
                overflow-y: auto;
                position: absolute;
            }
            
            .btn {
                 margin-left: 20px;
            }
            
            .cancel {
                position: absolute;
                top: 20px;
                right: 41%;
            }
                        
            .olive {
                height: 10px;
                background-color: olive;
            }
            
            .bar {
                height: 10px;
                background-color: red;
            }
            .bar.bar-done{
                height: 10px;
                background-color: green;
            }
            .progress {
                margin-bottom: 0;
            }
            label {
                margin-bottom: 2px;
            }
            .label{
                color: black;
                font-size: 85%;
                line-height: inherit;
                margin-left: 65%;                
            }
    `]
})

export class FileContent {
    showtools:string = "show";
    showcancel:string = "hide";
    // uploadEnd:boolean;
    isInProgress:boolean = false;
    uploadFiles: any[];
    uploadProgresses: any[] = [];
    // zone: NgZone;
    options: Object = {
        url: 'api/assets/upload'
    };

    onCancel:boolean = false;

    toolsDisadled:boolean = true;

    @Output () hided = new EventEmitter();
    @Output () showed = new EventEmitter();
    @Output () closed = new EventEmitter();
    @Output () changed = new EventEmitter();

    constructor(private zone:NgZone,  private router: Router) {
        // this.zone = new NgZone({ enableLongStackTrace: false });
        // console.log('content-files 47');
    }

    // onBrowse(){
    //     this.isInProgress = false;
    //     // this.onCancel = true;
    //     this.toolsDisadled = true;
    //     // this.uploadProgresses = [];
    //     // console.log('toolsDisadled ', this.toolsDisadled);
    // }

    onBrowseChange(evt) {
        if(evt && evt.target && evt.target.files && evt.target.files.length) this.onUploadsStart();
        // console.log('onBrowseChange ', evt);
    }

    onUploadsStart() {
        this.uploadProgresses = [];
        this.toolsDisadled = true;
        this.onCancel = false;
        this.isInProgress = true;
        this.toolsDisadled = false;
        // console.log('onUploadsStart!!!');
    }


    handleUpload(data:any): void {

        // console.log('handleUpload data: ', data);

        if(this.onCancel) {
            data = null;
            return;
        }

        // if(!this.isInProgress) {
        //     this.isInProgress = true;
        //     this.onUploadsStart();
        // }

        // console.log('handleUpload isInProgress 2 ', this.isInProgress);

        let id = data.id;
        let index = this.findIndex(id);

        if (index === -1) {
            this.uploadProgresses.push({id: id, percent: 0,originalname:data.originalName});
        }
        if (this.uploadProgresses[index]) {
            this.zone.run(() => {
                this.uploadProgresses[index].percent = data.progress.percent;
            });
        }
        this.checkEndUploads();
    }

    findIndex(id: string): number {
        return this.uploadProgresses.findIndex(x => x.id === id);
    }

    checkEndUploads(){
        var allUploads = true;
        for (var i = 0; i < this.uploadProgresses.length; i++) {
            if (this.uploadProgresses[i].percent < 100) {
                allUploads = false;
                break
            }
            // else {
            //     this.onUploadsEnd();
            // }
        }
        if(allUploads) this.onUploadsEnd();
    }

    onUploadsEnd() {
        this.isInProgress = false;
        this.changed.emit(null);
        // console.log('onUploadsEnd!!!');
    }

    cancelAllUploads(){
        this.onCancel = true;
        this.isInProgress = false;
    }

    onCancelClick() {
        this.cancelAllUploads();
        // console.log('onCancelClick isInProgress ', this.isInProgress);
    }

    goBack() {
        this.cancelAllUploads();
        this.router.navigate(["./content-manager",'view',0]);
        // this.closed.emit(null);
    }

}