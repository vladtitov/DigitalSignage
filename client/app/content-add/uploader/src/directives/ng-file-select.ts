import {Directive, ElementRef, EventEmitter, Input} from '@angular/core';
import {Ng2Uploader} from '../services/ng2-uploader';

@Directive({
  selector: '[ng-file-select]',
  inputs: ['options: ng-file-select'],
  outputs: ['onUpload'],
  host: { '(change)': 'onFiles()' }
})
export class NgFileSelect {
  uploader: Ng2Uploader;
  options: any;
  onUpload: EventEmitter<any> = new EventEmitter();

  constructor(public el: ElementRef) {
    // console.log('ng2-upload contr!');
    this.uploader = new Ng2Uploader();
    setTimeout(() => {
      this.uploader.setOptions(this.options);
    });

    this.uploader._emitter.subscribe((data) => {
      this.onUpload.emit(data);
    });
  }

  @Input() set onCancel(isCancel:boolean) {
    if(isCancel) {
        this.uploader.uploadStop();
    }
    // console.log('onCancel : ', isCancel);
  }

  onFiles(): void {
      // console.log('this.el', this.el.nativeElement);
    let files = this.el.nativeElement.files;
    if (files.length) {
      this.uploader.addFilesToQueue(files);
    }
  }
}