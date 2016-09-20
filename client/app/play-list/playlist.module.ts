/**
 * Created by админ on 16.09.2016.
 */
import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms';
import { RouterModule }     from '@angular/router';

import {SharedModule} from "../shared/shared.module";

import {PlayListLibrary} from "./playlist-library";
import {PlayListSimple} from "./playlist-simple";
import {PlayListFrame} from "./playlist-frame";

import {PlayListEditor} from "../playlist-editor/playlist-editor";
import {PlaylistEditable} from "../playlist-editor/playlist-editable";

import {TimeCellCompnent} from "../playlist-editor/TimeCell";
import {PlayListItem} from "../playlist-editor/playlist-editable-item";

import {PlayListService} from "../playlist-editor/playlist-service";
import {PlaylistsService} from "../services/playlists-service";
import {AssetsService} from "../services/assets-service";




@NgModule({
    imports: [ CommonModule, FormsModule,  SharedModule,  RouterModule ],
    declarations: [
        PlayListLibrary,
        PlayListSimple,
        PlayListFrame,

        PlayListEditor,
        PlaylistEditable,

        TimeCellCompnent,
        PlayListItem

    ],
    providers: [ PlayListService, PlaylistsService, AssetsService ]
})
export class PlaylistModule { }