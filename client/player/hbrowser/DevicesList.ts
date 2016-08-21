/**
 * Created by Vlad on 8/19/2016.
 */
///<reference path="../models.ts"/>
    ///<reference path="../../typings/jquery/jquery.d.ts"/>
    ///<reference path="DeviceModel.ts"/>

module hbrowser{
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


        constructor(){


        }



        addListeners():void{
            this.$submit =this.$view.find('.submit').first().click(()=>{

                if(this.selectedDevice ){
                    if(this.onComplete){
                        var dev:htplayer.VODevice = new htplayer.VODevice({
                            id:this.selectedDevice.id,
                           // label:this.selectedDevice.layout,
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

        createView():void{
            this.$view = $('<div>').addClass('devices-list-view text-center row');
            this.$submit = $('<button>').text('Sign this devise').prop('disabled',true).addClass('btn btn-primary').appendTo(this.$view);
            var row:JQuery = $('<div>').addClass('row').appendTo(this.$view);

            this.$list =  $('<div>').addClass('devices-list row').appendTo(row);

        }
        appendTo($outlet):void{
            if(!this.$view)this.createView();
            this.$view.appendTo($outlet);
            this.addListeners();
        }
        getDeviceByIg(id):DeviceModel[]{
            return this.devices.filter(function(item){ return item.id==id});
        }

        loadDevices(url:string):void{
            $.get(url).done((res)=>{
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
            var list1=this.$list;
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