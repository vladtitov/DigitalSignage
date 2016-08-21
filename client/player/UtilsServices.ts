/**
 * Created by Vlad on 7/17/2016.
 */

class UtilsServices{

   static  utils:UtilsServices = new UtilsServices();
    getUrlParams():any{
        var str= window.location.href;
            var ar:string[] = str.split('?');
            if(ar.length==1) return null;
            ar.shift();
        let out:any=[]
            ar.forEach(item=>this.parserParams(out,item));

      return out;

    }



    setParams(obj){
        var paramsString = "?";
        for(let key in obj){
            paramsString += key + "=" + obj[key] + "&";
        }
        paramsString = paramsString.substring(0, paramsString.length - 1);
        window.location.href = window.location.origin + window.location.pathname + paramsString;
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

