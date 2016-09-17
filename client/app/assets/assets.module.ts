/**
 * Created by админ on 16.09.2016.
 */
import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import {ContentManager} from "./content-manager";
import {AssetLibrary} from "./asset-library";
import {AssetEditor} from "./asset-editor";
import {AddContent} from "../content-add/content-add";

import {FileContent} from "../content-add/content-files";
import {NgFileSelect} from "../content-add/uploader/src/directives/ng-file-select";
import {NgFileDrop} from "../content-add/uploader/src/directives/ng-file-drop";

import {routing} from "./assets.routing";
import {AssetService} from "./asset-service";
import {SharedModule} from "../shared/shared.module";
// import {Ng2MdTooltip} from "../shared/ng2-md-tooltip/ng2-md-tooltip";
// import {TooltipText} from "../shared/ng2-md-tooltip/tooltip-text";




@NgModule({
    imports: [ CommonModule, FormsModule, routing, SharedModule ],
    declarations: [
        ContentManager,
        AssetLibrary,
        AssetEditor,
        AddContent,
        FileContent,
        NgFileSelect,
        NgFileDrop,

        // Ng2MdTooltip,
        // TooltipText,

    ],
    providers: [ AssetService ],
})
export class AssetsModule { }