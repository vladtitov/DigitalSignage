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
 * Created by Dmitriy Prilutsky on 14.07.2016.
 */
//import {DomSanitizationService} from '@angular/platform-browser';
var core_1 = require('@angular/core');
var assets_service_1 = require('../services/assets-service');
var models_1 = require("../services/models");
// import { ContentFilterPipe } from "./content-filter.pipe";
// import { ContentSearchPipe } from "./content-search.pipe";
// import {AssetCard} from "./asset-card";
var asset_service_1 = require("./asset-service");
var AssetLibrary = (function () {
    function AssetLibrary(assetsService //old ???
        , assetService) {
        this.assetsService = assetsService;
        this.assetService = assetService;
        this.onselect = new core_1.EventEmitter();
        this.assets = [];
        this.selected = false;
        this.types = ['all', 'video', 'image'];
        this.typevalue = 'all';
        this.searchvalue = "";
    }
    Object.defineProperty(AssetLibrary.prototype, "changesResult", {
        set: function (evt) {
            this.getAssets();
        },
        enumerable: true,
        configurable: true
    });
    AssetLibrary.prototype.ngOnInit = function () {
        var _this = this;
        this.assetService.assets$.subscribe(function (data) {
            // console.log(data);
            _this.assets = data;
        }, function (err) {
        });
        this.assetService.getAssets();
        this.assetService.selectedAsset$.subscribe(function (asset) {
            // console.log(data);
            _this.currentAsset = asset;
        }, function (err) {
        });
        // this.getData();
    };
    AssetLibrary.prototype.getAssets = function () {
        this.assetService.getAssets();
    };
    AssetLibrary.prototype.onClickItem = function (item) {
        this.assetService.selectAsset(item);
        this.onselect.emit(this.currentAsset);
    };
    AssetLibrary.prototype.onChange = function (value) {
        this.typevalue = value;
    };
    AssetLibrary.prototype.onSearch = function (value) {
        this.searchvalue = value;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AssetLibrary.prototype, "onselect", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.UpdateResult), 
        __metadata('design:paramtypes', [models_1.UpdateResult])
    ], AssetLibrary.prototype, "changesResult", null);
    AssetLibrary = __decorate([
        core_1.Component({
            selector: 'asset-library',
            template: "\n<div>\n                 <div class=\"tools control-group pull-right form-inline\">\n                     <label for=\"types\"><span class=\"fa fa-file-code-o\"></span></label>\n                     <select class=\"form-control\" id=\"types\" #dropdowntype (change)=\"onChange(dropdowntype.value)\">\n                        <option *ngFor=\"let i of types\">{{i}}</option>\n                      </select>\n                      <div class=\"form-group has-feedback has-feedback-left\">\n                          <input type=\"text\" class=\"form-control\" #inputsearch (input)=\"onSearch(inputsearch.value)\">\n                          <i class=\"form-control-feedback fa fa-search\"></i>\n                     </div>\n                 </div>\n                 <div class=\"asset-library\">\n                    <div class=\"myscroll\">\n                        <div class=\"myscroll-content\">                    \n                                \n                             <div class=\"card\" (click)=\"onClickItem(item)\" *ngFor=\"let item of assets | contentfilter: typevalue | contentsearch: searchvalue\">\n                                <asset-card [item]=\"item\" [size]=\"128\"></asset-card>                                              \n                             </div>\n                        \n                        </div>\n                    </div>\n                 </div>\n</div>\n                ",
            styles: ["\n                .tools {\n                    margin-top: -60px;\n                }\n                \n                .myscroll {\n                    height: 450px;\n                    overflow-y: scroll;\n                    width: 100%;\n                }\n                \n                .myscroll-content{\n                    width: 100%;\n                }\n                \n                .card {\n                    float: left;\n                }\n                \n                .card p {\n                    text-align: center;\n                }\n                \n          "],
        }), 
        __metadata('design:paramtypes', [assets_service_1.AssetsService, asset_service_1.AssetService])
    ], AssetLibrary);
    return AssetLibrary;
}());
exports.AssetLibrary = AssetLibrary;
//# sourceMappingURL=asset-library.js.map