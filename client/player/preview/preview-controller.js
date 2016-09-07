/**
 * Created by Vlad on 8/10/2016.
 */
///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="../../typings/moment/moment.d.ts"/>
///<reference path="../../typings/underscore/underscore.d.ts"/>
///<reference path="../../typings/cordova/cordova.d.ts"/>
///<reference path="../htplayer/ht-payer.ts"/>
///<reference path="../UtilsServices.ts"/>
var htplayer;
(function (htplayer) {
    var PreviewController = (function () {
        function PreviewController() {
            var _this = this;
            // let params:any = UtilsServices.utils.getUrlParams();
            var layout_id;
            var device_id;
            var playlist_id;
            var params = window.location.href.split('/');
            console.log('params: ', params);
            var ind = params.indexOf('layout');
            if (ind != -1) {
                layout_id = +params[ind + 1];
            }
            else {
                ind = params.indexOf('device');
                if (ind != -1) {
                    device_id = +params[ind + 1];
                }
                else {
                    ind = params.indexOf('playlist');
                    if (ind != -1) {
                        playlist_id = +params[ind + 1];
                    }
                }
            }
            console.log('layout_id', layout_id);
            console.log('device_id', device_id);
            console.log('playlist_id', playlist_id);
            if (!layout_id && !device_id && !playlist_id)
                return;
            console.log(params);
            htplayer.playerURL = '/api/';
            // let id = params.layout_id;
            this.player = new htplayer.HTMyPlayer('#ViewportsContainer');
            if (layout_id)
                this.player.loadLayout(layout_id);
            else if (device_id)
                this.player.loadDevice(device_id);
            this.player.onLayotLoaded = function () {
                _this.player.appendTo($('#MainContainer'));
                _this.fitToWindow();
            };
            $(window).resize(function () { return _this.fitToWindow(); });
        }
        PreviewController.prototype.fitToWindow = function () {
            var _this = this;
            // console.log('resize');
            if (this.delay)
                return;
            this.delay = true;
            setTimeout(function () { _this.delay = false; }, 1.2);
            var w = $(window).width();
            var h = $(window).height();
            var w2 = this.player.width();
            var h2 = this.player.height();
            var k = w / w2;
            $('#ViewportsContainer').css('transform', 'scale(' + k + ')');
        };
        return PreviewController;
    }());
    htplayer.PreviewController = PreviewController;
})(htplayer || (htplayer = {}));
//# sourceMappingURL=preview-controller.js.map