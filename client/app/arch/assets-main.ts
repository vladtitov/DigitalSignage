import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { VOAsset } from '../services/models';
import {AssetsService} from "../services/assets-service";


@Component({
    selector: 'assets-app',
    template: `
            <div class ="panel panel-default">
               <div class ="panel-heading">
                                  <a class="btn btn-default"><span class="fa fa-plus"></span> Add</a>
                                   <a class="btn btn-default"> <span class="fa fa-edit"></span> Edit</a>
                                    <a class="btn btn-default"><span class="fa fa-minus"></span> Remove</a>
               </div>
               <div class="panel-body">
                 <div class="myscroll">
                     <div class="myscroll-content">
                         <md-content>
                             <div class="card" *ngFor="let item of data">                         
                                <md-card>
                                       <img md-card-sm-image src="{{ item.thumb }}" (dragstart)="onDragStart(item)" (click)="onClickItem(item)">
                                </md-card>
                             </div>
                         </md-content>
                         <div class="full-image" *ngIf="fullItem"> 
                             <img src=" {{ fullItem.img }} " width="200" (click)="hideFullImage()">
                         </div>
                      </div>
                  </div>
               </div>
            </div>
                `,
    styles: [`
        .myscroll{
            height: 700px;
            overflow-y: scroll;
            width: 100%;
        }
        .myscroll-content{
                width: 100%;
        }
        .card{
        width: 128px;
        height: 128px;
        float: left;
        overflow: hidden;
        }
        
`],
    directives: [ROUTER_DIRECTIVES],
    providers: [AssetsService]
})

export class AssetsMain {
    errorMessage: string;
    data: VOAsset[];
    cartItems: VOAsset[];
    dragItem: VOAsset;
    fullItem: VOAsset;
    dragMove: VOAsset;
    isMove:boolean;

    constructor ( private service:AssetsService ) {
        this.cartItems =[new VOAsset({})];
    }

    ngOnInit () {
        this.getData();
    }

    getData() {
        this.service.getData()
            .subscribe(
                data => this.data = data,
                error =>  this.errorMessage = <any>error);{
        }
    }

    onClickItem (item: VOAsset) {
        this.fullItem = item;
    }

    hideFullImage () {
        this.fullItem = null;
    }

    onDragEnd (evt:DragEvent) {
        this.dragItem = null;
    }

    onDragEnter (evt:DragEvent) {
        this.toCart (this.dragItem);
    }


    onDragStart (item: VOAsset) {
        this.isMove = false;
        this.dragItem = item;
    }

    onDragOut (evt) {
        if (!this.isMove) this.offCart(this.dragItem);
    }

    onSpacerDragEnter (item: VOAsset) {
        let i:number = this.cartItems.indexOf(item);
        this.insertToCardAt(this.dragItem, i)
    }

    insertToCardAt (item: VOAsset, i:number) {
        console.log(item, i, this.isMove);
        if (item && i !== -1) {
            if (this.isMove) {
                let index:number = this.cartItems.indexOf(item);
                if (index > -1) {
                    this.cartItems.splice(index,1);
                }
                this.cartItems.splice(i + 1, 0, item);
            }
            else {
                if (i === (this.cartItems.length - 1) ) this.cartItems.push(item);
                else this.cartItems.splice(i + 1, 0, item);

            }
            if (!this.isMove) this.dragItem = null;
        }
    }

    toCart (item) {
        if (item) {
            this.cartItems.push(item);
            let spacer = new VOAsset ({});

/*            this.cartItems.push(spacer);*/
        }
    }

    offCart (item) {
        if (item) {
            let index:number = this.cartItems.indexOf(item);
            console.log("offcart" + index);
            if (index > -1) {
                this.cartItems.splice(index,1);
            }
        }
    }



    onCartDragItemStart (item: VOAsset) {
        this.isMove = true;
        this.dragMove = item;
        this.dragItem = item;
    }

    onCartDragItemEnd (evt, item: VOAsset) {
        if (this.isMove && evt.y > 300) this.offCart (item);
        this.isMove = false;
        this.dragMove = null;
        this.dragItem = null;
    }
}