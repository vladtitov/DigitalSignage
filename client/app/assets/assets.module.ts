/**
 * Created by админ on 16.09.2016.
 */
import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms';
import { RouterModule }     from '@angular/router';

import {SharedModule} from "../shared/shared.module";

import {ContentManager} from "./content-manager";
import {AssetLibrary} from "./asset-library";
import {AssetEditor} from "./asset-editor";
import {AddContent} from "../content-add/content-add";

import {FileContent} from "../content-add/content-files";
import {NgFileSelect} from "../content-add/uploader/src/directives/ng-file-select";
import {NgFileDrop} from "../content-add/uploader/src/directives/ng-file-drop";

import {AssetService} from "./asset-service";



@NgModule({
    imports: [ CommonModule, FormsModule, SharedModule, RouterModule ],
    declarations: [
        ContentManager,
        AssetLibrary,
        AssetEditor,
        AddContent,
        FileContent,
        NgFileSelect,
        NgFileDrop
    ],
    providers: [ AssetService ],
})
export class AssetsModule { }