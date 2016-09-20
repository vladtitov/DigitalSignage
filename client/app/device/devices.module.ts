/**
 * Created by админ on 16.09.2016.
 */
import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms';
import { RouterModule }     from '@angular/router';

import {SharedModule} from "../shared/shared.module";

import {DevicesManager} from "./devices-manager";
import {DevicesList} from "./devices-list";
import {DeviceEditor} from "./device-editor";
import {DeviceListItem} from "./device-list-item";

import {DeviceEditorService} from "./device-editor-service";
import {DeviceListService} from "./device-list-service";
import {LayoutsListService} from "../layouts/layouts-list-service";
import {LayoutEditorService} from "../layout-editor/layout-editor-service";




@NgModule({
    imports: [ CommonModule, FormsModule, SharedModule, RouterModule ],

    declarations: [
        DevicesManager,
        DevicesList,
        DeviceEditor,
        DeviceListItem
    ],
    providers: [
        DeviceEditorService,
        DeviceListService,
        DeviceEditorService,
        LayoutsListService,
        LayoutEditorService
    ]
})
export class DevicesModule { }