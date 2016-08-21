/**
 * Created by Vlad on 8/20/2016.
 */
///<reference path="../models.ts"/>
var hbrowser;
(function (hbrowser) {
    var LayoutController = (function () {
        function LayoutController(serverURL) {
            this.serverURL = serverURL;
            this.$view = $('<div>').addClass('player-layout');
            this.screenHeight = $(window).height();
            this.screenWidth = $(window).width();
        }
        LayoutController.prototype.appendTo = function ($container) {
            $container.append(this.$view);
        };
        LayoutController.prototype.setLayout = function (layout) {
            this.layout = layout;
            var dw = this.screenWidth / layout.props.width;
            var dh = this.screenHeight / layout.props.height;
            hbrowser.PlayerModel.dx = dw;
            hbrowser.PlayerModel.dy = dh;
            console.log(dw + ' ' + dh);
            this.createViewPorts(layout.viewports);
        };
        LayoutController.prototype.createViewPorts = function (viewports) {
            var view = this.$view;
            var out = [];
            var server = this.serverURL;
            var w = this.screenWidth;
            var h = this.screenHeight;
            viewports.forEach(function (vp) {
                var ctr = new hbrowser.PlayerController(server, vp);
                out.push(ctr);
                ctr.appendTo(view);
                ctr.onReady = function () {
                    ctr.startPlay();
                    ctr.onReady = null;
                };
            });
            this.playerControllers = out;
        };
        return LayoutController;
    }());
    hbrowser.LayoutController = LayoutController;
})(hbrowser || (hbrowser = {}));
//# sourceMappingURL=layout-controller.js.map