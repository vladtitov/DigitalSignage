/**
 * Created by Vlad on 8/13/2016.
 */

module htplayer{
    export class Welcome{

        constructor(){
            console.log('from welcome');
        }
    }
}

$(document).ready(function(){
    var welcome = new htplayer.Welcome();
})