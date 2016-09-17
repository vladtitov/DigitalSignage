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
var models_1 = require("../services/models");
var LayoutsTemplate = (function () {
    /// viewports:VOViewport[];
    function LayoutsTemplate(ar, myrouter, sroute, router) {
        this.ar = ar;
        this.myrouter = myrouter;
        this.sroute = sroute;
        this.router = router;
        this.onview = new core_1.EventEmitter();
        this.currentItem = new models_1.VOTemplate({});
    }
    LayoutsTemplate.prototype.onSelect = function (item) {
        this.currentItem = item;
        if (this.currentItem) {
            var link = ['/layout-template', this.currentItem.id];
            this.router.navigate(link);
        }
    };
    LayoutsTemplate.prototype.ngOnInit = function () {
    };
    LayoutsTemplate.prototype.onNextClick = function () {
        if (this.currentItem) {
            var link = ['/layout-editor/template/', this.currentItem.id];
            this.router.navigate(link);
        }
    };
    LayoutsTemplate.prototype.ngOnDestroy = function () {
        //this.paramsSub.unsubscribe();
    };
    LayoutsTemplate.prototype.onClickViewport = function () {
        this.onview.emit(null);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LayoutsTemplate.prototype, "onview", void 0);
    LayoutsTemplate = __decorate([
        core_1.Component({
            selector: 'layouts-template',
            template: "\n<div>\n            <div class =\"panel-heading\">            \n            <h3>New Layout from template</h3>\n                <a *ngIf=\"currentItem\" class=\"btn btn-default\" [class.disabled]=\"!currentItem.id\" (click)=\"onNextClick()\"><span class=\"fa fa-arrow-right\"></span> Next</a>\n            </div>\n            <div class=\"panel-body\">\n                <div>\n                    <layouts-template-list (onselect)=\"onSelect($event)\"></layouts-template-list>  \n                </div>\n                <div class=\"layout-view\">\n                    <img  src=\"{{currentItem.image}}\" />                \n                </div>\n            </div>\n</div>\n              ",
            styles: [" \n             h3{\n                display: inline;\n             }\n              .layout-view {\n                   margin: 20px auto;\n                   text-align: center;\n                   width: 800px;\n                   height: 800px;\n                }\n                .layout-view>img{\n                    max-width: 800px;\n                    max-height: 800px;\n                }\n                \n                \n              "]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, router_1.ActivatedRoute, router_1.Router])
    ], LayoutsTemplate);
    return LayoutsTemplate;
}());
exports.LayoutsTemplate = LayoutsTemplate;
//# sourceMappingURL=layouts-template.js.map