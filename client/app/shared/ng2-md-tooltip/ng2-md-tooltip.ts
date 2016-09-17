import {
    Directive, ComponentFactoryResolver, Input, ViewContainerRef, ComponentRef, OnChanges,
    ElementRef
} from "@angular/core";
import {TooltipText} from "./tooltip-text";
import {PositionService} from "./position-serv";


@Directive({
    selector: "[ng2-md-tooltip]"
    // ,providers:[ PositionService]
})

export class Ng2MdTooltip  implements OnChanges {

    @Input("ng2-md-tooltip") options:TooltipOptions;
    @Input() placement:string = 'top';
    @Input() tooltipColor:string;



    private visible = false;
    private mytooltip:any;

    private timeout:number=3;

    constructor(private elementRef:ElementRef, private viewContainerRef:ViewContainerRef,private resolver:ComponentFactoryResolver, private positionService:PositionService) {
    }

      ngOnChanges(changes:any){
        if(!changes.options.currentValue) this.hide();
        else {
            var options:any;
            if(typeof changes.options.currentValue ==='object'){
                options = changes.options.currentValue;
            }else {
                options = {};
                options.message = changes.options.currentValue;
            }
            //console.log(options);
            options.placement = options.placement || this.placement || 'top';

          this.show(options);
        }
      }


    // @HostListener("focusin")
    // @HostListener("mouseenter")
    show(options) {
        if (!this.visible) {
            this.visible = true;

             var fact = this.resolver.resolveComponentFactory(TooltipText);
          let component:ComponentRef<TooltipText> = this.viewContainerRef.createComponent(fact);
            component.instance.setPosition(this.elementRef, options);
          this.mytooltip = component;
            var timeout:number = options.timeout || 3000;
           setTimeout(()=>this.hide(),timeout);

        }
    }


    // @HostListener("focusout")
    // @HostListener("mouseleave")
    hide() {
        if (this.visible) {
           // this.tooltip='';
            this.visible = false;
            var comp = this.mytooltip;
            this.mytooltip.instance.removeMe(function (){
                comp.destroy();
            });


        }
    }
}


export interface TooltipOptions{
    placement?:string;
    message:string;
    tooltip_class:string; ///user bootstrap classes btn-danger, btn-success, btn-primary .....
    timeout?:number;
}
