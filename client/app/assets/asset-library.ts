/**
 * Created by Dmitriy Prilutsky on 14.07.2016.
 */
//import {DomSanitizationService} from '@angular/platform-browser';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';


import { AssetsService} from '../services/assets-service';
import {VOAsset, UpdateResult} from "../services/models";
// import { ContentFilterPipe } from "./content-filter.pipe";
// import { ContentSearchPipe } from "./content-search.pipe";
// import {AssetCard} from "./asset-card";
import {AssetService} from "./asset-service";


@Component({
    selector: 'asset-library',
    template: `
<div>
                 <div class="tools control-group pull-right form-inline">
                     <label for="types"><span class="fa fa-file-code-o"></span></label>
                     <select class="form-control" id="types" #dropdowntype (change)="onChange(dropdowntype.value)">
                        <option *ngFor="let i of types">{{i}}</option>
                      </select>
                      <div class="form-group has-feedback has-feedback-left">
                          <input type="text" class="form-control" #inputsearch (input)="onSearch(inputsearch.value)">
                          <i class="form-control-feedback fa fa-search"></i>
                     </div>
                 </div>
                 <div class="asset-library">
                    <div class="myscroll">
                        <div class="myscroll-content">                    
                                
                             <div class="card" (click)="onClickItem(item)" *ngFor="let item of assets | contentfilter: typevalue | contentsearch: searchvalue">
                                <asset-card [item]="item" [size]="128"></asset-card>                                              
                             </div>
                        
                        </div>
                    </div>
                 </div>
</div>
                `,
    styles: [`
                .tools {
                    margin-top: -60px;
                }
                
                .myscroll {
                    height: 450px;
                    overflow-y: scroll;
                    width: 100%;
                }
                
                .myscroll-content{
                    width: 100%;
                }
                
                .card {
                    float: left;
                }
                
                .card p {
                    text-align: center;
                }
                
          `],
    // directives: [AssetCard],
    // providers: [AssetsService],
    // pipes: [ContentFilterPipe, ContentSearchPipe]
})




export class AssetLibrary implements OnInit {
    @Output() onselect:EventEmitter<{}> = new EventEmitter();

    @Input() set changesResult(evt:UpdateResult){
        this.getAssets();
    }

    errorMessage:string;
    assets:VOAsset[]=[];
    fullItem:VOAsset;
    selected:boolean = false;
    currentAsset: VOAsset;

    types:string[] = ['all', 'video', 'image'];
    typevalue:string = 'all';
    searchvalue:string = "";

    constructor(
        private assetsService:AssetsService   //old ???
        , private assetService: AssetService
    ) {

    }

    ngOnInit() {
        this.assetService.assets$.subscribe((data)=>{
            // console.log(data);
            this.assets = data;
        },(err)=>{

        });
        this.assetService.getAssets();

        this.assetService.selectedAsset$.subscribe((asset:VOAsset)=>{
            // console.log(data);
            this.currentAsset = asset;
        },(err)=>{

        });

        // this.getData();
    }

    getAssets(){
        this.assetService.getAssets();
    }

    onClickItem(item:VOAsset) {
        this.assetService.selectAsset(item);
        this.onselect.emit(this.currentAsset);
    }


    onChange (value:string) {
        this.typevalue = value;
    }

    onSearch (value:string) {
        this.searchvalue = value;
    }

}