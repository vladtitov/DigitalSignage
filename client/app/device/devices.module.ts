/**
 * Created by админ on 16.09.2016.
 */
import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import {routing} from "./devices.routing";
import {DevicesManager} from "./devices-manager";
import {DeviceEditorService} from "./device-editor-service";
import {DevicesList} from "./devices-list";
import {DeviceListService} from "./device-list-service";
import {DeviceEditor} from "./device-editor";
import {LayoutsListService} from "../layouts/layouts-list-service";
import {DeviceListItem} from "./device-list-item";
import {LayoutEditorService} from "../layout-editor/layout-editor-service";
import {SharedModule} from "../shared/shared.module";



@NgModule({
    imports: [ CommonModule, FormsModule, routing, SharedModule ],

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