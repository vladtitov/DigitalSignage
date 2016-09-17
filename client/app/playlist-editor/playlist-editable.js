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
var playlist_service_1 = require("./playlist-service");
// import {PlayListSpacer} from "./PlayListSpacer";
var router_1 = require('@angular/router');
var router_2 = require('@angular/router');
var TimeCell_1 = require("./TimeCell");
var PlaylistEditable = (function () {
    function PlaylistEditable(playlistservice, route, router) {
        this.playlistservice = playlistservice;
        this.route = route;
        this.router = router;
        this.isMove = false;
        this.addToCartEnd = new core_1.EventEmitter();
        this.playlistBaseUrl = window.location.protocol + '//' + window.location.host + '/playlist-preview/assets/';
        this.playlistProps = new models_1.VOPlayListProps({});
        this.isInProgress = false;
        this.selectInnerEmitter = new core_1.EventEmitter();
    }
    Object.defineProperty(PlaylistEditable.prototype, "dragEnter", {
        set: function (item) {
            // console.log(item);
            //  if(item)this.selectedItem = new VOPlayLists_Assets({item,position:-1})
            if (item)
                this.selectedItem = new models_1.VOPlayLists_Assets(item);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaylistEditable.prototype, "addToCart", {
        set: function (item) {
            this.addAssetToCollection(item);
        },
        enumerable: true,
        configurable: true
    });
    ;
    PlaylistEditable.prototype.onremovemeDrag = function (item) {
        this.selectInnerEmitter.next(item);
    };
    PlaylistEditable.prototype.onPreview = function () {
        var assets = this.playlistItems.map(function (item) {
            return item.id;
        });
        this.playlistPreviewUrl = this.playlistBaseUrl + assets.join(',');
        console.log('assets', assets);
        console.log('playlistPreviewUrl', this.playlistPreviewUrl);
        window.open(this.playlistPreviewUrl, "_blank");
    };
    PlaylistEditable.prototype.calculateDuration = function () {
        if (!this.playlist)
            return;
        var total = 0;
        this.playlistItems.forEach(function (item) {
            total += item.lasting;
        });
        this.playlistProps.duration = total;
        if (!total)
            this.previewShow = false;
        // console.log('total', total);
    };
    PlaylistEditable.prototype.createCover = function () {
        if (!this.playlist.list.length)
            return;
        // console.log('this.playlist', this.playlist);
        var cover;
        var image;
        this.playlistItems.forEach(function (item) {
            if (item.isCover)
                cover = item;
        });
        if (!cover) {
            cover = this.playlistItems[0];
        }
        switch (cover.type) {
            case 'image':
                image = cover.path;
                break;
            case 'video':
                image = cover.thumb.split(',')[0];
                break;
            default:
                image = cover.path;
                break;
        }
        this.playlistProps.image = image;
    };
    PlaylistEditable.prototype.saveOnServer = function () {
        var _this = this;
        //console.log(this.playlistProps)
        this.saveTooltip = null;
        this.isInProgress = true;
        this.calculateDuration();
        this.createCover();
        this.playlistservice.saveDataOnServer()
            .subscribe(function (result) {
            console.log('save: ', result);
            _this.isInProgress = false;
            _this.saveTooltip = { message: 'Playlist saved on server', tooltip_class: 'btn-success' };
            if (result.insertId) {
                // console.log('save: ', result);
                _this.router.navigate(['./playlist-editor', result.insertId]);
                _this.toolsDisadled = false;
            }
        }, function (error) {
            _this.isInProgress = false;
            _this.saveTooltip = { message: 'Server error', tooltip_class: 'btn-danger' };
            // this.showTooltip('red', 'Error');
        });
        // this.getDataFromServer();
    };
    // showTooltip(color:string, message:string){
    //     this.color = color;
    //     this.tooltipMessage = message;
    //     setTimeout(()=>{
    //         this.tooltipMessage = '';
    //     }, 3000);
    // }
    PlaylistEditable.prototype.onItemDragend = function (evt) {
    };
    PlaylistEditable.prototype.ngOnInit = function () {
        var _this = this;
        var ar = [];
        for (var i = 0; i < 20; i++) {
            ar.push(new TimeCell_1.TimeCellVO(i));
        }
        this.timeCells = ar;
        this.playlistservice.currentItem$.subscribe(function (item) {
            _this.playlist = item;
            _this.playlistItems = _this.playlist.list;
            _this.playlistProps = item.props;
        }, function (error) { alert(error.toString()); });
        this.sub = this.route.params.subscribe(function (params) {
            var id = +params['id']; // (+) converts string 'id' to a number
            if (id == -1) {
                _this.previewShow = false;
                _this.toolsDisadled = true;
            }
            else {
                _this.previewShow = true;
            }
            // console.log(params);
            if (!isNaN(id))
                _this.playlistservice.getData(id);
        });
    };
    PlaylistEditable.prototype.savePlayList = function () {
        this.playlistservice.saveData();
    };
    PlaylistEditable.prototype.createPlayList = function () {
        if (this.route.params['id'] == '-1')
            window.location.reload();
        else
            this.router.navigate(['playlist-editor', -1]);
    };
    PlaylistEditable.prototype.deletePlayList = function () {
        var _this = this;
        this.deleteTooltip = null;
        if (this.playlist && confirm('You want to delete Playlist ' + this.playlist.props.label + '?')) {
            this.playlistservice.daletePlaylist(this.playlist.props.id)
                .subscribe(function (result) {
                if (result.changes) {
                    _this.deleteTooltip = { message: 'PlayList deleted from database!', tooltip_class: 'btn-success' };
                    _this.createPlayList();
                }
                else {
                    _this.deleteTooltip = { tooltip_class: 'btn-danger', message: 'Error to delete playList' };
                    _this.toolsDisadled = false;
                }
            }, function (error) {
                _this.deleteTooltip = { message: 'Server error', tooltip_class: 'btn-danger' };
                _this.toolsDisadled = false;
            });
        }
    };
    PlaylistEditable.prototype.onPlayListDargEnter = function (evt) {
        //  console.log(evt);
    };
    PlaylistEditable.prototype.inserAt = function (item, ind) {
        var oldIndex = this.playlistItems.indexOf(item);
        if (oldIndex === ind)
            return;
        if (oldIndex !== -1)
            this.playlistItems.splice(oldIndex, 1);
        this.playlistItems.splice(ind, 0, item);
        var i = 0;
        this.playlistItems.forEach(function (item) {
            item.position = i++;
        });
    };
    PlaylistEditable.prototype.resetHilited = function () {
        if (this.hilitedItem)
            this.hilitedItem.hilited = false;
        this.hilitedItem = null;
    };
    PlaylistEditable.prototype.resetSelected = function () {
        if (this.selectedItem)
            this.selectedItem.selected = false;
        this.selectedItem = null;
    };
    PlaylistEditable.prototype.hilite = function (item) {
        if (this.hilitedItem && this.hilitedItem.position === item.position)
            return;
        this.resetHilited();
        this.hilitedItem = item;
        this.hilitedItem.hilited = true;
    };
    PlaylistEditable.prototype.insertBeforeHilited = function () {
        this.inserAt(this.selectedItem, this.playlistItems.indexOf(this.hilitedItem));
    };
    PlaylistEditable.prototype.onItemDragOver = function (evt, item) {
        if (!this.selectedItem)
            return;
        /*   if(this.dragEnter){
               var vo:VOPlayLists_Assets = new VOPlayLists_Assets({asset:this.dragEnter,id:this.playlistItems.length});
               this.inserAt(vo,item.position);
               this.dragEnter = null;
               this.selectedItem = null;
   
               return
           }*/
        if (item.position == this.selectedItem.position) {
            this.resetHilited();
            return;
        }
        if (evt.offsetX < 20) {
            this.hilite(item);
        }
        else if (evt.offsetX > 100) {
        }
    };
    PlaylistEditable.prototype.addAssetToCollection = function (item) {
        // console.log('addAssetToCollection');
        if (!item)
            return;
        // console.log('item id', item.id);
        // var vo:VOPlayLists_Assets = new VOPlayLists_Assets({item,position:this.playlistItems.length});
        var vo = new models_1.VOPlayLists_Assets(item);
        // console.log('vo', vo.lasting);
        if (!vo.lasting)
            vo.lasting = 10;
        this.selectedItem = vo;
        // console.log('playlistItems', this.playlistItems);
        if (!this.playlistItems)
            this.playlistItems = [];
        this.playlistItems.push(vo);
        // console.log('VO ', vo);
        // console.log('this.selectedItem ', this.selectedItem);
        // console.log('this.playlistItems ', this.playlistItems);
        this.calculateDuration();
        this.previewShow = true;
        // this.addToCartEnd.emit(null);
    };
    PlaylistEditable.prototype.onDragEnd = function (evt, item) {
        var d = evt.screenY - this.startY;
        if (d > 200)
            this.removeItemFromCart(item);
        this.insertBeforeHilited();
        this.resetHilited();
        this.resetSelected();
    };
    PlaylistEditable.prototype.removeItemFromCart = function (item) {
        var ind = this.playlistItems.indexOf(item);
        if (ind !== -1) {
            this.playlistItems.splice(ind, 1);
            this.calculateDuration();
        }
    };
    PlaylistEditable.prototype.onDragItemStart = function (evt, item, view) {
        this.dragEnter = null;
        this.resetSelected();
        this.selectedItem = item;
        this.selectedItem.selected = true;
        this.startY = evt.screenY;
    };
    PlaylistEditable.prototype.onDragItemEnd = function (item) {
    };
    PlaylistEditable.prototype.onDragOut = function (evt) {
        //var spacer:PlayListSpacer = <any>evt.target;
        // var spacer = <any>evt.target;
        // var itemId = spacer.getAttribute("item-id");
        // if(itemId)
        // this.service.deleteItem(+itemId);
        // console.log('onDragOut ',evt,spacer.getAttribute("item-id"));
    };
    PlaylistEditable.prototype.insertToCardAt = function (item, i) {
        /*   console.log(item, i, this.isMove);
           if (item && i !== -1) {
               if (this.isMove) {
                   console.log(22)
   
                   let index:number = this.playlistItems.indexOf(item);
                   if (index > -1) {
                       this.playlistItems.splice(index,1);
                   }
                   this.playlistItems.splice(i + 1, 0, item);
               }
               else {
                   if (i === (this.playlistItems.length - 1) ){
                       this.playlistItems.push(item);
                       this.service.addItem(1, item.id, i, 10).subscribe(
                           (res)=>{
                               console.log(res);
                           },
                           error =>  this.errorMessage = <any>error);
                   }
                   else this.playlistItems.splice(i + 1, 0, item);
   
               }
               if (!this.isMove) this.dragItem = null;
   
           }*/
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PlaylistEditable.prototype, "playlistid", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.VOAsset), 
        __metadata('design:paramtypes', [models_1.VOAsset])
    ], PlaylistEditable.prototype, "dragEnter", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Boolean)
    ], PlaylistEditable.prototype, "isMove", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.VOAsset), 
        __metadata('design:paramtypes', [models_1.VOAsset])
    ], PlaylistEditable.prototype, "addToCart", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PlaylistEditable.prototype, "addToCartEnd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PlaylistEditable.prototype, "selectInnerEmitter", void 0);
    PlaylistEditable = __decorate([
        core_1.Component({
            selector: 'playlist-editable',
            template: "\n<div>       \n            \n            <a class=\"btn btn-default\" (click)=\"createPlayList()\"><span class=\"fa fa-plus\"> </span> Create New</a>\n            <a class=\"btn btn-default\" (click)=\"deletePlayList()\" [class.disabled]=\"toolsDisadled\" [ng2-md-tooltip]=\"deleteTooltip\">\n                <span class=\"fa fa-remove\"></span> Delete</a>             \n            <a class=\"btn btn-default\" (click)=\"saveOnServer()\" [class.disabled]=\"isInProgress\" [ng2-md-tooltip]=\"saveTooltip\" style=\"margin-right: 100px\">\n                <span class=\"fa fa-life-saver\"></span> Save on Server</a>\n                    \n            <small *ngIf=\"playlistProps.id>0\" style=\"margin-right: 10px\">ID: {{playlistProps.id}};</small>\n            <label class=\"PNameLabel\" for=\"PName\">Playlist Name</label>\n            <input id=\"PName\" type=\"text\" [(ngModel)]=\"playlistProps.label\" name=\"plalistname\"/>\n            \n            <span> Duration:</span><span>{{playlistProps.duration}}</span>\n            \n            <a class=\"previewUrl\" *ngIf=\"previewShow\" target=\"_blank\" (click)=\"onPreview()\"><span class=\"fa fa-eye\"></span> Preview</a>\n            \n            <div class=\"pl-container\">\n                <div class=\"pl-content\" >\n                    <div class=\"timeline\" flex layout=\"row\" >\n                        <div *ngFor=\"let mytime of timeCells\">\n                            <time-cell [timecell]=\"mytime\" ></time-cell>\n                        </div>                 \n                    </div>\n                    <div flex layout=\"row\"  class = \"cart\" (dragend)=\"onItemDragend(item)\">\n                        <div class=\"item\"  *ngFor=\"let item of playlistItems; let i = index\" layout=\"row\"  (dragend)=\"onDragItemEnd($event, item)\">\n                            <div>                                                        \n                                <playlist-editable-item\n                                    [item]=\"item\" [position]=\"i\" #myitem                               \n                                    (dragmove)=\"onDragMove($event,item)\"\n                                    (dragend)=\"onDragEnd($event,item)\" \n                                    (onremovemeDrag)=\"onremovemeDrag($event)\"\n                                    (dragstart)=\"onDragItemStart($event,item,myitem)\" \n                                    (dragover)=\"onItemDragOver($event,item)\"                                                       \n                                ></playlist-editable-item>\n                            </div>\n                        </div>\n                        <div id=\"emtyline\">\n                                                               \n                        </div>\n                    </div>\n                </div>\n            </div>\n</div>\n",
            styles: ["\n            .pl-container{\n                width: 100%;\n                min-height: 170px;\n                overflow-x: scroll;\n                display: block;\n                background-color: #e7f1ff;\n                margin-top: 10px;\n            }\n            .pl-content{\n                background-color: #e7f1ff;\n                width: 100%;\n                display: block;\n            }\n            .title{\n            \n            }\n            .PNameLabel{\n\n            }\n            time-cell{\n                width: 128px;\n                height: 20px;\n                background-color: #0000AA;\n                color: white;                \n            }\n            .previewUrl{\n                float: right;\n                margin-top: 6px;\n            }\n            a {\n                cursor: pointer;\n            }\n                \n"],
            // directives:[PlayListItem,PlayListSpacer,TimeCellCompnent],
            providers: [playlist_service_1.PlayListService]
        }), 
        __metadata('design:paramtypes', [playlist_service_1.PlayListService, router_2.ActivatedRoute, router_1.Router])
    ], PlaylistEditable);
    return PlaylistEditable;
}());
exports.PlaylistEditable = PlaylistEditable;
//# sourceMappingURL=playlist-editable.js.map