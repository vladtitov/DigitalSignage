/**
 * Created by Vlad on 7/12/2016.
 */
import {Component, NgZone} from '@angular/core';
import {UPLOAD_DIRECTIVES} from 'ng2-uploader/ng2-uploader';


@Component({
    selector: 'multiple-progressbar-old',
    template:`
        <div>
            <label for="files-pb" class="ui small black button right icon upload-button">
                <i class="ion-document-text icon"></i>
                Choose files
            </label>
            <input type="file"
                   id="files-pb"
                   style="display:none;"
                   [ng-file-select]="options"
                   name="userImages"
                   (onUpload)="handleUpload($event)"
                   multiple>
        </div>
        <div class="ui divider"></div>
        <div *ngFor="let progressObj of uploadProgresses">
            <div>{{progressObj.original_name}}</div>
            <div class="ui indicating olive progress">
                <div class="bar" [style.width]="progressObj.percent + '%'"></div>
                <div class="label">Uploading file ({{ progressObj.percent }}%)</div>
            </div>
        </div>
        `,
   directives: [UPLOAD_DIRECTIVES],
    styles:[`
            .olive{
                background-color: olive;
             }
             .bar{
                height: 30px;
                background-color: red;
             }
    `]
})

export class UploadFiles {
    uploadFiles: any[];
    uploadProgresses: any[] = [];
   // zone: NgZone;
    options: Object = {
        url: 'http://localhost:8888/api/assets/upload'
    };

    constructor(private zone:NgZone) {
       // this.zone = new NgZone({ enableLongStackTrace: false });
    }

    handleUpload(data:any): void {
       // console.log(data);
        let id = data.id;
        let index = this.findIndex(id);
        if (index === -1) {
            this.uploadProgresses.push({id: id, percent: 0,originalName:data.original_name});
        }
        if (this.uploadProgresses[index]) {
            this.zone.run(() => {
                this.uploadProgresses[index].percent = data.progress.percent;
            });
        }
    }

    findIndex(id: string): number {
        return this.uploadProgresses.findIndex(x => x.id === id);
    }

}
