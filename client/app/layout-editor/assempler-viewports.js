/**
 * Created by Dmitriy Prilutsky on 19.07.2016.
 */
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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var AssemblerViewports = (function () {
    //viewport:VOViewport;
    function AssemblerViewports(ar, myrouter) {
        this.ar = ar;
        this.myrouter = myrouter;
        this.onview = new core_1.EventEmitter();
        this.viewports = [];
    }
    AssemblerViewports.prototype.ngOnInit = function () {
        /* this.viewportService.viewports$.subscribe(
             data => this.viewports = data,
             error =>  this.errorMessage = <any>error
         );
         this.viewportService.getViewports();*/
    };
    AssemblerViewports.prototype.makeSnap = function () {
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
    };
    AssemblerViewports.prototype.ngOnDestroy = function () {
        //this.paramsSub.unsubscribe();
    };
    AssemblerViewports.prototype.onClickViewport = function () {
        this.onview.emit(null);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssemblerViewports.prototype, "onview", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AssemblerViewports.prototype, "viewports", void 0);
    AssemblerViewports = __decorate([
        core_1.Component({
            selector: 'assembler-viewports',
            template: "\n<div>\n               <p>Playlists available</p>\n              <playlists-list></playlists-list>\n                <a class=\"btn btn-default\" (click) = \"makeSnap()\"><span class=\"fa fa-life-saver\"></span> MakeSnap</a>\n               <div   id=\"assebleVP\"  class=\"assembler-viewports\">\n                    <div class=\"mycontent\" #myview *ngFor=\"let item of viewports\">\n                    <viewport-assembler [item]=\"item\" [viewports]=\"viewports\" (onview)=\"onClickViewport()\"></viewport-assembler>\n                      \n                    </div>\n               </div>\n               <div id=\"SnapResult\">\n               \n               \n                </div>\n</div>\n              ",
            styles: ["  \n                .mycontent {\n                    position: relative;\n                }\n                \n                          \n                \n                p {\n                    text-align: center;\n                }\n            "]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router])
    ], AssemblerViewports);
    return AssemblerViewports;
}());
exports.AssemblerViewports = AssemblerViewports;
//# sourceMappingURL=assempler-viewports.js.map