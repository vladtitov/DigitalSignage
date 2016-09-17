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
var ViewportsView = (function () {
    function ViewportsView(ar, myrouter) {
        this.ar = ar;
        this.myrouter = myrouter;
        this.onview = new core_1.EventEmitter();
    }
    ViewportsView.prototype.ngOnInit = function () {
        /* this.viewportService.viewports$.subscribe(
             data => this.viewports = data,
             error =>  this.errorMessage = <any>error
         );
         this.viewportService.getViewports();*/
    };
    ViewportsView.prototype.ngOnDestroy = function () {
        //this.paramsSub.unsubscribe();
    };
    ViewportsView.prototype.onClickViewport = function () {
        this.onview.emit(null);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ViewportsView.prototype, "onview", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ViewportsView.prototype, "viewports", void 0);
    ViewportsView = __decorate([
        core_1.Component({
            selector: 'viewports-view',
            template: "\n               \n               <div class=\"viewports-view\">\n                    <div class=\"mycontent\" #myview *ngFor=\"let item of viewports\">\n                    <viewport-view [item]=\"item\" [viewports]=\"viewports\" (onview)=\"onClickViewport()\"></viewport-view>\n                      \n                    </div>\n               </div>\n              ",
            styles: ["  \n                .mycontent {\n                    position: relative;\n                }\n                \n                viewport-view {\n                    position: absolute;\n                }\n                \n                p {\n                    text-align: center;\n                }\n            "],
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router])
    ], ViewportsView);
    return ViewportsView;
}());
exports.ViewportsView = ViewportsView;
//# sourceMappingURL=viewports-view.js.map