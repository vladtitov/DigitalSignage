/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
// import { AssetEditor} from "./asset-editor";
// import {AssetLibrary} from "./asset-library";
var asset_service_1 = require("./asset-service");
// import {PlayListService} from "../playlist-editor/playlist-service";
var ContentManager = (function () {
    function ContentManager(ar, router, assetService) {
        this.ar = ar;
        this.router = router;
        this.assetService = assetService;
        this.selectedIndex = 0;
        this.isAddContent = false;
    }
    ContentManager.prototype.ngOnInit = function () {
        var _this = this;
        this.isAddContent = false;
        this.paramsSub = this.ar.params.subscribe(function (params) {
            // console.log('currentAsset ', this.currentAsset);
            if (!_this.currentAsset)
                _this.toolsDisadled = true;
            // this.toolsDisadled = true;
            _this.isAddContent = false;
            _this.editorVisible = false;
            switch (params['type']) {
                case "add":
                    _this.isAddContent = true;
                    break;
                case "edit":
                    if (_this.currentAsset)
                        _this.editorVisible = true;
                    break;
                case "remove":
                    _this.isAddContent = false;
                    break;
            }
        });
        this.assetService.selectedAsset$.subscribe(function (asset) {
            // console.log(data);
            _this.currentAsset = asset;
            _this.toolsDisadled = asset.selected ? false : true;
            // console.log('this.toolsDisadled ', this.toolsDisadled);
        }, function (err) {
        });
        /*        this.router.navigate(['./files']);*/
    };
    ContentManager.prototype.ngOnDestroy = function () {
        this.paramsSub.unsubscribe();
    };
    ContentManager.prototype.onHided = function () {
        this.isHide = true;
    };
    ContentManager.prototype.onShowed = function () {
        this.isHide = false;
    };
    ContentManager.prototype.onModalClose = function () {
        this.isAddContent = false;
        this.router.navigate(["./content-manager", 'view', 0]);
        this.assetService.getAssets();
        console.log('currentAsset ', this.currentAsset);
    };
    ContentManager.prototype.onUpload = function () {
        this.assetService.getAssets();
    };
    ContentManager.prototype.onAddAsset = function () {
        this.router.navigate(["./content-manager", "add", "files"]);
    };
    ContentManager.prototype.onEditAsset = function () {
        if (this.currentAsset && this.currentAsset.id)
            this.router.navigate(["./content-manager", "edit", this.currentAsset.id]);
    };
    ContentManager.prototype.onDeleteAsset = function () {
        var _this = this;
        var strLabels;
        if (this.currentAsset.usedPlayList && this.currentAsset.usedPlayList.length) {
            var labelArr = this.currentAsset.usedPlayList.map(function (item) {
                return item.label;
            });
            strLabels = labelArr.join(', ');
        }
        else {
            strLabels = 'no playlists';
        }
        if (this.currentAsset && confirm('You want to delete asset "' + this.currentAsset.label + '"?\n' +
            'Used playlists: ' + strLabels)) {
            this.assetService.deleteAssetById(this.currentAsset.id)
                .subscribe(function (res) {
                _this.changesResult = res;
                _this.currentAsset = null;
                _this.toolsDisadled = true;
                console.log('this.changesResult ', _this.changesResult);
                console.log('this.currentAsset', _this.currentAsset);
            }, function (err) { return _this.error = err; });
        }
    };
    ContentManager.prototype.onLibrarySelect = function (evt) {
        // this.toolsDisadled = evt ? false : true;
        // console.log('onLibrarySelect ', evt);
        this.currentAsset = evt;
        this.assetService.getUsedPlayList(evt)
            .subscribe(function (asset) {
            evt.usedPlayList = asset.usedPlayList;
        });
    };
    ContentManager = __decorate([
        core_1.Component({
            selector: 'content-manager',
            template: "\n<div>               \n                 <div class =\"panel-heading\">\n                  <h3>Content manager</h3>\n                    <nav>\n                             <a class=\"btn btn-default\" (click)=\"onAddAsset()\"><span class=\"fa fa-plus\"></span> Add Content</a>\n                             <a class=\"btn btn-default\" [class.disabled]=\"toolsDisadled\" (click)=\"onEditAsset()\"> <span class=\"fa fa-edit\"></span> Edit Content</a>\n                             <a class=\"btn btn-default\" [class.disabled]=\"toolsDisadled\" (click)=\"onDeleteAsset()\"><span class=\"fa fa-minus\"></span> Delete Content</a>\n                    </nav>\n                 </div>\n                 <div class=\"panel-body\">\n                     <asset-library #assetLibrary [changesResult]=\"changesResult\" (onselect)=\"onLibrarySelect($event)\"></asset-library>\n                     <asset-editor *ngIf=\"editorVisible\" #assetEditor [_currentAsset]=\"currentAsset\"></asset-editor>\n                </div>\n                \n                \n                <div *ngIf=\"isAddContent\">\n                    <div id=\"myModal\" class=\"modal\" role=\"dialog\">\n                        <div class=\"modal-dialog\">\n                            <div class=\"modal-content\">\n                                <div class=\"modal-header\">\n                                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" (click)=\"onModalClose()\">&times;</button>\n                                    <h4 class=\"modal-title\">Add content</h4>\n                                </div>\n                                    <div class=\"modal-body\">\n                                        <add-content \n                                            (hided)=\"onHided()\"\n                                            (showed)=\"onShowed()\"\n                                            (closed)=\"onModalClose()\"\n                                            (changed)=\"onUpload()\">\n                                        </add-content>\n                                    </div>\n                              <div class=\"modal-footer\">\n                                    \n                              </div>\n                            </div>\n                            <div *ngIf=\"isHide\" class=\"shadow\"></div>\n                        </div>\n                    </div>\n                </div>\n</div>\n                ",
            styles: ["\n                .modal {\n                    display: block;\n                    background-color: rgba(0, 0, 0, 0.31);\n                }\n                \n                .modal-header {\n                    text-align: center;\n                }\n                \n                .modal-content {\n                    width: 500px;\n                }\n                \n                .shadow {\n                    position: absolute;\n                    background-color: rgba(0, 0, 0, 0.11);\n                    width: 500px;\n                    height: 120px;\n                    top:0;\n                }\n            "],
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, asset_service_1.AssetService])
    ], ContentManager);
    return ContentManager;
}());
exports.ContentManager = ContentManager;
//# sourceMappingURL=content-manager.js.map