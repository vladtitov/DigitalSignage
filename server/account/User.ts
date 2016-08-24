import {RUsers} from "../db/dbmodels";
/**
 * Created by Vlad on 8/8/2016.
 */
///<reference path="../../server.ts"/>
declare var DBALL:string;


import {ObjectDatabase, IndexTable} from "../db/ObjectDatabase";
import Q = require('q');
import Promise = Q.Promise;
import {UpdateResult, VOPlaylist, VOAsset} from "../../client/app/services/models";
import {DBDriver} from "../db/dbDriver";

declare var WWW:string;
var crypto = require('crypto');

var fs = require('fs-extra');

export class User{
    secret = 'abcdefg';
    constructor(){    }



    copyFolder(destination:string):Promise<any>{

        var def: Q.Deferred<any> = Q.defer();
            var orig = WWW+'/clientAssets/folder_template';
            var dest = WWW+'/'+destination;

        fs.copy(orig,dest,(err)=>{
            if(err) def.reject(err);
            def.resolve(destination);
        })


        return def.promise
    }

    createAccount(user:RUsers):Promise<any>{
        var def: Q.Deferred<any> = Q.defer();

        user.folder = 'clientAssets/folder_'+user.id;
        console.log(user.folder);
        console.log(user)

       this.copyFolder(user.folder).done(
           res=>this.updateUsers(user).done(
               (update:UpdateResult)=>{
                   def.resolve({
                       token:user.token,
                       folder:user.folder
                   })
               }
               ,err=>def.reject(err)
           )
           ,err=>def.reject(err)
       )



        return def.promise
    }

    createUser(email:string,password:string,ip:string,role:string):Promise<any>{
        var def: Q.Deferred<any> = Q.defer();
        var users:RUsers = new RUsers()
        users.username = email;
        users.email = email;
        users.password = password;
        users.ip = ip;
        users.role = role;
        this.isUsernameExists(users.username).done(
            res=>{
                if(res){
                    def.reject({exists:email});
                }
                else  this.insertNewUaser(users).done(
                    (insert:UpdateResult)=> {
                        if(insert.insertId){
                            users.id = insert.insertId;
                            def.resolve(users)
                        }else def.reject(insert);
                    }
                    ,err=>def.reject(err)
                )
            })


        return def.promise
    }


    private updateUsers(user:RUsers):Promise<any>{
        var db = new DBDriver(null);
        return db.updateRow(user,'users');
    }
    private insertNewUaser(user:RUsers):Promise<any>{

        var db = new DBDriver(null);
        user.token = this.generateToken(user.username);
        user.created = Math.round(Date.now()/1000);
        return db.insertRow(user,'users');
    }
    isUsernameExists(email:string):Promise<any>{

        var db = new DBDriver(null);
        var sql:string ='SELECT *  FROM users WHERE username =?';
        console.log(sql+email);
        return db.selectOne(sql,[email]);
    }

    getAllDevices(folder:string):Promise<any>{
        var db = new DBDriver(folder);
        var sql:string ='SELECT devices.*, layouts.image FROM devices LEFT JOIN  layouts ON devices.layout_id=layouts.id';
        return db.queryAll(sql);
    }

    getMetadata(userid:number):Promise<any>{
        var db = new DBDriver(null);
        var sql:string ='SELECT company, city, email  FROM users WHERE id =?';
        return db.selectOne(sql,[userid]);
    }

    generateToken(str:string):string{
        return crypto.createHmac('sha256', this.secret).update(str).digest('hex');
    }
    getUserByToken(token:string):Promise<any>{
        var db:ObjectDatabase = new ObjectDatabase(null,'users');
        return db.selectByValues({
            token:token
        })

    }
    login(username:string,password:string,sid:string,ip:string):Promise<any>{
        console.log('user ', username, password);
        var pass = crypto.createHash('md5').update(password).digest('hex');
        var def: Q.Deferred<any> = Q.defer();
        var db:ObjectDatabase = new ObjectDatabase(null,'users');
        var values:any = {
            username:username
            ,password:pass
        }

       db.selectByValues(values).done((res:any[])=>{
            if(res && res.length){
                var user:any = res[0];
                if(!user.token) user.token = this.generateToken(username+pass);
                user.sid=sid;
                user.ip=ip;
                user.timestamp = Math.round(Date.now()/1000);

                db.updateContent(user).done(
                    res=>def.resolve(user)
                    ,err=>def.reject(err)
                )

            }else def.resolve({error:'wrong'});
        },err=>def.reject(err));

        return def.promise
    }

    loginPlayer(username:string,password:string,devicedata:string,ip:string):Promise<any>{
        console.log('loginPlayer  '+username +'  '+password);
        var pass = crypto.createHash('md5').update(password).digest('hex');

        var def: Q.Deferred<any> = Q.defer();


        var db:DBDriver = new DBDriver(null);

        var sql:string = 'SELECT id,token,role,folder FROM users WHERE username=? AND password=?';

        db.selectOne(sql,[username,pass]).done(
            users=>{
                if(users)def.resolve(users);
                else def.reject('wrong');
            }
            ,err=>def.reject(err)
        )

      /*  var db:ObjectDatabase = new ObjectDatabase(null,'users');
        var values:any = {
            username:username
            ,password:pass
        }*/
     /*   db.selectByValues(values).done((res:any[])=>{
            if(res && res.length){
                var user:any = res[0];
                user.devicedata = devicedata;
                if(!user.token){
                    user.token = this.generateToken(username);
                    db.updateContent(user).done(
                        res=>{
                            this.insertPlayerLogin(user,ip).done(
                                res=>def.resolve(user)
                                ,err=>def.reject(err)
                            )
                        }
                        ,err=>def.reject(err)
                    )
                }else {
                    this.insertPlayerLogin(user,ip).done(
                        res=>def.resolve(user)
                        ,err=>def.reject(err)
                    )
                }


            }else def.resolve({error:'wrong'});
        },err=>def.reject(err));
*/
        return def.promise
    }


    insertPlayerLogin(user,ip:string):Promise<any>{
        var id:number = user.id;
        var token:string = user.token;
        var folder:string = user.folder;
        var account_id:number = user.account_id;
        var stamp:number = Math.round(Date.now()/1000)
        var devicedata = user.devicedata
        var db2:DBDriver = new DBDriver(null);
        var sql:string ='INSERT INTO players (ip,user_id,token,folder,account_id,timestamp,devicedata) VALUES (?,?,?,?,?,?,?)';
        return db2.insertOne(sql,[ip,id,token,folder,account_id,stamp,devicedata]);

    }






}