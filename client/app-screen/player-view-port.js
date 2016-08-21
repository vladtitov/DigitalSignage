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
 * Created by Vlad on 8/2/2016.
 */
var core_1 = require("@angular/core");
var models_1 = require("../app/services/models");
var palyer_lite_1 = require("./palyer-lite");
var PlayerViewPort = (function () {
    function PlayerViewPort() {
    }
    PlayerViewPort.prototype.ngOnInit = function () {
        console.log(this.myviewport);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.VOViewport)
    ], PlayerViewPort.prototype, "myviewport", void 0);
    PlayerViewPort = __decorate([
        core_1.Component({
            selector: 'player-view-port',
            template: "\n<div class=\"pos-absolute player-view-port\"\n                 [style.top]=myviewport.y \n                 [style.left]=myviewport.x \n                 [style.width]=myviewport.width \n                 [style.height]=myviewport.height\n                 >\n                 <player-lite [playlist_id]=\"myviewport.playlist_id \"  ></player-lite>     \n</div>\n",
            directives: [palyer_lite_1.PlayerLite]
        }), 
        __metadata('design:paramtypes', [])
    ], PlayerViewPort);
    return PlayerViewPort;
}());
exports.PlayerViewPort = PlayerViewPort;
//# sourceMappingURL=player-view-port.js.map