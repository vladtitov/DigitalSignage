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
var PlayListSpacer = (function () {
    function PlayListSpacer() {
        this.width = 40;
    }
    Object.defineProperty(PlayListSpacer.prototype, "item", {
        set: function (item) {
            this._item = item;
            this.thumb = item.thumb;
            this.width = item ? 100 : 40;
        },
        enumerable: true,
        configurable: true
    });
    PlayListSpacer.prototype.ngOnInit = function () {
    };
    PlayListSpacer.prototype.onItemIn = function (item) {
        this.item = item;
        this.width = 128;
    };
    PlayListSpacer.prototype.onItemOut = function () {
        this.item = null;
        this.width = 40;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.VOAsset), 
        __metadata('design:paramtypes', [models_1.VOAsset])
    ], PlayListSpacer.prototype, "item", null);
    PlayListSpacer = __decorate([
        core_1.Component({
            selector: 'playlist-spacer',
            template: "<div class=\"spacer\" [style.width]=\"width\"  >\n                <img src=\"{{thumb}}\"/>\n              </div>\n     ",
            styles: ["\n          .spacer {               \n                height: 128px;\n                border: thin solid gray;\n                transition: width 0.5s;\n                -webkit-transition:width 0.5s;\n           }\n           img{          \n          width: inherit;\n           }\n\n"]
        }), 
        __metadata('design:paramtypes', [])
    ], PlayListSpacer);
    return PlayListSpacer;
}());
exports.PlayListSpacer = PlayListSpacer;
//# sourceMappingURL=PlayListSpacer.js.map