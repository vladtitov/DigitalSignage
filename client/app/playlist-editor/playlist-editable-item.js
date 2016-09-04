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
 * Created by Vlad on 7/18/2016.
 */
var core_1 = require("@angular/core");
var models_1 = require("../services/models");
var PlayListItem = (function () {
    function PlayListItem() {
        this.myOpacity = 1;
        this.myWidth = 130;
        this.sellWidth = 130;
        this.onremoveme = new core_1.EventEmitter();
        this.onremovemeDrag = new core_1.EventEmitter();
    }
    PlayListItem.prototype.onDragStart = function (item) {
        this.onremovemeDrag.next(item);
    };
    PlayListItem.prototype.onItemDobleClick = function (item) {
        this.onremoveme.next(item);
    };
    PlayListItem.prototype.setPosition = function (num) {
        if (this.position === num)
            return false;
        return true;
    };
    PlayListItem.prototype.ngOnInit = function () {
        // this.item.position = this.position;
        //  this.id=this.position;
        //  console.log('this.item ', this.item);
        var asset = new models_1.VOAsset(this.item);
        // console.log('asset ', asset);
        if (!asset.duration || isNaN(asset.duration))
            asset.duration = 10;
        switch (asset.type) {
            case 'video':
                var arr = asset.thumb.split(',');
                if (arr.length)
                    this.image = arr[0];
                if (arr.length > 1 && asset.duration > 19)
                    this.image2 = arr[1];
                if (arr.length > 2 && asset.duration > 29)
                    this.image3 = arr[2];
                break;
            case 'image':
                this.image = asset.thumb;
                break;
            default:
                this.image = asset.thumb;
                break;
        }
        if (!this.item.duration)
            this.item.duration = asset.duration;
        this.setDuration(this.item.duration);
        this.id = asset.id;
        this.label = asset.label || 'no label';
    };
    PlayListItem.prototype.setDuration = function (dur) {
        this.item.duration = dur;
        this.myWidth = Math.round(this.sellWidth * this.item.duration / 10);
    };
    PlayListItem.prototype.setOpacity = function (num) {
        this.myOpacity = num;
    };
    // removeMe():void{
    //     VOPlayLists_Assets.removeMe(this.item);
    // }
    PlayListItem.prototype.onImageLoadError = function (evt) {
        console.log(evt);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.VOPlayLists_Assets)
    ], PlayListItem.prototype, "item", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PlayListItem.prototype, "position", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PlayListItem.prototype, "onremoveme", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PlayListItem.prototype, "onremovemeDrag", void 0);
    PlayListItem = __decorate([
        core_1.Component({
            selector: 'playlist-editable-item',
            template: "\n\n\n\n        <div class=\"item\" [style.width.px]=\"myWidth\" [class.selected]=\"item.selected\" [class.hilited]=\"item.hilited\" (dblclick)=\"onItemDobleClick(item)\" (dragstart)=\"onDragStart(item)\" >\n                <div class=\"myid\"><span>{{id}}</span></div>\n                <div class=\"myimage\" [class.pictures]=\"image2\">                \n                \n                            <img src=\"{{image}}\" [class.img1]=\"!image2\" [class.img2]=\"image2\" (onerror)=\"onImageLoadError($event)\">\n                            <img *ngIf=\"image2\" class=\"img2\" src=\"{{image2}}\" width=\"120\">\n                            <img *ngIf=\"image3\" class=\"img2\" src=\"{{image3}}\" width=\"120\">\n                           \n                </div>\n                <div class=\"label\">{{label}}</div>\n        </div>\n",
            styles: ["\n           .item{\n                border-left: 6px solid #e1f5fe;\n                margin-left: -2px;\n                padding:0;               \n                height: 128px;\n                background-color: rgba(225, 193, 193, 0.51);\n                position: relative;\n           }\n           .myimage{\n                overflow: hidden;\n           }\n           .item > .myimage > .img1 {\n                max-width: 120px;\n                max-height: 120px;\n                /*border: 1px solid #c3c3c3;*/\n                position:absolute;\n                top:0;\n                bottom: 0;\n                left: 0;\n                right:0;\n                margin:auto;\n                border-radius: 5px;\n                border: 2px solid #e7f1ff;\n           }           \n           \n            .pictures {\n                display: flex;\n                flex-wrap: wrap;\n                justify-content: center;\n                align-items: center;\n                align-content: center;\n            \n                height: 128px;\n            }\n            .img2 {  \n                max-width: 120px;\n                max-height: 120px;\n                text-align: center;\n                line-height: 120px;        \n                border-radius: 5px;\n                border: 2px solid #e7f1ff;\n                margin: auto;\n            }\n                 \n           .selected{\n                opacity: 0.5;\n           }\n           .hilited{\n                border-left: 6px red solid;\n           }\n           \n           .label{\n               position: absolute;\n               bottom: 0;\n               color: black;\n               background-color: ghostwhite;              \n           }\n         \n"]
        }), 
        __metadata('design:paramtypes', [])
    ], PlayListItem);
    return PlayListItem;
}());
exports.PlayListItem = PlayListItem;
//# sourceMappingURL=playlist-editable-item.js.map