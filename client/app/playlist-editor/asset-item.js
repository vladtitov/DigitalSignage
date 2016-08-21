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
 * Created by Vlad on 7/30/2016.
 */
var core_1 = require("@angular/core");
var models_1 = require("../services/models");
var AssetItem = (function () {
    function AssetItem() {
    }
    AssetItem.prototype.ngOnInit = function () {
        switch (this.item.type) {
            case 'video':
                this.image = this.item.thumb.split(',')[0];
                break;
            case 'image':
                this.image = this.item.thumb;
                break;
            default:
                this.image = this.item.thumb;
                break;
        }
        this.label = this.item.label;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.VOAsset)
    ], AssetItem.prototype, "item", void 0);
    AssetItem = __decorate([
        core_1.Component({
            selector: 'asset-item',
            template: "\n<div class=\"item\">\n            <div class=\"image\">\n                    <img  src=\"{{image}}\" width=\"128px\" />\n            </div>\n            <div>\n            <span>{{label}}</span>\n</div>\n</div>\n\n",
            styles: ["\n.image{\nwidth :128px;\nheight: 128px;\noverflow: hidden;\n}\n.item{\nwidth: 128px;\nheight: 150px;\n\n}\n"]
        }), 
        __metadata('design:paramtypes', [])
    ], AssetItem);
    return AssetItem;
}());
exports.AssetItem = AssetItem;
//# sourceMappingURL=asset-item.js.map