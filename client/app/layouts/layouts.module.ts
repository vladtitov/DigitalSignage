/**
 * Created by админ on 16.09.2016.
 */
import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms';
import { RouterModule }     from '@angular/router';

import {SharedModule} from "../shared/shared.module";

import {LayoutsAssembled} from "./layouts-assembled";
import {LayoutsListCards} from "./layouts-list-cards";
import {LayoutThumb} from "./layout-thumb";
import {LayoutsTemplate} from "./layouts-template";
import {LayoutEditor} from "../layout-editor/layout-editor";
import {LayoutsTemplateList} from "./layouts-template-list";
import {AssemblerPlayLists} from "../layout-editor/playlists-list-dragable";
import {LayoutEditorViewport} from "../layout-editor/layout-editor-viewport";

import {LayoutEditorService} from "../layout-editor/layout-editor-service";
import {DeviceEditorService} from "../device/device-editor-service";
import {LayoutsListService} from "./layouts-list-service";
import {LayoutsTemlatesService} from "../services/layouts-templates-service";
import {DragPlayListService} from "../layout-editor/drag-playlist-service";





@NgModule({
    imports: [ CommonModule, FormsModule, SharedModule, RouterModule ],

    declarations: [
        LayoutsAssembled,
        LayoutsListCards,
        LayoutThumb,
        LayoutsTemplate,
        LayoutEditor,
        LayoutsTemplateList,
        AssemblerPlayLists,
        LayoutEditorViewport
    ],
    providers: [
        LayoutEditorService,
        LayoutsListService,
        DeviceEditorService,
        LayoutsTemlatesService,
        DragPlayListService
    ]
})
export class LayoutsModule { }