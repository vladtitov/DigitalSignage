//courtesy of http://valor-software.github.io/ng2-bootstrap
import {ViewContainerRef, ElementRef, ComponentRef, ComponentFactoryResolver, Injectable, Inject} from "@angular/core";
import {TooltipText} from "./tooltip-text";


@Injectable()
export class PositionService {

    OFFSET=12;
constructor( @Inject(ComponentFactoryResolver) private resolver:ComponentFactoryResolver){}


    public positionElement(refEl:HTMLElement, tooltipEl:HTMLElement, options:any, appendToBody:boolean = false):{top:number, left:number} {
        //return {top:20, left:20};

        let placement:string = options.placement || 'top';
        let refElRec = refEl.getBoundingClientRect();
       // console.log(refElRec);
        let tooltipRec = tooltipEl.getBoundingClientRect();

        var pos:any={};

        let top = refElRec.top-tooltipRec.top;
        let left = refElRec.left-tooltipRec.left;

        let out:{top:number, left:number};
        switch (placement) {
            case "right":
                out = {
                    top:top +  ((refElRec.height -tooltipRec.height)/2),
                    left:left+refElRec.width +  this.OFFSET
                };
                break;
            case "left":
                out = {
                    top:top +  ((refElRec.height -tooltipRec.height)/2),
                    left:left - tooltipRec.width - this.OFFSET
                };
                break;
            case "bottom":
                out = {
                    top:  top + refElRec.height + this.OFFSET,
                    left:left - (tooltipRec.width/2 - refElRec.width/2)
                };
                break;
            default:
                out= {
                    top: top - tooltipRec.height - this.OFFSET,
                    left:left - (tooltipRec.width/2 - refElRec.width/2)
                };
                break;
        }

        return out;
    }

}

