/**
 * Created by Vlad on 8/7/2016.
 */

///<reference path="../models.ts"/>


module htplayer{

    export class LoginScreen{
        $view:JQuery;
        $btnSubmit:JQuery
        $form:JQuery
        onComplete:Function;
        onClose:Function;
        createNewAccount:CreateNewAccount;
        forgetPassword: ForgetPassword;
        $showpassord:JQuery;
        $password:JQuery
        $account:JQuery
        $newuser:JQuery;
        $username:JQuery;
        $btnForgetPassword:JQuery;
        $btnClose:JQuery
       // $container:JQuery


        $outlet:JQuery


        $loginview:JQuery

        constructor(private userdata?:VOUserData ){
            this.init();
        }

        init():void{
            this.$account = $('#AccountScreen');
            this.$view = $('#LoginView');
            this.$username = this.$view.find('.username').first();
            this.$password = this.$view.find('.password').first();
            this.$btnSubmit =  this.$view.find('.submit').first();
            this.$outlet= this.$account.find('.route-outlet');
            this.$form = this.$view.find('form');
            this.$btnClose = this.$view.find('.close');


            if(this.userdata){
                this.$username.val(this.userdata.username);
                this.$password.val(this.userdata.password)
            }

            this.createNewAccount = new CreateNewAccount();
            this.createNewAccount.$view.hide();
            this.createNewAccount.onClose = ()=>{
                this.switchContent(this.$view);
                this.addVisteners();
            }
            this.createNewAccount.onComplete = (userdata:VOUserData)=>{
                this.userdata = userdata;
                if(this.onComplete)this.onComplete(this.userdata);
            }

            this.forgetPassword = new ForgetPassword();
            this.forgetPassword.$view.hide();

            this.forgetPassword.onClose = ()=>{
                this.switchContent(this.$view);
                this.addVisteners();
            }

            this.$btnForgetPassword = this.$view.find('.forgetpassword').first();
            this.$showpassord = this.$view.find('.showpassword').first();
            this.$newuser =  this.$view.find('.newuser').first();
            this.addVisteners();
        }


        addVisteners():void{
            this.$btnClose.click(()=>{
                if(this.onClose) this.onClose()
            })
            this.$btnForgetPassword.click(()=>{
                var email:string = this.getEmail();
                console.log(email);
                if(email){
                    this.forgetPassword.setUsername(email);
                    this.switchContent(this.forgetPassword.$view)
                    this.forgetPassword.addListeners();
                }
            })

            this.$showpassord.click(()=>{

                if(!this.$showpassord.prop('checked')){
                    this.$password.prop('type','password');
                }else  this.$password.prop('type','text');
            })

            this.$btnSubmit.click((evt)=>this.onSubmitClick(evt));

            this.$newuser.click(
                ()=>{
                    this.switchContent(this.createNewAccount.$view);
                    this.createNewAccount.addListeners();

                }
            )

         }

        appendTo($outlet):void{
            this.$account.appendTo($outlet);
            this.addVisteners()
            this.$view.show();
        }



        switchContent($newvie:JQuery):void{
            var cont:JQuery = this.$outlet.children().remove();
            $newvie.removeClass('hide').addClass('show');
            $newvie.show();
            this.$outlet.append($newvie);
        }
        onSubmitClick(evt):void{
            this.$btnSubmit.prop('disabled',true);
            setTimeout(()=>{ this.$btnSubmit.prop('disabled',false);},1000);
           this.validateForm();
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





        validateForm():void{
            var valid:boolean = true
            var email:string = this.getEmail();

            var password = this.$password.val();
            if(password.length<6) {
                showTip('Password should be minimum 6 chars',this.$password);
                return
            }

            if(email){
                if(!this.userdata) this.userdata = new VOUserData({})
                this.userdata.username = email;
                this.userdata.password = password;
                $.post(server+'account/loginplayer',
                    this.userdata
                ).done((res)=>{
                    console.log(res)
                    if(res.data && res.data.token) {
                        this.userdata = new VOUserData(res.data)
                        this.userdata.username = email;
                        this.userdata.password = password;
                        if(this.onComplete)this.onComplete(this.userdata);
                    }else{
                        showTip('invalid username or password', this.$btnSubmit);
                    }


                })
            }

        }
        destroy(){
            this.$view.remove();
        }
    }
}