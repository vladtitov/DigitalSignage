/**
 * Created by Vlad on 8/19/2016.
 */

///<reference path="../models.ts"/>

module hbrowser{

    import VODevice = htplayer.VODevice;
    export class DevicesManager{
        mydevice:htplayer.VODevice;
        onNeedDevice:Function;
        onDevice:Function;
        onNewDeviceLoaded:Function;
        onDeviceLoaded:Function;
        onError:Function;

        device_id:number;

        constructor(private serverURL:string){

        }



        loadFromStorage():void{
            try{
                this.mydevice = new htplayer.VODevice(JSON.parse(localStorage.getItem('mydevice')));
            }catch(e){
                console.log(e);
            }

           // console.log(this.mydevice);
            if(this.mydevice &&  this.mydevice.id){
                this.device_id = this.mydevice.id;
                this.loadDevice(this.device_id);            }
            else if(this.onNeedDevice) this.onNeedDevice();

        }



        myinterval:any=0;
        startAoutCheck(delay?:number):void{
            if(!delay) delay = 10000;
            if(this.myinterval ==0) this.myinterval = setInterval(()=>this.loadDevice(),delay);
        }

        stopAutoCheck():void{
            clearInterval(this.myinterval);
            this.myinterval=0;
        }

        isOldDeviceData(newD:VODevice):boolean{
            var oldD:VODevice = this.mydevice;
               if(oldD && oldD.timestamp == newD.timestamp && oldD.layout.props.id == newD.layout.props.id && oldD.layout.props.timestamp == newD.layout.props.timestamp )  return true
            return false;
        }

        private _onDeviceLoaded(res:any):void{
            //console.log(res);
            if(res.data){
                var device: htplayer.VODevice = new htplayer.VODevice(res.data);

                if(this.isOldDeviceData(device)){
                    console.log('old device and layout');
                    return;
                }else{
                    console.log('new  device or layout');
                    this.mydevice = new htplayer.VODevice(res.data)
                    localStorage.setItem('mydevice',JSON.stringify(this.mydevice));
                    if(this.onNewDeviceLoaded)this.onNewDeviceLoaded(this.mydevice);
                }

                if(this.onDeviceLoaded)this.onDeviceLoaded(this.mydevice);
            }else this._onError(res);
        }

        loadDevice(device_id?:number):boolean{
            if(device_id) this.device_id = device_id;
            if(!this.device_id) return false

            $.get(this.serverURL+'/device/'+this.device_id).done(
                res=>this._onDeviceLoaded(res)
            ).fail(err=>this._onError(err));
            return true
        }

       private  _onError(err):void{
           //console.error(err);
           if(this.onError)this.onError(err)
        }



}

}