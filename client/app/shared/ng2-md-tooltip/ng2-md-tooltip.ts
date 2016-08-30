import { Directive, ComponentFactoryResolver, Input, ViewContainerRef, ComponentRef, OnChanges } from "@angular/core";
import {TooltipText} from "./tooltip-text";


@Directive({
    selector: "[ng2-md-tooltip]"
})

export class Ng2MdTooltip  implements OnChanges {

    @Input("ng2-md-tooltip") tooltip:string;
    @Input() placement:string;
    @Input() tooltipColor:string;



    private visible = false;
    private mytooltip:any;



   /* constructor(@Inject(ViewContainerRef) private elementRef:ViewContainerRef,  @Inject(ComponentResolver) private resolver:ComponentResolver) {
    }*/

  ngOnChanges(changes:any){
    if(!changes.tooltip.currentValue) this.hide();
    else {
      console.log(changes);
      this.tooltip = changes.tooltip.currentValue;
      this.show();
    }
  }
  constructor(private elementRef:ViewContainerRef,  private resolver:ComponentFactoryResolver) {
  }

    // @HostListener("focusin")
    // @HostListener("mouseenter")
    show() {
        if (!this.visible) {
            this.visible = true;
          var fact = this.resolver.resolveComponentFactory(TooltipText);
          let component:ComponentRef<TooltipText> = this.elementRef.createComponent(fact);
          component.instance.content = this.tooltip;
          component.instance.color = this.tooltipColor;
            component.instance.setPosition(this.elementRef.element, this.placement);

          this.mytooltip = component;
           // return component;

        }
    }


    // @HostListener("focusout")
    // @HostListener("mouseleave")
    hide() {
        if (this.visible) {

            this.visible = false;
          this.mytooltip.destroy();
           // this.tooltipDeferred.then((componentRef:ComponentRef<any>) => {
            //    componentRef.destroy();

              //  return  this.mytooltip;
          //  });
        }
    }
}
