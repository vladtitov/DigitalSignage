/**
 * Created by Vlad on 8/14/2016.
 */
module htplayer{
    export class ForgetPassword{
        $btnSubmit:JQuery;
        $btnClose:JQuery
        $username:JQuery;
        onComplete:Function;
        onClose:Function;
        $view:JQuery;
        $message:JQuery;

        setUserName(username:string):void{
            this.$username.text(username);
        }
        constructor(){
            this.$view=$('#ForgetPassword');
            this.$username =this.$view.find('.username').first();
            this.$message = this.$view.find('.message');
        }

        addListeners():void{
            this.$view.find('.close').click( ()=>{
                if(this.onClose)this.onClose();
            })

            this.$btnSubmit=this.$view.find('.submit').first().click(()=>this.onSubmitClick());
            this.$btnClose = this.$view.find('.close').click(()=>{
                if( this.onClose) this.onClose();
            });
        }

        appendTo($cont:JQuery):void{
            $cont.append(this.$view);
            this.addListeners();

        }

        setUsername(text:string):void{
            this.$username.text(text)
        }
        onSubmitClick():void{
            this.$btnSubmit.prop('disabled',true);
            setTimeout(()=>{
                this.$btnSubmit.prop('disabled',false);
            },2000);

            $.post(server+'account/forgetpassword', this.$username.text()
            ).done((res)=>{
                if(res.data) {
                    this.$message.text('Email sent to you with confirmation to reset password');

                }else{
                    showTip('Error processing request',this.$btnSubmit);
                }


            })

        }
    }

}