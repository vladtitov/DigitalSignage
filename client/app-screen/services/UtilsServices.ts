/**
 * Created by Vlad on 7/17/2016.
 */
import {Injectable} from "@angular/core";

@Injectable()
export class UtilsServices{

    getUrlParams(str:string):any{
            var ar:string[] = str.split('?');
            if(ar.length==1) return null;
            ar.shift();
        let out:any=[]
            ar.forEach(item=>this.parserParams(out,item));
      return out;

    }
    parserParams(out:any,str:string):any{
        let ar:string[] = str.split('&');
        ar.forEach(function (item) {
            var vars:string[] = item.split('=');
            if(vars.length===2) out[vars[0]]=isNaN(Number(vars[1]))?vars[1]:Number(vars[1]);
        })
        return out;
    }
}

