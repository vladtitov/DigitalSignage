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
            var params = UtilsServices.utils.getUrlParams();
            console.log(params);
            if (!params || !params.layout_id) {
                console.warn('heed layout_id');
                return;
            }
            htplayer.playerURL = '/api/';
            var id = params.layout_id;
            this.player = new htplayer.HTMyPlayer('#ViewportsContainer');
            this.player.loadLayout(id);
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