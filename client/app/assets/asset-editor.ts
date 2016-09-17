/**
 * Created by Dmitriy Prilutsky on 14.07.2016.
 */

import {Component, Output, OnInit, Input, EventEmitter} from '@angular/core';

import { VOAsset, UpdateResult } from "../services/models";
import { AssetLibrary } from "./asset-library";
import { AssetService } from "./asset-service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";
// import {AssetCard} from "./asset-card";

// import {MY_DIRECTIVES} from "../app.directives";


@Component({
    selector: 'asset-editor',
    template: `
<div>
               
            <div class="full-image" >
                <div id="myModal" class="modal" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content" *ngIf="currentAsset">
                        
                            <div class="modal-header">
                                <p>Edit name</p>
                                <button type="button" class="close" data-dismiss="modal"(click)="hideEdit()">&times;</button>  
                            </div>
                            
                            <div class="modal-body">
                                <input 
                                    type="text"
                                    class="form-control"
                                    placeholder="Content name"
                                    [(ngModel)]="itemLabel"
                                    #inputItem>
                                <div class="text-center">
                                    <div class="card-256">
                                        <asset-card [item]="currentAsset" [size]="256"></asset-card>
                                    </div>
                                </div>
                                <!--<p>Duration: {{ currentAsset.duration }} </p>-->
                                <p>Size: {{ currentAsset.height }} x {{ currentAsset.width }}</p>
                                <textarea
                                    class="form-control"
                                    name="comment"
                                    cols="50"
                                    rows="2"
                                    #textareaItem >{{ currentAsset.description }}</textarea>
                            </div>
                            
                            <div class="modal-footer">
                                <!--<span *ngIf="success" class="msg success">Success</span>-->
                                <!--<span *ngIf="error" class="msg error">Error</span>-->

                                <button
                                    type="button"
                                    class="btn btn-primary save"
                                    [class.disabled]="isInProgress"
                                    (click)="saveAsset(inputItem.value, textareaItem.value)"
                                    [ng2-md-tooltip]="tooltipMessage" placement="right" [tooltipColor]="color"
                                    >
                                    Save on server
                                </button>
                                <!--<div class="mytooltip">-->
                                    <!--<span -->
                                        <!--class="tooltiptext"-->
                                        <!--[ng-tooltip]="tooltipMessage"-->
                                        <!--[isTooltip]="isTooltip">-->
                                        <!--{{tooltipMessage}}-->
                                    <!--</span>-->
                                <!--</div>-->
                                <button type="button" class="btn btn-default clos pull-right" data-dismiss="modal"(click)="hideEdit()">Close</button> 
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
</div>              
              `
    ,styles: [`
                .text-center > .card-256 {
                    margin: auto;
                }
                .full-image {
                    position: absolute;
                    top: 200px;
                    left: 200px;
                    background-color: #ffe3c5;
                    border: 1px solid black;
                }
                
                .myscroll {
                    height: 700px;
                    overflow-y: scroll;
                    width: 100%;
                }
                
                .myscroll-content{
                    width: 100%;
                }
                
                .card {
                    height: 128px;
                    width: 128px;
                    float: left;
                    overflow: hidden;
                    word-wrap: break-word;
                }
                
                .selected {
                    border: 1px solid red;
                }
                
                .modal {
                    display: block;
                    background-color: rgba(0, 0, 0, 0.31);
                }
                
                .modal-header {
                    padding-bottom: 0px;
                }
                
                .modal-content {
                    width: 600px;
                    height: 630px;
                }
                
                .modal-footer {
                    text-align: start;
                }
                
                input {
                    margin-bottom: 10px;
                }
                
                p {
                    width: 90%;
                    display: inline-block;
                    margin-bottom: 20px;
                }
                
                .msg {
                    padding: 5px;
                    position: absolute;
                    left: 10px;
                    bottom: 60px;
                    z-index: 99;
                    margin-left: 0;
                    width: 70px;
                    text-align: center;
                    border-radius: 5px 5px;
                    color: #000;
                }
                
                .success {
                    background: #FFFFAA; border: 1px solid #FFAD33;
                }
                
                .error {
                    background: #FFCCAA; border: 1px solid #FF3334;
                }
                
                .disabled {
                    pointer-events:none;
                    opacity: 0.5;
                }
                
              `]
    // , directives: [AssetLibrary, AssetCard]
    // , providers: [  ]
})





