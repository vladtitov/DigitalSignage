/**
 * Created by Vlad on 8/10/2016.
 */
///<reference path="../models.ts"/>

module htplayer{

    export class DeviceModel{
        $view:JQuery;
        $deviceView:JQuery;
        $layoutView:JQuery;
        id: number;
        label: string;
        image:string;
        description: string;
        layout_id: number;
        layout: VOLayout;
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


    export  class DevicesList{
        $view:JQuery
        devices:DeviceModel[];
        $list:JQuery
        metadata:any;
        onComplete:Function;
        selectedDevice:DeviceModel;
        $submit:JQuery;
        onReady:Function;
        onFail:Function;


        constructor(private userdata:VOUserData){
            this.$view = $('#Devices');
            this.$view.append($('#Loading'));
            this.$list = $('#devices-list');
            this.loadData();

        }


        addListeners():void{
            this.$submit =this.$view.find('.submit').first().click(()=>{

                if(this.selectedDevice ){
                    if(this.onComplete){
                        var dev:VODevice = new VODevice({
                            id:this.selectedDevice.id,
                            label:this.selectedDevice.layout,
                            description:this.selectedDevice.description,
                            layout_id:this.selectedDevice.layout_id,
                            timestamp:this.selectedDevice.timestamp
                        })

                        this.onComplete(dev);
                    }

                }else   this.$submit.prop('disabled',true);
            })

            this.$submit.prop('disabled',true);
            this.$list.on('click','.mydevice',(evt:JQueryEventObject)=>{
                var id:number = $(evt.currentTarget).data('id');

                if(isNaN(id)) return;


                if(this.selectedDevice) this.selectedDevice.selected = false;

                this.$submit.prop('disabled',false);
                this.selectedDevice= this.getDeviceByIg(id)[0];
                this.selectedDevice.selected = true;

            })
        }
        appendTo($outlet):void{
            this.$view.appendTo($outlet);
        }
        getDeviceByIg(id):DeviceModel[]{
            return this.devices.filter(function(item){ return item.id==id});
        }
        loadData():void{

            $.get(server+'player/'+this.userdata.token+'/devices').done((res)=>{
                var list:any[] = res.data;
                if(!list){
                    console.warn(res)
                    return
                }

                console.log(res.data);
                this.metadata = res.metadata || [];
                this.devices = list.map(function(item){ return new DeviceModel(item) });
                this.showDevices();
                this.showMetadata();
            }).fail(()=>this.onFail());



        }


        showMetadata():void{
            var out:string='<ul>';
            this.metadata.forEach(function (item) {
                out+='<li><label>'+item.label+'</label><span>'+item.value+'</span></li>'
            })
            out+='</ul>'
            this.$view.find('.metadata').first().html(out)

        }
        showDevices():void{
            var list1=$('<div>');
            //   var list2=$('<div>');
            this.devices.forEach(function(item:DeviceModel){
                if(item.layout_id) list1.append(item.$view);
                //  else list2.append(item.$view);
            })
            this.$list.append(list1);
            //  this.$list.append(list2);

        }
    }
}