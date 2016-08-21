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
var models_1 = require("../app/services/models");
var device_service_1 = require("./services/device-service");
var PlayerLite = (function () {
    function PlayerLite(deviceService) {
        this.deviceService = deviceService;
        this.playlist = new models_1.VOPlaylist({});
        this.current = 0;
    }
    PlayerLite.prototype.ngOnInit = function () {
        var _this = this;
        if (this.playlist_id)
            this.deviceService.getPlaylist((this.playlist_id)).subscribe(function (playlist) {
                _this.playlist = playlist;
                _this.playliasItes = playlist.list;
                _this.startPlay();
                _this.playNext();
            });
        // this.service.getPlaylist(this.playerid).subscribe(data=>this._data=data, err=>this._error = err);
    };
    PlayerLite.prototype.startPlay = function () {
        var _this = this;
        this.myInterval = setInterval(function () { return _this.onTick(); }, 10000);
    };
    PlayerLite.prototype.stopPlay = function () {
        clearInterval(this.myInterval);
    };
    ;
    PlayerLite.prototype.onTick = function () {
        this.playNext();
    };
    PlayerLite.prototype.onPlayListEnd = function () {
        this.current = 0;
    };
    PlayerLite.prototype.onPlayListStart = function () {
    };
    PlayerLite.prototype.playNext = function () {
        this.current++;
        if (this.current >= this.playliasItes.length) {
            this.onPlayListEnd();
        }
        this.currentItem = this.playliasItes[this.current];
        this.playCurrentItem();
    };
    PlayerLite.prototype.playCurrentItem = function () {
        var item = this.currentItem;
        console.log(item.path);
        switch (item.type) {
            case 'image':
                this.currentImage = item.path;
                break;
            case 'video':
                this.currentImage = null;
                this.currentVideo = item.path;
                this.stopPlay();
                break;
            default:
                this.currentImage = item.path;
                break;
        }
        console.log(this.currentImage, this.currentVideo);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PlayerLite.prototype, "playlist_id", void 0);
    PlayerLite = __decorate([
        core_1.Component({
            selector: 'player-lite',
            template: "\n        <h2>Player Lite id {{playlist.props.label}}</h2>       \n         <h2>Screen {{screenid}}</h2> \n         <div *ngIf=\"currentImage\">\n            <img  src=\"{{currentImage}}\" />\n        </div>\n               <div *ngIf=\"currentVideo\" >\n               <video width=\"1280\" height=\"720\" autoplay>\n                    <source src=\"{{currentVideo}}\" type=\"video/mp4\">                               \n                </video>\n                </div>\n    ",
            providers: []
        }), 
        __metadata('design:paramtypes', [device_service_1.DeviceService])
    ], PlayerLite);
    return PlayerLite;
}());
exports.PlayerLite = PlayerLite;
//# sourceMappingURL=palyer-lite.js.map