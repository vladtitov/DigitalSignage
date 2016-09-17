/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { RouterConfig } from '@angular/router';

// import { AddContent }  from '../content-add/content-add';
import {VOAsset, VOPlayListProps, UpdateResult} from "../services/models";
// import { AssetEditor} from "./asset-editor";
// import {AssetLibrary} from "./asset-library";
import {AssetService} from "./asset-service";

// import {PlayListService} from "../playlist-editor/playlist-service";

@Component({
    selector: 'content-manager',
    template: `
<div>               
                 <div class ="panel-heading">
                  <h3>Content manager</h3>
                    <nav>
                             <a class="btn btn-default" (click)="onAddAsset()"><span class="fa fa-plus"></span> Add Content</a>
                             <a class="btn btn-default" [class.disabled]="toolsDisadled" (click)="onEditAsset()"> <span class="fa fa-edit"></span> Edit Content</a>
                             <a class="btn btn-default" [class.disabled]="toolsDisadled" (click)="onDeleteAsset()"><span class="fa fa-minus"></span> Delete Content</a>
                    </nav>
                 </div>
                 <div class="panel-body">
                     <asset-library #assetLibrary [changesResult]="changesResult" (onselect)="onLibrarySelect($event)"></asset-library>
                     <asset-editor *ngIf="editorVisible" #assetEditor [_currentAsset]="currentAsset"></asset-editor>
                </div>
                
                
                <div *ngIf="isAddContent">
                    <div id="myModal" class="modal" role="dialog">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" (click)="onModalClose()">&times;</button>
                                    <h4 class="modal-title">Add content</h4>
                                </div>
                                    <div class="modal-body">
                                        <add-content 
                                            (hided)="onHided()"
                                            (showed)="onShowed()"
                                            (closed)="onModalClose()"
                                            (changed)="onUpload()">
                                        </add-content>
                                    </div>
                              <div class="modal-footer">
                                    
                              </div>
                            </div>
                            <div *ngIf="isHide" class="shadow"></div>
                        </div>
                    </div>
                </div>
</div>
                `,
    styles: [ `
                .modal {
                    display: block;
                    background-color: rgba(0, 0, 0, 0.31);
                }
                
                .modal-header {
                    text-align: center;
                }
                
                .modal-content {
                    width: 500px;
                }
                
                .shadow {
                    position: absolute;
                    background-color: rgba(0, 0, 0, 0.11);
                    width: 500px;
                    height: 120px;
                    top:0;
                }
            `]
    ,
    // directives: [ AddContent, AssetLibrary, AssetEditor]
    // , providers: [AssetService,PlayListService]
})


export class ContentManager implements OnInit {
    id:any;
    paramsSub:any;
    selectedIndex:number = 0;
    isAddContent:boolean = false;
    isHide:boolean;
    currentAsset: VOAsset;
    fullItem:VOAsset;

    changesResult:UpdateResult;
    error:string;

    editorVisible:boolean;
    toolsDisadled:boolean;

    constructor (
        private ar:ActivatedRoute
        , private router:Router
        , private assetService:AssetService
        // , private playListService:PlayListService
    ) { }

    ngOnInit() {
        this.isAddContent = false;
        this.paramsSub = this.ar.params.subscribe((params) => {
            // console.log('currentAsset ', this.currentAsset);
            if(!this.currentAsset) this.toolsDisadled = true;
            // this.toolsDisadled = true;
            this.isAddContent = false;
            this.editorVisible = false;

            switch (params['type']) {
                case "add":
                    this.isAddContent = true;
                    break;
                case "edit":
                    if(this.currentAsset) this.editorVisible = true;
                    break;
                case "remove":
                    this.isAddContent = false;
                    break;
            }
        });

        this.assetService.selectedAsset$.subscribe((asset:VOAsset)=>{
            // console.log(data);
            this.currentAsset = asset;
            this.toolsDisadled = asset.selected ? false : true;
            // console.log('this.toolsDisadled ', this.toolsDisadled);
        },(err)=>{

        });

        /*        this.router.navigate(['./files']);*/
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe();
    }

    onHided() {
        this.isHide = true;
    }

    onShowed() {
        this.isHide = false;
    }

    onModalClose () {
        this.isAddContent = false;
        this.router.navigate(["./content-manager",'view',0]);
        this.assetService.getAssets();
        console.log('currentAsset ', this.currentAsset);
    }

    onUpload(){
        this.assetService.getAssets();
    }

    onAddAsset () {
        this.router.navigate(["./content-manager", "add", "files"]);
    }

    onEditAsset() {
        if(this.currentAsset && this.currentAsset.id)
            this.router.navigate(["./content-manager", "edit", this.currentAsset.id]);
    }

    onDeleteAsset(){
        var strLabels:string;

        if(this.currentAsset.usedPlayList && this.currentAsset.usedPlayList.length){
            var labelArr:string[] = this.currentAsset.usedPlayList.map(function (item) {
                return item.label;
            });
            strLabels = labelArr.join(', ');
        } else {
            strLabels = 'no playlists';
        }

        if(this.currentAsset && confirm('You want to delete asset "'+this.currentAsset.label+'"?\n' +
                'Used playlists: ' + strLabels)){
            this.assetService.deleteAssetById(this.currentAsset.id)
                .subscribe(
                    res=>{
                        this.changesResult = res;
                        this.currentAsset = null;
                        this.toolsDisadled = true;
                        console.log('this.changesResult ', this.changesResult);
                        console.log('this.currentAsset', this.currentAsset);
                    }
                    , err=>this.error=err
                );
        }
    }

    onLibrarySelect (evt:VOAsset) {
        // this.toolsDisadled = evt ? false : true;
        // console.log('onLibrarySelect ', evt);
        this.currentAsset = evt;

        this.assetService.getUsedPlayList(evt)
            .subscribe((asset:VOAsset) => {
                evt.usedPlayList = asset.usedPlayList;
            });
    }

}

