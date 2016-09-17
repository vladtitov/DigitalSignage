import {Component, OnInit} from '@angular/core';
import './rxjs-operators';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'my-app',
    template:`    
    <nav>     
     <a [routerLink]="['./content-manager','view',0]" class="btn"><span class="fa fa-picture-o"></span> Content</a>
     <a [routerLink]="['./playlist-library']" class="btn"><span class="fa fa-film"></span> Playlists library</a>
     <a [routerLink]="['./layouts-assembled']" class="btn"><span class="fa fa-th-large"></span> Layouts</a>
     <a [routerLink]="['./layout-template',-1]" class="btn"><span class="fa fa-magic"></span> New Layout</a>  
     <a [routerLink]="['./devices-manager', 0]" class="btn"><span class="fa fa-desktop"></span> Publish</a>
     <a  (click)="logoutServer()" class="btn" style="float: right"><span class="fa fa-sign-out"></span> Sign Out</a>
   
     
    </nav>
    <router-outlet></router-outlet>
  `,
})

export class AppComponent implements OnInit {

    constructor(private http:Http) { }

    private dataUrl = 'account/';
    private logoutUrl ='logout';

    ngOnInit(){
        $('#PRELOADER').remove()
    }

    logoutServer(){

        // let body = JSON.stringify(data);
        // console.log('body ', body);
        let headers = new Headers({ 'Content-Type': 'application/json' }); //'application/x-www-form-urlencoded'
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.dataUrl+this.logoutUrl)
            .map(this.parseOne)
            .catch(this.handleError)
            .subscribe((res)=>{
                console.log('onSubmit res: ', res);
                // this.router.navigate(["./dashboard/content-manager",'view',0]);
                localStorage.removeItem("myuser");
                window.location.href = "/login";
            }, (err)=>{
                console.log('onSubmit error ', err);
                this.handleError(err); // = <any>err;
            });
    }

    private parseOne(res: Response) {
        let body = res.json();
        if(!body.data){
            console.error('data is missing');
        }
        return body.data || { };
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}




