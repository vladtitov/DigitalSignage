"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Vlad on 7/12/2016.
 */
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
// import { UPLOAD_DIRECTIVES } from 'ng2-uploader/ng2-uploader';
var FileContent = (function () {
    function FileContent(zone, router) {
        this.zone = zone;
        this.router = router;
        this.showtools = "show";
        this.showcancel = "hide";
        // uploadEnd:boolean;
        this.isInProgress = false;
        this.uploadProgresses = [];
        // zone: NgZone;
        this.options = {
            url: 'api/assets/upload'
        };
        this.onCancel = false;
        this.toolsDisadled = true;
        this.hided = new core_1.EventEmitter();
        this.showed = new core_1.EventEmitter();
        this.closed = new core_1.EventEmitter();
        this.changed = new core_1.EventEmitter();
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
    FileContent.prototype.onBrowseChange = function (evt) {
        if (evt && evt.target && evt.target.files && evt.target.files.length)
            this.onUploadsStart();
        // console.log('onBrowseChange ', evt);
    };
    FileContent.prototype.onUploadsStart = function () {
        this.uploadProgresses = [];
        this.toolsDisadled = true;
        this.onCancel = false;
        this.isInProgress = true;
        this.toolsDisadled = false;
        // console.log('onUploadsStart!!!');
    };
    FileContent.prototype.handleUpload = function (data) {
        // console.log('handleUpload data: ', data);
        var _this = this;
        if (this.onCancel) {
            data = null;
            return;
        }
        // if(!this.isInProgress) {
        //     this.isInProgress = true;
        //     this.onUploadsStart();
        // }
        // console.log('handleUpload isInProgress 2 ', this.isInProgress);
        var id = data.id;
        var index = this.findIndex(id);
        if (index === -1) {
            this.uploadProgresses.push({ id: id, percent: 0, originalname: data.originalName });
        }
        if (this.uploadProgresses[index]) {
            this.zone.run(function () {
                _this.uploadProgresses[index].percent = data.progress.percent;
            });
        }
        this.checkEndUploads();
    };
    FileContent.prototype.findIndex = function (id) {
        return this.uploadProgresses.findIndex(function (x) { return x.id === id; });
    };
    FileContent.prototype.checkEndUploads = function () {
        var allUploads = true;
        for (var i = 0; i < this.uploadProgresses.length; i++) {
            if (this.uploadProgresses[i].percent < 100) {
                allUploads = false;
                break;
            }
        }
        if (allUploads)
            this.onUploadsEnd();
    };
    FileContent.prototype.onUploadsEnd = function () {
        this.isInProgress = false;
        this.changed.emit(null);
        // console.log('onUploadsEnd!!!');
    };
    FileContent.prototype.cancelAllUploads = function () {
        this.onCancel = true;
        this.isInProgress = false;
    };
    FileContent.prototype.onCancelClick = function () {
        this.cancelAllUploads();
        // console.log('onCancelClick isInProgress ', this.isInProgress);
    };
    FileContent.prototype.goBack = function () {
        this.cancelAllUploads();
        this.router.navigate(["./content-manager", 'view', 0]);
        // this.closed.emit(null);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FileContent.prototype, "hided", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FileContent.prototype, "showed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FileContent.prototype, "closed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FileContent.prototype, "changed", void 0);
    FileContent = __decorate([
        core_1.Component({
            selector: 'multiple-progressbar',
            template: "\n              <div class=\"wraper\">\n                <div class=\"wraper-tools\">\n                    <button *ngIf=\"isInProgress && !onCancel\" type=\"button\" class=\"btn btn-danger\" (click)=\"onCancelClick()\">Cancel</button>\n                    <a title=\"Click to upload files\" [class.disabled]=\"isInProgress\" class=\"btn btn-primary upload-button\">\n    \n                        <label [class.disabled]=\"isInProgress\" for=\"files-pb\" class=\"ui black button icon\">\n                            Browse\n                        </label>\n    \n                        <input [class.disabled]=\"isInProgress\"\n                               type=\"file\"\n                               id=\"files-pb\"\n                               style=\"display:none;\"\n                               [ng-file-select]=\"options\"\n                               name=\"userImages\"\n                               (onUpload)=\"handleUpload($event)\"\n                               [onCancel]=\"onCancel\"\n                               (change)=\"onBrowseChange($event)\"\n                               multiple>\n                    </a>\n                    <button type=\"button\" class=\"btn btn-default\" (click)=\"goBack()\">Close</button>\n                </div>\n                <div *ngIf=\"!toolsDisadled\" class=\"progress-window\">\n                        <div *ngFor=\"let progressObj of uploadProgresses\">\n                            <label>File name: {{progressObj.original_name}}</label>\n                            <div class=\"ui indicating olive progress\">\n                                <div class=\"bar\"\n                                    [class.bar-done]=\"progressObj.percent==100\" \n                                    [style.width]=\"progressObj.percent + '%'\">                              \n                                </div>\n                            </div>\n                            <div class=\"label\">Uploading file: ({{ progressObj.percent }}%)</div>\n                        </div>\n                </div>\n              </div>\n                 \n             ",
            // directives: [UPLOAD_DIRECTIVES],
            styles: ["\n            \n            .wraper {\n                height: 350px;\n            }\n               \n            .wraper-tools {\n                position: absolute;\n                bottom: 20px;\n                right: 20px;\n            }\n            \n            .wraper-tools > a {\n                padding: 0;\n            }\n            \n            .wraper-tools label {\n                margin-bottom: 0px;\n                font-weight: normal;\n                padding: 6px 12px;\n            }\n            \n            .progress-window {\n                width: 440px;\n                height: 250px;\n                overflow-y: auto;\n                position: absolute;\n            }\n            \n            .btn {\n                 margin-left: 20px;\n            }\n            \n            .cancel {\n                position: absolute;\n                top: 20px;\n                right: 41%;\n            }\n                        \n            .olive {\n                height: 10px;\n                background-color: olive;\n            }\n            \n            .bar {\n                height: 10px;\n                background-color: red;\n            }\n            .bar.bar-done{\n                height: 10px;\n                background-color: green;\n            }\n            .progress {\n                margin-bottom: 0;\n            }\n            label {\n                margin-bottom: 2px;\n            }\n            .label{\n                color: black;\n                font-size: 85%;\n                line-height: inherit;\n                margin-left: 65%;                \n            }\n    "]
        }), 
        __metadata('design:paramtypes', [core_1.NgZone, router_1.Router])
    ], FileContent);
    return FileContent;
}());
exports.FileContent = FileContent;
//# sourceMappingURL=content-files.js.map