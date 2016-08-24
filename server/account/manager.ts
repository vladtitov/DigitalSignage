/**
 * Created by Vlad on 8/8/2016.
 */
///<reference path="../../server.ts"/>
import * as express from 'express';

import {User} from "./User";
import {error} from "util";
import {RUsers} from "../db/dbmodels";


const router = express.Router();

router.get('/login/:token',function (request:express.Request, response:express.Response) {
    var folder:string = request.session['user_folder'];
    if(!folder){
        var token = request.params.token;
        if(!token){
            response.json({error:'token'});
            return
        }

        var ctr:User = new User();
        ctr.getUserByToken(token).done(
            (user)=> {
                var out: any = {};
                out.result = 'logedin';
                out.token = user.token;
                out.sid = user.sid;
                out.namesp = user.folder;
                out.role = user.role;
                request.session['user_folder'] = user.folder;
                request.session['user_role'] = user.role;
                request.session['user_ID'] = user.id;
                request.session.save(err=> {
                    if(err)response.json({error:err});
                    else {
                        console.log('User loggedin ',out);
                        response.json({data:out});
                    }
                })
            }
            ,error=>response.json({error:error})
        )
    } response.json({error:'logoutfirst'});

});

router.get('/logout',function (request:express.Request, response:express.Response) {
    request.session['user_folder'] = 'folder_dev';
    request.session.destroy((err)=>{
        if(err)response.json({err:err})
        else response.json({data:'logoutsuccess'});
    })
});

router.post('/login', function (request:express.Request, response:express.Response) {
    var body:any=request.body;
    var  sid = request.session['id'];

    console.log('login body', body);

    var ip:string =  request.connection.remoteAddress;
    var password = body.password;
    console.log('password ', password);
    if(password && password.length>5){
        var ctr:User = new User();
        ctr.login(body.username,body.password,sid,ip).done(
            (user)=> {
                var out: any = {};
                out.result = 'logedin';
                out.token = user.token;
                out.sid = user.sid;
                out.namesp = user.folder;
                out.role = user.role;
                request.session['user_folder'] = user.folder;
                request.session['user_role'] = user.role;
                request.session['user_ID'] = user.id;
                request.session.save(err=> {
                    if(err)response.json({error:err});
                    else {
                        console.log('User loggedin ',out);
                        response.json({data:out});
                    }
                })
            }
            ,error=>response.json({error:error})

        )


    }else  response.json({error:'reqired'})
})

router.post('/loginplayer', function (request:express.Request, response:express.Response) {
    var body:any=request.body;
    var ip:string =  request.connection.remoteAddress;
    var password = body.password;
    if(password && password.length>5){
        var ctr:User = new User();

        ctr.loginPlayer(body.username.trim(),body.password.trim(),body.devicedata,ip).done(
            (user)=> {
                var out: any = {};
                out.result = 'logedin';
                out.token = user.token;
               // out.sid = user.sid;
                out.namesp = user.folder;
                out.role = 'player';
                request.session['user_folder'] = user.folder;
                request.session['user_role'] ='player';
                request.session['user_ID'] = user.id;
                request.session.save(err=> {
                    if(err)response.json({error:err});
                    else {
                        console.log('User loggedin ',out);
                        response.json({data:out});
                    }
                })
            }
            ,error=>response.json({error:error})

        )


    }else  response.json({error:'reqired'})
})
router.post('/new-user-player', function (request:express.Request, response:express.Response) {
    var body:any=request.body;
   var ip:string =  request.connection.remoteAddress;
    var password = body.password;
    if(password && password.length>5){

        var user:User = new User();

        user.createUser(body.username,body.password,ip,'player').done(
            (newuser:RUsers)=>{
                console.log(newuser);
                user.createAccount(newuser).done(
                    final => response.json({data:final})
                    ,error=>response.json({error:error})
                );
            }
            ,error=>response.json({error:error})
        )


    }else  response.json({error:'reqired'});

});


router.get('/userdevices', function (request:express.Request, response:express.Response) {
    var folder:string = request.session['user_folder'];
    var user:User = new User();
    if(!folder){
        response.json({error:'login'});
        return;
    }
    user.getAllDevices(folder).done(
        res1=>{
            if(isNaN(request.session['user_ID']))response.json({data:res1})
            else user.getMetadata(request.session['user_ID']).done(
                res2=> response.json({data:res1,metadata:res2})
                ,err=>response.json({error:err})
            )
        }
        ,err=>response.json({error:err})
    )
});



export = router