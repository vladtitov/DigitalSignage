/**
 * Created by Dmitriy Prilutsky on 14.07.2016.
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
var asset_service_1 = require("./asset-service");
var router_1 = require("@angular/router");
// import {AssetCard} from "./asset-card";
// import {MY_DIRECTIVES} from "../app.directives";
var AssetEditor = (function () {
    function AssetEditor(assetService, route, router) {
        this.assetService = assetService;
        this.route = route;
        this.router = router;
        this.isInProgress = false;
    }
    Object.defineProperty(AssetEditor.prototype, "_currentAsset", {
        set: function (item) {
            if (!item)
                return;
            // console.log('item ', item);
            this.currentAsset = item;
            this.itemLabel = item.label;
        },
        enumerable: true,
        configurable: true
    });
    ;
    AssetEditor.prototype.ngOnInit = function () {
        var _this = this;
        this.assetService.selectedAsset$.subscribe(function (asset) {
            // console.log(data);
            _this.currentAsset = asset;
        }, function (err) {
        });
        // this.sub = this.route.params.subscribe(params => {
        //     let id = +params['id']; // (+) converts string 'id' to a number
        //
        //     if (params["type"] == "edit") this.assetService.getItemById(id)
        //         .subscribe(
        //             (res:VOAsset)=> {
        //                 console.log('res ', res);
        //                  // this.currentAsset = res;
        //             },
        //             error => this.errorMessage = <any>error);
        // });
    };
    AssetEditor.prototype.saveAsset = function (name, description) {
        var _this = this;
        // this.currentAsset.label = this.itemLabel;
        if (!name) {
            this.showTooltip('red', 'Error: name is empty');
            return;
        }
        this.isInProgress = true;
        var oldName = this.currentAsset.label;
        var oldDescription = this.currentAsset.description;
        this.currentAsset.label = name;
        this.currentAsset.description = description;
        this.assetService.saveItem(this.currentAsset)
            .subscribe(function (res) {
            if (res && res.changes) {
                // this.showSuccess();
                _this.currentAsset.label = _this.itemLabel;
                _this.showTooltip('green', 'Success');
                _this.isInProgress = false;
            }
            else {
                // this.showError();
                _this.currentAsset.label = oldName;
                _this.currentAsset.description = oldDescription;
                _this.showTooltip('red', 'Error');
                _this.isInProgress = false;
            }
        }, function (error) {
            _this.currentAsset.label = oldName;
            _this.currentAsset.description = oldDescription;
            _this.showTooltip('red', 'Error');
            _this.isInProgress = false;
            _this.errorMessage = error;
        });
    };
    AssetEditor.prototype.hideEdit = function () {
        //this.fullItem.selected = false;
        this.router.navigate(["./content-manager", 'view', 0]);
        // this.router.navigate(["./content-manager",'hideEditor',0]);
    };
    AssetEditor.prototype.showTooltip = function (color, message) {
        var _this = this;
        this.color = color;
        this.tooltipMessage = message;
        // if(color == 'green') this.tooltipMessage = 'Success';
        // else this.tooltipMessage = 'Error';
        setTimeout(function () {
            _this.tooltipMessage = '';
        }, 3000);
    };
    // showSuccess () {
    //     this.color = 'green';
    //     this.success = true;
    //     this.isTooltip = true;
    //     this.tooltipMessage = 'success';
    //     this.disableSave ();
    // }
    //
    // showError () {
    //     this.color = 'red';
    //     this.error = true;
    //     this.isTooltip = true;
    //     this.tooltipMessage = 'error';
    //     this.disableSave ();
    // }
    //
    // disableSave () {
    //     this.disabled = true;
    //     setTimeout( ()=> {
    //         this.success = false;
    //         this.error = false;
    //         this.disabled = false;
    //         this.isTooltip = false;
    //     }, 3000)
    // }
    AssetEditor.prototype.onEditClick = function () {
        //this.fullItem = this.currentItem;
        this.router.navigate(["./content-manager", "edit", this.currentAsset.id]);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AssetEditor.prototype, "_currentAsset", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AssetEditor.prototype, "typevalue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AssetEditor.prototype, "searchvalue", void 0);
    AssetEditor = __decorate([
        core_1.Component({
            selector: 'asset-editor',
            template: "\n<div>\n               \n            <div class=\"full-image\" >\n                <div id=\"myModal\" class=\"modal\" role=\"dialog\">\n                    <div class=\"modal-dialog\">\n                        <div class=\"modal-content\" *ngIf=\"currentAsset\">\n                        \n                            <div class=\"modal-header\">\n                                <p>Edit name</p>\n                                <button type=\"button\" class=\"close\" data-dismiss=\"modal\"(click)=\"hideEdit()\">&times;</button>  \n                            </div>\n                            \n                            <div class=\"modal-body\">\n                                <input \n                                    type=\"text\"\n                                    class=\"form-control\"\n                                    placeholder=\"Content name\"\n                                    [(ngModel)]=\"itemLabel\"\n                                    #inputItem>\n                                <div class=\"text-center\">\n                                    <div class=\"card-256\">\n                                        <asset-card [item]=\"currentAsset\" [size]=\"256\"></asset-card>\n                                    </div>\n                                </div>\n                                <!--<p>Duration: {{ currentAsset.duration }} </p>-->\n                                <p>Size: {{ currentAsset.height }} x {{ currentAsset.width }}</p>\n                                <textarea\n                                    class=\"form-control\"\n                                    name=\"comment\"\n                                    cols=\"50\"\n                                    rows=\"2\"\n                                    #textareaItem >{{ currentAsset.description }}</textarea>\n                            </div>\n                            \n                            <div class=\"modal-footer\">\n                                <!--<span *ngIf=\"success\" class=\"msg success\">Success</span>-->\n                                <!--<span *ngIf=\"error\" class=\"msg error\">Error</span>-->\n\n                                <button\n                                    type=\"button\"\n                                    class=\"btn btn-primary save\"\n                                    [class.disabled]=\"isInProgress\"\n                                    (click)=\"saveAsset(inputItem.value, textareaItem.value)\"\n                                    [ng2-md-tooltip]=\"tooltipMessage\" placement=\"right\" [tooltipColor]=\"color\"\n                                    >\n                                    Save on server\n                                </button>\n                                <!--<div class=\"mytooltip\">-->\n                                    <!--<span -->\n                                        <!--class=\"tooltiptext\"-->\n                                        <!--[ng-tooltip]=\"tooltipMessage\"-->\n                                        <!--[isTooltip]=\"isTooltip\">-->\n                                        <!--{{tooltipMessage}}-->\n                                    <!--</span>-->\n                                <!--</div>-->\n                                <button type=\"button\" class=\"btn btn-default clos pull-right\" data-dismiss=\"modal\"(click)=\"hideEdit()\">Close</button> \n                            </div>\n                        </div>\n                    </div>   \n                </div>\n            </div>\n</div>              \n              ",
            styles: ["\n                .text-center > .card-256 {\n                    margin: auto;\n                }\n                .full-image {\n                    position: absolute;\n                    top: 200px;\n                    left: 200px;\n                    background-color: #ffe3c5;\n                    border: 1px solid black;\n                }\n                \n                .myscroll {\n                    height: 700px;\n                    overflow-y: scroll;\n                    width: 100%;\n                }\n                \n                .myscroll-content{\n                    width: 100%;\n                }\n                \n                .card {\n                    height: 128px;\n                    width: 128px;\n                    float: left;\n                    overflow: hidden;\n                    word-wrap: break-word;\n                }\n                \n                .selected {\n                    border: 1px solid red;\n                }\n                \n                .modal {\n                    display: block;\n                    background-color: rgba(0, 0, 0, 0.31);\n                }\n                \n                .modal-header {\n                    padding-bottom: 0px;\n                }\n                \n                .modal-content {\n                    width: 600px;\n                    height: 630px;\n                }\n                \n                .modal-footer {\n                    text-align: start;\n                }\n                \n                input {\n                    margin-bottom: 10px;\n                }\n                \n                p {\n                    width: 90%;\n                    display: inline-block;\n                    margin-bottom: 20px;\n                }\n                \n                .msg {\n                    padding: 5px;\n                    position: absolute;\n                    left: 10px;\n                    bottom: 60px;\n                    z-index: 99;\n                    margin-left: 0;\n                    width: 70px;\n                    text-align: center;\n                    border-radius: 5px 5px;\n                    color: #000;\n                }\n                \n                .success {\n                    background: #FFFFAA; border: 1px solid #FFAD33;\n                }\n                \n                .error {\n                    background: #FFCCAA; border: 1px solid #FF3334;\n                }\n                \n                .disabled {\n                    pointer-events:none;\n                    opacity: 0.5;\n                }\n                \n              "]
        }), 
        __metadata('design:paramtypes', [asset_service_1.AssetService, router_1.ActivatedRoute, router_1.Router])
    ], AssetEditor);
    return AssetEditor;
}());
exports.AssetEditor = AssetEditor;
//# sourceMappingURL=asset-editor.js.map