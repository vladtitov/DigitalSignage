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
var layouts_templates_service_1 = require("../services/layouts-templates-service");
var LayoutsTemplateList = (function () {
    function LayoutsTemplateList(ar, myrouter, templatesService) {
        this.ar = ar;
        this.myrouter = myrouter;
        this.templatesService = templatesService;
        this.onselect = new core_1.EventEmitter();
        this.layouts = [];
    }
    LayoutsTemplateList.prototype.ngOnInit = function () {
        var _this = this;
        /*this. templatesService.layouts$.subscribe(
            data => {

                this.layouts = data
            },
            error =>  this.errorMessage = <any>error
        );*/
        this.templatesService.getLayouts()
            .subscribe(function (templates) {
            _this.layouts = templates;
        });
    };
    LayoutsTemplateList.prototype.onLayoutClick = function (layout) {
        if (this.selectedItem)
            this.selectedItem.selected = false;
        this.selectedItem = layout;
        this.selectedItem.selected = true;
        this.onselect.emit(this.selectedItem);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LayoutsTemplateList.prototype, "onselect", void 0);
    LayoutsTemplateList = __decorate([
        core_1.Component({
            selector: 'layouts-template-list',
            template: "\n<div>\n                <h4>Templates library</h4>\n                 <div class=\"slider-horizont\">\n                     <div class=\"mycontent\" >\n                            <div  flex layout=\"row\"  class=\"layouts\">\n                                <div *ngFor=\"let layout of layouts\" class=\"layout box-shadow thumb-150\" [class.box-selected]=\"layout.selected\"  (click)=\"onLayoutClick(layout)\">                               \n                                    <img class=\"image\" src=\"{{layout.image}}\"  />\n                                </div>\n                            </div>\n                    </div>\n                </div>\n </div>              \n              ",
            styles: ["\n\n            .slider-horizont{\n                width: 100%;\n                overflow-x: scroll;\n                display: block;\n                background-color: #e7f1ff;\n            }\n            .mycontent{\n                background-color: #e7f1ff;\n                width: 100%;\n                display: block;\n            }\n           \n           .layout {\n                margin: 10px; \n                \n           } \n           .thumb-150{\n                position: relative;\n                width: 156px;\n                height: 156px;\n            }\n           .image{\n               max-width: 150px;\n               max-height: 150px;\n               position:absolute;\n               top:0;\n               bottom: 0;\n               left: 0;\n               right:0;\n               margin:auto;\n           }\n           \n     "]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, layouts_templates_service_1.LayoutsTemlatesService])
    ], LayoutsTemplateList);
    return LayoutsTemplateList;
}());
exports.LayoutsTemplateList = LayoutsTemplateList;
//# sourceMappingURL=layouts-template-list.js.map