export class AssetEditor implements OnInit {
    @Input () set _currentAsset(item){
        if(!item) return;
        // console.log('item ', item);
        this.currentAsset = item;
        this.itemLabel = item.label;
    };
    @Input () typevalue:string;
    @Input () searchvalue:string;
    // @Output() onselect:EventEmitter<{}> = new EventEmitter();

    errorMessage: string;
    success: boolean;
    error: boolean;
    isTooltip:boolean;

    color:string;
    tooltipMessage:string;

    isInProgress:boolean = false;

    private sub: Subscription;

    currentAsset:VOAsset;

    itemLabel:string;

    constructor(
        private assetService:AssetService
        , private route: ActivatedRoute
        , private router: Router
    ) {  }

    ngOnInit() {
        this.assetService.selectedAsset$.subscribe((asset:VOAsset)=>{
            // console.log(data);
            this.currentAsset = asset;
        },(err)=>{

        });

        // this.sub = this.route.params.subscribe(params => {
        //     let id = +params['id']; // (+) converts string 'id' to a number
        //
        //     if (params["type"] == "edit") this.assetService.getItemById(id)
        //         .subscribe(
        //             (res:VOAsset)=> {
        //                 console.log('res ', res);
        //                  // this.currentAsset = res;
        //             },
        //             error => this.errorMessage = <any>error);
        // });
    }

    saveAsset (name:string, description:string) {
        // this.currentAsset.label = this.itemLabel;
        if(!name){
            this.showTooltip('red', 'Error: name is empty');
            return;
        }

        this.isInProgress = true;

        var oldName: string = this.currentAsset.label;
        var oldDescription: string = this.currentAsset.description;

        this.currentAsset.label = name;
        this.currentAsset.description = description;
        this.assetService.saveItem(this.currentAsset)
            .subscribe(
                (res:UpdateResult)=> {
                    if (res && res.changes){
                        // this.showSuccess();
                        this.currentAsset.label = this.itemLabel;
                        this.showTooltip('green','Success');
                        this.isInProgress = false;
                        // console.log('save Success', res);
                    }  else{
                        // this.showError();
                        this.currentAsset.label = oldName;
                        this.currentAsset.description = oldDescription;
                        this.showTooltip('red', 'Error');
                        this.isInProgress = false;
                    }

                },
                error => {
                    this.currentAsset.label = oldName;
                    this.currentAsset.description = oldDescription;
                    this.showTooltip('red', 'Error');
                    this.isInProgress = false;
                    this.errorMessage = <any>error
                });
    }

    hideEdit() {
        //this.fullItem.selected = false;
        this.router.navigate(["./content-manager",'view',0]);
        // this.router.navigate(["./content-manager",'hideEditor',0]);
    }

    showTooltip(color:string, message:string){
        this.color = color;
        this.tooltipMessage = message;
        // if(color == 'green') this.tooltipMessage = 'Success';
        // else this.tooltipMessage = 'Error';
        setTimeout(()=>{
            this.tooltipMessage = '';
        }, 3000);
    }

    // showSuccess () {
    //     this.color = 'green';
    //     this.success = true;
    //     this.isTooltip = true;
    //     this.tooltipMessage = 'success';
    //     this.disableSave ();
    // }
    //
    // showError () {
    //     this.color = 'red';
    //     this.error = true;
    //     this.isTooltip = true;
    //     this.tooltipMessage = 'error';
    //     this.disableSave ();
    // }
    //
    // disableSave () {
    //     this.disabled = true;
    //     setTimeout( ()=> {
    //         this.success = false;
    //         this.error = false;
    //         this.disabled = false;
    //         this.isTooltip = false;
    //     }, 3000)
    // }

    onEditClick () {
        //this.fullItem = this.currentItem;
        this.router.navigate(["./content-manager", "edit", this.currentAsset.id]);
    }
}