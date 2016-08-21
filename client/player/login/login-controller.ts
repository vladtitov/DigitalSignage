
///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="../../typings/moment/moment.d.ts"/>
///<reference path="../../typings/underscore/underscore.d.ts"/>

///<reference path="../models.ts"/>
///<reference path="login-screen.ts"/>
///<reference path="crete-account.ts"/>
///<reference path="forget-password.ts"/>
///<reference path="devices-list.ts"/>

declare var  MyApplicationLoadHTML:any;
module htplayer{


   export  var  showTip = function(message,obj:JQuery){
                var tip:JQuery = $('#Library #ToolTip').clone().html('<span class="fa fa-minus-circle"></span> <span>'+message+'</span>').offset(obj.offset());
                tip.appendTo('body');
                setTimeout(function () {
                    tip.remove();
                },3000)
            }


    export class LoginController{
        $outlet:JQuery;
        $view:JQuery;

        userdata:VOUserData;
        mydevice:VODevice;



        constructor(){
            console.log('login controller          ');

            this.$view = $('#MainContainer');
            this.$outlet = this.$view.find('.route-outlet').first();

            $.ajaxSetup({
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                }
            });

            try {
               this.userdata = JSON.parse(localStorage.getItem('userdata'));
            }catch (e){

                console.log('error LoginController.constructor  ',e);
            }


            //console.log('this.userdata    ',this.userdata)
            this.doLogin('at start')
        }

        isAppReady:boolean;




        onReady(){


        }

        checkInterval:number;


        closeLoginModule():void{
                if(typeof MyApplicationLoadHTML =='undefined') window.location.href='htplayer.html'
                 else MyApplicationLoadHTML('htplayer.html');
        }

        onDevicesComplete(device:VODevice):void{
            this.mydevice = device;
           // console.log(device);
            localStorage.setItem('mydevice',JSON.stringify(this.mydevice));
            this.closeLoginModule();


        }

        devicesList:DevicesList;
        doDevices():void{
           this.devicesList= new DevicesList(this.userdata);
            this.devicesList.onComplete =device=>this.onDevicesComplete(device);
            this.devicesList.onFail = ()=>this.doLogin('device fail');
            this.$outlet.children().remove();
            this.devicesList.appendTo(this.$outlet);
            this.devicesList.addListeners();

        }
        onLoginComplete(userdata:VOUserData):void{
           this.userdata = userdata;
            localStorage.setItem('userdata',JSON.stringify(this.userdata));
            this.doDevices();
        }

       login:LoginScreen;
        doLogin(reason:string):void{
            console.log('login '+reason);
            this.login  = new LoginScreen(this.userdata);
            this.login.onComplete = userdata=>this.onLoginComplete(userdata);
            this.$outlet.children().remove();
            this.login.appendTo(this.$outlet);
            this.login.onClose = ()=>this.closeLoginModule();
        }
    }

}


$(document).ready(()=>new htplayer. LoginController())