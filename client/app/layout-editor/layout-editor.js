/**
 * Created by Dmitriy Prilutsky on 15.07.2016.
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
var models_1 = require("../services/models");
//import {LayoutAssemplerView} from "./layoutassembler-view";
//import { PlaylistsService } from "../services/playlists-service";
var drag_playlist_service_1 = require("./drag-playlist-service");
//import { LayoutViewportPlaylists } from "../layouts/layout-viewport-playlists";
var layouts_templates_service_1 = require("../services/layouts-templates-service");
var playlists_list_dragable_1 = require("./playlists-list-dragable");
var layout_editor_viewport_1 = require("./layout-editor-viewport");
var layout_editor_service_1 = require("./layout-editor-service");
var device_editor_service_1 = require("../device/device-editor-service");
var LayoutEditor = (function () {
    function LayoutEditor(editorService, deviceEditorService, route, templatesService, router) {
        this.editorService = editorService;
        this.deviceEditorService = deviceEditorService;
        this.route = route;
        this.templatesService = templatesService;
        this.router = router;
        this.currentLayout = new models_1.VOLayout({});
        this.mySizeW = 960;
        this.mySizeH = 540;
    }
    LayoutEditor.prototype.ngOnInit = function () {
        var _this = this;
        this.editorService.currentItem$.subscribe(function (item) { return _this.setCurrent(item); });
        this.sub = this.route.params.subscribe(function (params) {
            var id = +params['id'];
            if (params['type'] == 'template') {
                _this.toolsDisadled = true;
                _this.templatesService.getTemplateById(id).subscribe(function (res) {
                    console.log(res);
                    var layout = new models_1.VOLayout({ viewports: res.viewports });
                    layout.props.width = res.width;
                    layout.props.height = res.height;
                    _this.mySizeW = res.width / 2;
                    _this.mySizeH = res.height / 2;
                    layout.props.id = -1;
                    _this.currentViewPorts = layout.viewports;
                    _this.currentLayout = layout;
                });
            }
            else {
                _this.editorService.getLayoutById(id);
            }
        });
        /*   this.layoutService.selectedItem$.subscribe(
               data => this.currentLayout = data,
               error => this.errorMessage = <any>error
           );*/
        /* this.viewportService.getViewports();
         let params = this.utils.getUrlParams();
         if (params) {this.viewplaylists = false} else {this.viewplaylists = true};*/
    };
    LayoutEditor.prototype.setCurrent = function (item) {
        var _this = this;
        this.currentLayout = item;
        this.mySizeW = item.props.width / 2;
        this.mySizeH = item.props.height / 2;
        console.log(item);
        this.deviceEditorService.getUsedDevice(item.props)
            .subscribe(function (devices) {
            item.usedDevice = devices;
            if (item.usedDevice && item.usedDevice.length) {
                var labelArr = item.usedDevice.map(function (item) {
                    return item.label;
                });
                _this.devicesLabels = labelArr.join(', ');
            }
            else {
                _this.devicesLabels = 'no devices';
            }
            console.log('res ', _this.currentLayout.usedDevice);
            console.log('devicesLabels ', _this.devicesLabels);
        });
        this.currentViewPorts = item.viewports;
    };
    LayoutEditor.prototype.onSaveClick = function () {
        // this.viewportService.saveData(this.viewports);
    };
    LayoutEditor.prototype.makeSnap = function (callBack) {
        var node = document.getElementById('PictureDiv');
        /*  console.log(node);
          domtoimage.toPng(node)
              .then(function (dataUrl) {
  
                var img = new Image();
                 img.src = dataUrl;
                 document.body.appendChild(img);
              })
              .catch(function (error) {
                  console.error('oops, something went wrong!', error);
              });
  */
        domtoimage.toJpeg(node, { quality: 0.60, bgcolor: '#ffffff' })
            .then(function (dataUrl) {
            callBack(dataUrl);
        })
            .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    };
    LayoutEditor.prototype.onDeleteClick = function () {
        var _this = this;
        if (this.currentLayout && confirm('You want to delete assemble ' + this.currentLayout.props.label + '?\n' +
            'Used devices: ' + this.devicesLabels))
            this.editorService.deleteLayoutById(this.currentLayout.props.id).subscribe(function (res) { _this.router.navigate(['../layout-template/', -1]); });
    };
    LayoutEditor.prototype.onViewPlaylists = function () {
        //this.viewplaylists = !this.viewplaylists;
    };
    LayoutEditor.prototype.onServerSaveClick = function () {
        ///console.log(this.currentViewPorts);
        var _this = this;
        this.makeSnap(function (dataUrl) {
            _this.currentLayout.props.image = dataUrl;
            _this.currentLayout.props.type = 'lite';
            _this.currentLayout.viewports = _this.currentViewPorts;
            _this.editorService.saveOnServer(_this.currentLayout);
        });
        // this.layoutService
        //this.asseblerService.setlayout(this.currentLayout);
        //console.log(this.layoutService.selectedItem)
        // console.log(this.currentLayout);
    };
    LayoutEditor = __decorate([
        core_1.Component({
            selector: 'layout-editor',
            template: "\n<div>\n            <div class =\"panel-heading\">\n                <h3>Layout assembler</h3>\n                <nav>                 \n                    <a [routerLink]=\"['/layout-template/',-1]\" class=\"btn btn-default\"><span class=\"fa fa-plus\"></span> Create New Layout</a>                           \n                    <a #mybtn class=\"btn btn-default\" [class.disabled]=\"toolsDisadled\" (click)=\"onDeleteClick($evtnt,mybtn)\"><span class=\"fa fa-minus\"></span> Delete Layout</a>\n                    <a class=\"btn btn-default\" (click) = \"onServerSaveClick()\"><span class=\"fa fa-life-saver\"></span> Save on Server</a>\n                </nav>\n            </div>\n            <div class=\"panel-body\">                 \n                <div>\n                    <playlists-list-dragable></playlists-list-dragable>                \n                </div>\n                <hr size=\"3\">\n                <div class=\"layout\">\n                    <div class=\"form-group\">\n                        <label>Layout Name</label>\n                       <!-- <input type=\"text\" [(ngModel)]=\"currentLayout.props.label\" />-->\n                        <label *ngIf=\"devicesLabels\">Used devices: <span>{{devicesLabels}}</span> </label>\n                    </div>\n                    <div  id=\"SnapshotDiv\" [style.width.px]=\"mySizeW\" [style.height.px]=\"mySizeH\">\n                        <div id=\"PictureDiv\" [style.width.px]=\"mySizeW\" [style.height.px]=\"mySizeH\"> \n                            <div id=\"ViewPortsDiv\">\n                                <div  *ngFor=\"let myitem of currentViewPorts\">                           \n                                    <layout-editor-viewport [item]=\"myitem\"  (onview)=\"onClickViewport()\"></layout-editor-viewport>                                  \n                                </div>\n                            </div>\n                        </div>\n                       \n                    </div>\n                    <div id=\"SnapResult\">\n                   \n                   \n                    </div>\n                </div>\n               \n            </div>\n</div>                  \n             ",
            styles: ["\n\n            .layout{\n                text-align: center;\n            }\n            #SnapshotDiv{\n                position: relative;\n                margin: auto;\n                box-shadow: grey 5px 5px 10px;\n              /*  width: 824px;\n                height: 400px;*/\n            }\n            #PictureDiv{\n                position: absolute;\n                top:0;\n                left: 0;\n            }\n           #ViewPortsDiv{\n                position: absolute;\n                top:0;\n                left: 0;\n                transform: scale(0.5);            \n            }\n            \n            "],
            directives: [router_1.ROUTER_DIRECTIVES, playlists_list_dragable_1.AssemblerPlayLists, layout_editor_viewport_1.LayoutEditorViewport],
            providers: [layout_editor_service_1.LayoutEditorService, device_editor_service_1.DeviceEditorService, layouts_templates_service_1.LayoutsTemlatesService, drag_playlist_service_1.DragPlayListService]
        }), 
        __metadata('design:paramtypes', [layout_editor_service_1.LayoutEditorService, device_editor_service_1.DeviceEditorService, router_1.ActivatedRoute, layouts_templates_service_1.LayoutsTemlatesService, router_1.Router])
    ], LayoutEditor);
    return LayoutEditor;
}());
exports.LayoutEditor = LayoutEditor;
//# sourceMappingURL=layout-editor.js.map