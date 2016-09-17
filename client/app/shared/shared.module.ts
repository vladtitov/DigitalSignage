/**
 * Created by админ on 16.09.2016.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Ng2MdTooltip} from "./ng2-md-tooltip/ng2-md-tooltip";
import {TooltipText} from "./ng2-md-tooltip/tooltip-text";
import {PositionService} from "./ng2-md-tooltip/position-serv";
import {ContentFilterPipe} from "../assets/content-filter.pipe";
import {ContentSearchPipe} from "../assets/content-search.pipe";
import {AssetCard} from "../assets/asset-card";




@NgModule({
    imports: [CommonModule],
    declarations: [
        Ng2MdTooltip,
        TooltipText,
        ContentFilterPipe,
        ContentSearchPipe,
        AssetCard
    ],
    exports: [ Ng2MdTooltip, ContentFilterPipe, ContentSearchPipe, AssetCard],
    entryComponents: [ TooltipText ],
    providers: [ PositionService ]
})

export class SharedModule {}