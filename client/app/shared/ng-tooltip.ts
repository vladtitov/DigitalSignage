import {Directive, ElementRef, Input, HostListener} from '@angular/core';

@Directive({
    selector: '[ng-tooltip]'
    // inputs: ['ng-tooltip']
    // inputs: ['message: ng-tooltip']
    // host: {
    //     '(click)': 'onClick()'
    // }
})
export class NgTooltip {

    private el: HTMLElement;

    // message:string;

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
    }

    @Input('ng-tooltip') message: string;

    @Input() set isTooltip(res:boolean){

        if(res && (this.message == 'success')){
            this.showSuccess();
        }
        else if(res && (this.message == 'error')){
            this.showError();
        }
        else {
            this.hideTooltip();
        }
        console.log('message: ', this.message, res);
    }

    private showSuccess() {
        this.el.style.visibility = 'visible';
        this.el.style.opacity = '1';
        this.el.style.backgroundColor = '#5cb85c';
    }

    private showError() {
        this.el.style.visibility = 'visible';
        this.el.style.opacity = '1';
        this.el.style.backgroundColor = '#d9534f';
    }

    private hideTooltip() {
        this.el.style.visibility = 'hidden';
        this.el.style.opacity = '0';
        this.el.style.backgroundColor = '#000';
    }






    // showTooltip() {
    //     console.log('success ', this.success);
    //     if(this.success){
    //         setTimeout(function () {
    //             this.el.nativeElement.style.visibility = 'visible';
    //             this.el.nativeElement.style.opacity = 1;
    //         },3000);
    //     }
    //
    // }


    //
    // showTip = function(message,obj:JQuery){
    //     var tip:JQuery = $('#Library #ToolTip').clone().html('<span class="fa fa-minus-circle"></span> <span>'+message+'</span>').offset(obj.offset());
    //     tip.appendTo('body');
    //     setTimeout(function () {
    //         tip.remove();
    //     },3000)
    // }
}