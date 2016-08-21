/**
 * Created by Vlad on 8/19/2016.
 */

module hbrowser{
    export class DeviceModel{
        $view:JQuery;
        $deviceView:JQuery;
        $layoutView:JQuery;
        id: number;
        label: string;
        image:string;
        description: string;
        layout_id: number;
       // layout: VOLayout;
        timestamp: number;
        set selected(sel){
            sel? this.$view.addClass('selected'):this.$view.removeClass('selected');
        }
        constructor(obj: any) {
            for (var str in obj)this[str] = obj[str];
            var cl:string;
            this.$view = $('<div>').addClass('mydevice').data('id',this.id);
            var icon='<div class="fa fa-desktop"></div>';
            var label ='<div>'+this.label+'</div>';
            var descr='<div>'+this.description+'</div>';
            var props ='<div>'+label+descr+'</div>';

            this.$deviceView = $('<div>').addClass('mydevice-view').html(icon+props).appendTo(this.$view);
            if(this.image){
                var layout ='<div><img src="'+this.image+'"/></div>';
                this.$layoutView = $('<div>').addClass('layout').html(layout).appendTo(this.$view);
            }

        }


    }
}