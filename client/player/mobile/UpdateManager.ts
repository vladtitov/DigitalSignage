/**
 * Created by Vlad on 8/19/2016.
 */
///<reference path="../models.ts"/>

module htplayer{
    export class UpdateManager{

        static online:boolean;
        userdata:VOUserData;
        mydevice:VODevice;
        mylayout:VOLayout;

        onNewLayout:Function;
        onReady:Function;
        onError:Function;
        onNeedLogin:Function

        constructor(){

        }

        start():void{

            try{
                this.userdata =  new VOUserData(JSON.parse(localStorage.getItem('userdata')));
            }catch(e){
                console.log(e);
            }


            //  console.log('userdata ',this.userdata);


            if(!this.userdata || !this.userdata.token){
                if(this.onNeedLogin) this.onNeedLogin();
                return;
            }

            playerURL = server +'player/'+ this.userdata.token+'/';

            try{
                this.mydevice = new VODevice(JSON.parse(localStorage.getItem('mydevice')));
            }catch(e){
                console.log(e);
            }

            if(!this.mydevice){
                if(this.onNeedLogin) this.onNeedLogin();
                return;

            }
            // console.log('mydevice     ',this.mydevice);



            try{
                this.mylayout = new VOLayout(JSON.parse(localStorage.getItem('mylayout')));
            }catch(e){
                console.log(e);
            }

            // console.log('mylayout ',this.mylayout);


            if(!this.mylayout){ this.loadLayout();
            }else {
                if(UpdateManager.online) this.loadDevice();
                else {
                    console.log('on ready');
                    if(this.onReady)this.onReady(this.mylayout);
                }

            }

        }

        loadDevice():void{

            var url:string = playerURL+'mydevice-stats/'+this.mydevice.id;
            console.log('load device '+url);
            $.get(url).done((res)=>{
                //  console.log(res);
                if(res.data){
                    var olddevice = this.mydevice;
                    this.mydevice = new VODevice(res.data);
                    localStorage.setItem('mydevice',JSON.stringify(this.mydevice));
                    this.loadLayout();

                }else console.warn(res)
            })
        }
        onOldLayout(){
            if(this.onReady)this.onReady(this.mylayout);
        }


        loadLayout():void{
            var url:string = playerURL+'layout/'+this.mydevice.layout_id;
            console.log('load layout '+url);
            $.get(url).done((res)=>{
                /// console.log(res);


                if(res.data){

                    var oldLayout = this.mylayout;
                    this.mylayout = new VOLayout(res.data);
                    if(this.onReady)this.onReady(this.mylayout);
                    if(oldLayout  && this.mylayout.id ===oldLayout .id && this.mylayout.timestamp == oldLayout.timestamp){
                        this.onOldLayout();

                    }
                    else {
                        localStorage.setItem('mylayout',JSON.stringify(this.mylayout));
                        if(this.onNewLayout) this.onNewLayout(this.mylayout);
                    }



                }else console.warn(res)
            })

        }


        saveData():void{
            localStorage.setItem('userdata',JSON.stringify(this.userdata));
            localStorage.setItem('mydevice',JSON.stringify(this.mydevice));

        }
        saveLayout():void{
            console.log('savong ',this.mylayout);
            localStorage.setItem('mylayout',JSON.stringify(this.mylayout));
        }
    }
}