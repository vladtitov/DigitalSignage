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
var PlayListFrame = (function () {
    function PlayListFrame() {
    }
    PlayListFrame.prototype.ngOnInit = function () {
        // var asset:VOAsset = this.item.asset
        // this.image = this.item.thumb
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
        if (!this.item.label)
            this.item.label = this.item.originalname;
        if (this.item)
            this.label = this.item.label; // || 'no label';
        if (this.item)
            this.id = this.item.asset_id;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.VOPlayLists_Assets)
    ], PlayListFrame.prototype, "item", void 0);
    PlayListFrame = __decorate([
        core_1.Component({
            selector: 'playlist-frame',
            template: "\n<div>\n            <div class=\"thumb-128-2\">\n                    <div class=\"image-container-128-2\">\n                        <div class=\"myid\" *ngIf=\"id>0\"><span>{{id}}</span></div>\n                        <img src=\"{{image}}\">\n                        <div class=\"thumb-label\">{{label}}</div>\n                    </div>\n            </div>\n</div>   \n\n\n                <!--<div class=\"frame\">-->\n                    <!--<img src=\" {{ image }} \" width=\"128\" height=\"128\"> -->\n                <!--</div>       -->\n             ",
            styles: ["\n               img {\n                border: 1px solid #0000AA;\n                border-radius: 5px;\n               }\n               \n            "]
        }), 
        __metadata('design:paramtypes', [])
    ], PlayListFrame);
    return PlayListFrame;
}());
exports.PlayListFrame = PlayListFrame;
//# sourceMappingURL=playlist-frame.js.map