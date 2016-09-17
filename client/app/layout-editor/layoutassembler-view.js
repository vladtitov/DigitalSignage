/**
 * Created by Dmitriy Prilutsky on 15.07.2016.
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
var LayoutAssemplerView = (function () {
    function LayoutAssemplerView(ar, myrouter) {
        this.ar = ar;
        this.myrouter = myrouter;
        this.onview = new core_1.EventEmitter();
    }
    LayoutAssemplerView.prototype.ngOnInit = function () {
        /* this.asseblerService.currentItem$.subscribe(
             data=>this.mylayout = data
         )*/
        /* this.layoutService.selectedItem$.subscribe(
             (data:LayoutVO)=>{
                 this.mylayout = data;
                 console.log(data);
                 this.viewports = data.viewports;
             }
         )*/
    };
    LayoutAssemplerView.prototype.ngOnDestroy = function () {
        //this.paramsSub.unsubscribe();
    };
    LayoutAssemplerView.prototype.onClickViewport = function () {
        this.onview.emit(null);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LayoutAssemplerView.prototype, "onview", void 0);
    LayoutAssemplerView = __decorate([
        core_1.Component({
            selector: 'layoutassembler-view',
            template: "\n<div>\n                <div>\n                <assembler-playlists></assembler-playlists>\n                \n                </div>\n               <div class=\"layout-view\" *ngIf=\"mylayout\">\n                  <assembler-viewports   [viewports]=\"mylayout.viewports\" (onview)=\"onClickViewport()\"></assembler-viewports>\n               </div>\n</div>\n              ",
            styles: [" \n               .layout-view {\n                   margin-top: 20px; \n                   width: 800px;\n                   height: 800px;\n                }\n              "],
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router])
    ], LayoutAssemplerView);
    return LayoutAssemplerView;
}());
exports.LayoutAssemplerView = LayoutAssemplerView;
//# sourceMappingURL=layoutassembler-view.js.map