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
var LayoutView = (function () {
    function LayoutView(ar, myrouter) {
        this.ar = ar;
        this.myrouter = myrouter;
    }
    LayoutView.prototype.ngOnInit = function () {
        /*  this.layoutService.selectedItem$.subscribe(
              (data:LayoutVO)=>{
                //  this.layout = data;
                  console.log(data);
                  if (data) this.viewports = data.viewports;
              }
          )*/
    };
    LayoutView.prototype.onNextClick = function () {
    };
    LayoutView.prototype.ngOnDestroy = function () {
        //this.paramsSub.unsubscribe();
    };
    LayoutView.prototype.onClickViewport = function () {
        //  this.onview.emit(null);
    };
    LayoutView = __decorate([
        core_1.Component({
            selector: 'layout-view',
            template: "\n               <div class=\"layout-view\">              \n                   <viewports-view [viewports]=\"viewports\" (onview)=\"onClickViewport()\"></viewports-view>\n               </div>\n              ",
            styles: [" \n               .layout-view {\n                   margin-top: 20px; \n                   width: 800px;\n                   height: 800px;\n                }\n              "],
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router])
    ], LayoutView);
    return LayoutView;
}());
exports.LayoutView = LayoutView;
//# sourceMappingURL=layout-view.js.map