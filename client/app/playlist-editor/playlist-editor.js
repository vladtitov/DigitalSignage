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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var assets_service_1 = require("../services/assets-service");
// // import {ContentFilterPipe} from "../assets/content-filter.pipe";
// import {ContentSearchPipe} from "../assets/content-search.pipe";
// import {AssetCard} from "../assets/asset-card";
var PlayListEditor = (function () {
    function PlayListEditor(assetsSevice, route) {
        this.assetsSevice = assetsSevice;
        this.route = route;
        this.types = ['all', 'video', 'image'];
        this.typevalue = 'all';
        this.searchvalue = "";
        // this.playlistItems =[new VOAsset({})];
    }
    PlayListEditor.prototype.onChange = function (value) {
        this.typevalue = value;
    };
    PlayListEditor.prototype.onSearch = function (value) {
        this.searchvalue = value;
    };
    PlayListEditor.prototype.onPlayListDargLeave = function (evt) {
        // console.log('onPlayListDrag   Leave');
        this.dragEnter = null;
        this.addToCartEnd();
        // console.log(this.enterY,evt.offsetY)
    };
    PlayListEditor.prototype.onPlayListDargEnter = function (evt) {
        // console.log('onPlayListDargEnter');
        if (this.dragItem) {
            this.enterY = evt.offsetY;
            this.addToCart = this.dragItem;
            this.dragEnter = this.dragItem;
            this.dragItem = null;
        }
    };
    PlayListEditor.prototype.onPlayListDargEnterBody = function (evt) {
        //console.log(this.obj)
    };
    PlayListEditor.prototype.onDragStartInner = function (evt) {
        // this.obj = evt;
    };
    PlayListEditor.prototype.ngOnInit = function () {
        this.sub = this.route.params.subscribe(function (params) {
            var id = +params['id']; // (+) converts string 'id' to a number
            //  this.playlistservice.getData(id);
        });
        this.getAssets();
    };
    PlayListEditor.prototype.getAssets = function () {
        var _this = this;
        this.assetsSevice.getData()
            .subscribe(function (data) { return _this.assetslist = data; }, function (error) { return _this.errorMessage = error; });
    };
    PlayListEditor.prototype.onClickItem = function (item) {
        this.fullItem = item;
    };
    PlayListEditor.prototype.hideFullImage = function () {
        this.fullItem = null;
    };
    PlayListEditor.prototype.onDragStart = function (item) {
        // console.log(item);
        this.dragItem = item;
    };
    PlayListEditor.prototype.onDragEnd = function (item) {
    };
    PlayListEditor.prototype.onItemDobleClick = function (item) {
        var _this = this;
        this.addToCart = item;
        setTimeout(function () { return _this.addToCart = null; }, 500);
    };
    PlayListEditor.prototype.onDragOut = function (evt) {
        // if (!this.isMove) this.offCart(this.dragItem);
    };
    PlayListEditor.prototype.addToCartEnd = function () {
        // console.log('addToCartEnd');
        this.addToCart = null;
    };
    PlayListEditor = __decorate([
        core_1.Component({
            selector: 'playlist-editor',
            template: "\n<div>\n            <!--<div class =\"panel panel-default\">-->\n                <div class =\"panel-heading\">\n                    <h3>Playlist</h3>\n                    <div \n                        (dragenter)=\"onPlayListDargEnter($event)\"\n                        (dragleave)=\"onPlayListDargLeave($event)\"\n                    >\n                        <playlist-editable\n                            [playlistid] = \"playlistid\" \n                            [dragEnter]=\"dragEnter\"\n                            (selectInnerEmitter)=\"onDragStartInner($event)\" \n                            [addToCart]=\"addToCart\"\n                            (addToCartEnd)=\"addToCartEnd()\"\n                        ></playlist-editable>\n                    </div>\n                </div>\n                <div class=\"panel-body\">\n                    <h4>Assets</h4>\n                    <div class=\"tools control-group pull-right form-inline\">\n                        <label for=\"types\"><span class=\"fa fa-file-code-o\"></span></label>\n                        <select class=\"form-control\" id=\"types\" #dropdowntype (change)=\"onChange(dropdowntype.value)\">\n                            <option *ngFor=\"let i of types\">{{i}}</option>\n                        </select>\n                        <div class=\"form-group has-feedback has-feedback-left\">\n                            <input type=\"text\" class=\"form-control\" #inputsearch (input)=\"onSearch(inputsearch.value)\">\n                            <i class=\"form-control-feedback fa fa-search\"></i>\n                        </div>\n                    </div>\n                    \n                             \n                    <div class=\"container-scroll\">\n                        <div class=\"myscroll\">\n                            <div class=\"myscroll-content\"> \n                                <div class=\"card\" *ngFor=\"let item of assetslist | contentfilter: typevalue | contentsearch: searchvalue\">\n                                    <asset-card\n                                        [item]=\"item\"                                             \n                                        (dragend)=\"onDragEnd(item)\"\n                                        (dragstart)=\"onDragStart(item)\" \n                                        (dblclick)=\"onItemDobleClick(item)\" \n                                        (click)=\"onClickItem(item)\"\n                                        [size]=\"128\"\n                                    >\n                                    </asset-card>\n                                </div>                          \n                            </div>\n                        </div>\n                    </div>\n                                      \n                    <div class=\"full-image\" *ngIf=\"fullItem\"> \n                        <img src=\" {{ fullItem.img }} \" width=\"200\" (click)=\"hideFullImage()\">\n                    </div>\n                </div>\n            <!--</div>-->\n</div>\n                ",
            styles: ["\n                h4{\n                    display: inline;\n                }\n              \n                .myscroll {\n                    height: 400px;\n                    overflow-y: scroll;\n                    width: 100%;\n                }\n                \n                .myscroll-content{\n                    width: 100%;\n                }\n                \n                .card {\n                    float: left;\n                }\n                \n                .card p {\n                    text-align: center;\n                }\n\n"],
        }), 
        __metadata('design:paramtypes', [assets_service_1.AssetsService, router_1.ActivatedRoute])
    ], PlayListEditor);
    return PlayListEditor;
}());
exports.PlayListEditor = PlayListEditor;
//# sourceMappingURL=playlist-editor.js.map