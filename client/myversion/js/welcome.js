/**
 * Created by Vlad on 8/13/2016.
 */
var htplayer;
(function (htplayer) {
    var Welcome = (function () {
        function Welcome() {
            console.log('from welcome');
        }
        return Welcome;
    }());
    htplayer.Welcome = Welcome;
})(htplayer || (htplayer = {}));
$(document).ready(function () {
    var welcome = new htplayer.Welcome();
});
//# sourceMappingURL=welcome.js.map