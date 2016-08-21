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
var ng2_uploader_1 = require('ng2-uploader/ng2-uploader');
var UploadFiles = (function () {
    function UploadFiles(zone) {
        this.zone = zone;
        this.uploadProgresses = [];
        // zone: NgZone;
        this.options = {
            url: 'http://localhost:8888/api/assets/upload'
        };
        // this.zone = new NgZone({ enableLongStackTrace: false });
    }
    UploadFiles.prototype.handleUpload = function (data) {
        var _this = this;
        // console.log(data);
        var id = data.id;
        var index = this.findIndex(id);
        if (index === -1) {
            this.uploadProgresses.push({ id: id, percent: 0, originalName: data.original_name });
        }
        if (this.uploadProgresses[index]) {
            this.zone.run(function () {
                _this.uploadProgresses[index].percent = data.progress.percent;
            });
        }
    };
    UploadFiles.prototype.findIndex = function (id) {
        return this.uploadProgresses.findIndex(function (x) { return x.id === id; });
    };
    UploadFiles = __decorate([
        core_1.Component({
            selector: 'multiple-progressbar-old',
            template: "\n        <div>\n            <label for=\"files-pb\" class=\"ui small black button right icon upload-button\">\n                <i class=\"ion-document-text icon\"></i>\n                Choose files\n            </label>\n            <input type=\"file\"\n                   id=\"files-pb\"\n                   style=\"display:none;\"\n                   [ng-file-select]=\"options\"\n                   name=\"userImages\"\n                   (onUpload)=\"handleUpload($event)\"\n                   multiple>\n        </div>\n        <div class=\"ui divider\"></div>\n        <div *ngFor=\"let progressObj of uploadProgresses\">\n            <div>{{progressObj.original_name}}</div>\n            <div class=\"ui indicating olive progress\">\n                <div class=\"bar\" [style.width]=\"progressObj.percent + '%'\"></div>\n                <div class=\"label\">Uploading file ({{ progressObj.percent }}%)</div>\n            </div>\n        </div>\n        ",
            directives: [ng2_uploader_1.UPLOAD_DIRECTIVES],
            styles: ["\n            .olive{\n                background-color: olive;\n             }\n             .bar{\n                height: 30px;\n                background-color: red;\n             }\n    "]
        }), 
        __metadata('design:paramtypes', [core_1.NgZone])
    ], UploadFiles);
    return UploadFiles;
}());
exports.UploadFiles = UploadFiles;
//# sourceMappingURL=UploadFiles.js.map