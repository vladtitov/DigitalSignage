/**
 * Created by Dmitriy Prilutsky on 30.07.2016.
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
var core_1 = require("@angular/core");
var models_1 = require("../services/models");
var AssetCard = (function () {
    function AssetCard() {
    }
    AssetCard.prototype.ngOnInit = function () {
        if (!this.item.label)
            this.item.label = this.item.originalname;
        switch (this.item.type) {
            case 'video':
                if (this.item.thumb)
                    this.image = this.item.thumb.split(',')[0];
                this.duration = this.item.duration;
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
    ], AssetCard.prototype, "item", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AssetCard.prototype, "size", void 0);
    AssetCard = __decorate([
        core_1.Component({
            selector: 'asset-card',
            template: "\n<div>\n            <div class=\"card-{{size}}\">\n                <div class=\"thumb-{{size}}\" [class.selected]=\"item.selected\">\n                    <div class=\"image-container-{{size}}\">\n                            <img class=\"image-{{size}}\" src=\"{{image}}\" />\n                    </div>\n                    <div class=\"myid\"><span>{{item.id}}</span></div>\n                    <div class=\"info pos-bottom\">\n                        <div class=\"deviceText-{{size}}\"><span>{{item.label}}</span></div>\n                        <div class=\"deviceText-{{size}}\" *ngIf=\"duration\">Duration: <span>{{duration}}</span></div>\n                    </div>\n                </div>\n            </div>\n</div>    \n              ",
            styles: ["                \n                .selected {\n                    border: 2px solid red;\n                }\n                \n                img {\n                    display: block;\n                    margin: 0 auto;\n                }\n                \n              "]
        }), 
        __metadata('design:paramtypes', [])
    ], AssetCard);
    return AssetCard;
}());
exports.AssetCard = AssetCard;
//# sourceMappingURL=asset-card.js.map