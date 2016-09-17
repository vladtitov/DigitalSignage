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
 * Created by Vlad on 7/24/2016.
 */
var core_1 = require("@angular/core");
var models_1 = require("../services/models");
var layouts_list_service_1 = require("./layouts-list-service");
var LayoutsListCards = (function () {
    function LayoutsListCards(listService) {
        this.listService = listService;
        this.onselect = new core_1.EventEmitter();
    }
    Object.defineProperty(LayoutsListCards.prototype, "changesResult", {
        set: function (evt) {
            this.listService.getLayouts();
        },
        enumerable: true,
        configurable: true
    });
    LayoutsListCards.prototype.reload = function () {
    };
    LayoutsListCards.prototype.ngOnInit = function () {
        var _this = this;
        this.listService.layouts$.subscribe(function (data) {
            // console.log(data);
            _this.layouts = data;
        }, function (err) {
        });
        this.listService.getLayouts();
    };
    LayoutsListCards.prototype.onLayoutClick = function (layout) {
        if (this.selectedItem)
            this.selectedItem.selected = false;
        this.selectedItem = layout;
        this.selectedItem.selected = true;
        this.onselect.emit(this.selectedItem);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LayoutsListCards.prototype, "onselect", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.UpdateResult), 
        __metadata('design:paramtypes', [models_1.UpdateResult])
    ], LayoutsListCards.prototype, "changesResult", null);
    LayoutsListCards = __decorate([
        core_1.Component({
            selector: 'layouts-list-cards',
            template: "\n<div>\n\n             <h4>Layouts</h4>\n                 <div class=\"slider-vertical\">\n                     <div class=\"mycontent\" >\n                            <div class=\"layouts\">\n                                <div #mylayout class=\"card-256x320\" *ngFor=\"let layout of layouts\" (click)=\"onLayoutClick(layout)\">                               \n                                    <layout-thumb [layout]=\"layout\" ></layout-thumb>                                                      \n                                </div>\n                            </div>\n                    </div>\n                  </div>\n\n</div>\n",
            styles: ["\n\n    .slider-vertical{\n        overflow-y: scroll;\n        height: 600px;\n        width: 100%;\n    }\n\n\n"]
        }), 
        __metadata('design:paramtypes', [layouts_list_service_1.LayoutsListService])
    ], LayoutsListCards);
    return LayoutsListCards;
}());
exports.LayoutsListCards = LayoutsListCards;
//# sourceMappingURL=layouts-list-cards.js.map