/**
 * Created by Vlad on 8/19/2016.
 */
///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="../UtilsServices.ts"/>
    ///<reference path="Debugger.ts"/>
    ///<reference path="DevicesManager.ts"/>





module hbrowser{
    interface Options{
        serverURL:string;
        storageFolder:string;
        USBFolder:string;
    }


    export class HBrowserController{
        debug:Debugger;

        decicesManager:DevicesManager;
        layoutModel:LayoutController;

        $container:JQuery
        constructor(private options:Options){
           // console.log(options);


            this.$container = $('#MainContainer');

            this.debug = new Debugger();
            this.debug.start();
            this.initDeviceManager();

        }
        initDeviceManager():void{
            var params:any = UtilsServices.utils.getUrlParams();
            var device_id:number =0;
            if(params && params.device_id)device_id = Number(params.device_id);
            if(isNaN(device_id))device_id=0;


            this.decicesManager = new DevicesManager(this.options.serverURL);

            this.decicesManager.loadDevice(device_id);
            this.decicesManager.startAoutCheck();

            this.decicesManager.onNewDeviceLoaded = (device:htplayer.VODevice)=>{
                this.createLayout(device.layout);

            }
        }

        createLayout(layout:htplayer.VOLayout):void{
            if(this.layoutModel){
                window.location.reload();
                return
            }
            this.layoutModel = new LayoutController(this.options.serverURL);
            this.layoutModel.setLayout(layout);
            this.layoutModel.appendTo(this.$container);
        }


        onNeedLogin():void{
           this.$container.load('myversion/login.html');
            this.debug.show('need login');
        }
    }
}