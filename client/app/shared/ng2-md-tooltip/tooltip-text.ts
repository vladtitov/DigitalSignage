import {Component, Inject, ElementRef, ChangeDetectorRef,ComponentFactoryResolver, AfterViewInit} from "@angular/core";
import {PositionService} from "./position-serv";
import {TooltipOptions} from "./ng2-md-tooltip";


@Component({
    selector: "tooltip-text",
    template:`
        <div class="tooltip-text {{myClass}}" [ngStyle]="myStyle">{{message}}</div>
`

    // ,providers:[PositionService]
})

export class TooltipText implements AfterViewInit {

    //opacity:number;

    private refEl:ElementRef;
    message:string;
    options:TooltipOptions;
    myStyle:any;
    myClass:string;

    constructor( private elementRef:ElementRef,private positionService:PositionService, @Inject(ChangeDetectorRef) private changeDetector:ChangeDetectorRef) {
    }

    isInit:boolean;
   setPosition(refEl:ElementRef,options:TooltipOptions):void {
        this.refEl = refEl;
       this.options = options;
       this.myStyle={};
       this.myStyle.top =  0;
       this.myStyle.left = 0;
      // console.log(options);
       this.message = options.message;
       this.myClass = options.tooltip_class || 'btn-primary';
       this.count=0;
       if(this.isInit) this.placeElement();
    }

   ngAfterViewInit():void {
       this.isInit = true;
       if(this.options)this.placeElement();
    }

    count:number;
    placeElement():void{
        this.count ++;

        let {top, left} = this.positionService.positionElement(this.refEl.nativeElement, this.elementRef.nativeElement.children[0], this.options );

        this.myStyle.top=  top + "px";
        this.myStyle.left= left + "px";
        this.myStyle.opacity = 1.0;

        this.changeDetector.detectChanges();
    }


    removeMe(callBack:Function):void{
        this.myStyle.opacity=0;
        setTimeout(callBack,500);
    }

}
