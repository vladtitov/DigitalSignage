import {Component, Inject, ElementRef, ChangeDetectorRef,ComponentFactoryResolver, AfterViewInit} from "@angular/core";
import {positionService} from "./position-serv";


@Component({
    selector: "tooltip-text",
    template:`
<div class="tooltip-text bg-{{color}}" [ngStyle]="{top: top, left: left}">{{content}}</div>
`
  ,styles:[`
 .tooltip-text {
        text-transform: none;
        font-size: 12px;
        font-weight: 500;

        background-color: rgba(97,97,97,0.9);
        color: #fff;
        text-align: center;
        border-radius: 4px;

        /* Position the tooltip text */
        position: absolute;
        z-index: 100;
        
        transition: opacity 1s;
        height: 22px;
        line-height: 22px;
        padding-left: 8px;
        padding-right: 8px;
    }
    .tooltip-text.bg-green {
        background-color: #5cb85c;
    }
    .tooltip-text.bg-red {
        background-color: #d9534f;
    }
`]
})

export class TooltipText implements AfterViewInit {
    top:string;
    right:string;
    bottom:string;
    left:string;

    private hostEl:ElementRef;
    private placement:string;
    content:any;
    color:string;

    constructor( private element:ElementRef, @Inject(ChangeDetectorRef) private changeDetector:ChangeDetectorRef) {
    }

   setPosition(hostEl:ElementRef, placement:string):void {
        this.top = "-1000px";
        // this.right = "-1000px";
        // this.bottom = "-1000px";
        this.left = "-1000px";

        this.hostEl = hostEl;
        this.placement = placement;
    }

   ngAfterViewInit():void {
        let {top, left} = positionService.positionElements(
            this.hostEl.nativeElement,
            this.element.nativeElement.children[0],
            this.placement
        );
        this.top = top + "px";
        this.left = left + "px";

        this.changeDetector.detectChanges();
    }
}
