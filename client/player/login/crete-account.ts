/**
 * Created by Vlad on 8/14/2016.
 */


module htplayer{
    export class CreateNewAccount{
        $btnSubmit:JQuery;
        userdata:VOUserData;
        $username:JQuery;
        $password:JQuery;

        $btnClose:JQuery;

        onComplete:Function;
        onClose:Function;
        $view:JQuery;

        $showpassord:JQuery;
        constructor(){

            this.$view = $('#CreateNewAccount');
            this.$password= this.$view.find('.password').first();
            // this.$password2 = this.$view.find('.password2');
            this.$username = this.$view.find('.username');

            this.$btnSubmit = this.$view.find('.submit').first();
        }

        appendTo($cont:JQuery):void{
            $cont.append((this.$view))
            this.addListeners();
        }
        addListeners():void{

            this.$btnClose = this.$view.find('.close').click(()=>{
                //console.log('close');
                if( this.onClose) this.onClose();
            });

            this.$showpassord = this.$view.find('.showpassword').first().click(()=>{

                if(!this.$showpassord.prop('checked')){
                    this.$password.prop('type','password');
                }else  this.$password.prop('type','text');
            })

            this.$btnSubmit.click((evt)=>this.onSubmitClick(evt))
        }

        getEmail():string{
            var email:string = this.$username.val();
            var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if(re.test(email)){

                return email;

            }else{
                showTip('input valid email adress',this.$username);
            }
        }


        onSubmitClick(evt):void{
            this.$btnSubmit.prop('disabled',true);
            setTimeout(()=>{
                this.$btnSubmit.prop('disabled',false);
            },2000);

            var email:string = this.getEmail();
            var password = this.$password.val()
            //var password2 = this.$password2.val()

            if(password.length<6) {
                showTip('Password should be minimum 6 chars',this.$password);
                return
            }

            if(email){
                this.userdata = new VOUserData({})
                this.userdata.username = email;
                this.userdata.password = password;
                $.post(server+'account/new-user-player',
                    this.userdata
                ).done((res)=>{
                    console.log(res);
                    if(res.data && res.data.token) {
                        this.userdata = new VOUserData(res.data)
                        this.userdata.username = email;
                        this.userdata.password = password;
                        if(this.onComplete)this.onComplete(this.userdata);
                    }else{
                        if(res.error.exists){
                            alert('User exists with this email');
                            /// if(this.onExists)  this.onExists();
                        }else  showTip('Error processing request', this.$btnSubmit);

                    }


                })
            }


        }
    }
}