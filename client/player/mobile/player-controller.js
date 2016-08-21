///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="../../typings/moment/moment.d.ts"/>
///<reference path="../../typings/underscore/underscore.d.ts"/>
///<reference path="../htplayer/ht-payer.ts"/>
///<reference path="../models.ts"/>
///<reference path="../UtilsServices.ts"/>
///<reference path="Library.ts"/>
///<reference path="../htplayer/AssetsModel.ts"/>
///<reference path="../htplayer/viewport-model.ts"/>
var htplayer;
(function (htplayer) {
    var PlayerController = (function () {
        function PlayerController() {
            var _this = this;
            var params = UtilsServices.utils.getUrlParams();
            if (params && params.callback)
                this.callback = params.callback;
            htplayer.UpdateManager.online = true;
            console.log('htplayer comiled          ');
            this.$view = $('#MainPlayerContainer');
            $.ajaxSetup({
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                }
            });
            this.updateManager = new htplayer.UpdateManager();
            this.updateManager.onReady = function () { return _this.startPlayer(); };
            this.updateManager.onNeedLogin = function () { return _this.onNeedLogin(); };
            this.updateManager.onNewLayout = function (layout) { return _this.onNewLayout(layout); };
            if (MainLibrary.library.getFilesystem()) {
                MainLibrary.library.onReady = function () { return _this.updateManager.start(); };
                console.log('playing on device uodated');
            }
            else {
                this.updateManager.start();
                console.log('playing in browser');
            }
        }
        PlayerController.prototype.showTip = function (message, obj) {
            var tip = $('#Library #ToolTip').clone().html('<span class="fa fa-minus-circle"></span> <span>' + message + '</span>').offset(obj.offset());
            tip.appendTo('body');
            setTimeout(function () {
                tip.remove();
            }, 3000);
        };
        PlayerController.prototype.startPlayer = function () {
            this.updateManager.onReady = null;
            if (this.callback) {
                console.log('this.callback  ' + this.callback);
                console.log('this.callback  ' + decodeURI(this.callback));
            }
            console.log('starting player  device ' + this.updateManager.mydevice.id + ' layoyt' + this.updateManager.mylayout.id);
            this.player = new htplayer.HTMyPlayer('#HTMyPlayer');
            this.player.setNewLayout(this.updateManager.mylayout);
            this.player.appendTo(this.$view);
            this.player.start();
        };
        PlayerController.prototype.onNewLayout = function (layout) {
        };
        PlayerController.prototype.onNeedLogin = function () {
            window.location.href = 'player-login.html';
        };
        return PlayerController;
    }());
    htplayer.PlayerController = PlayerController;
})(htplayer || (htplayer = {}));
$(document).ready(function () { return new htplayer.PlayerController(); });
//# sourceMappingURL=player-controller.js.map