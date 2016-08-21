/**
 * Created by Vlad on 8/19/2016.
 */
///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="../UtilsServices.ts"/>
///<reference path="Debugger.ts"/>
///<reference path="DevicesManager.ts"/>
var hbrowser;
(function (hbrowser) {
    var HBrowserController = (function () {
        function HBrowserController(options) {
            // console.log(options);
            this.options = options;
            this.$container = $('#MainContainer');
            this.debug = new hbrowser.Debugger();
            this.debug.start();
            this.initDeviceManager();
        }
        HBrowserController.prototype.initDeviceManager = function () {
            var _this = this;
            var params = UtilsServices.utils.getUrlParams();
            var device_id = 0;
            if (params && params.device_id)
                device_id = Number(params.device_id);
            if (isNaN(device_id))
                device_id = 0;
            this.decicesManager = new hbrowser.DevicesManager(this.options.serverURL);
            this.decicesManager.loadDevice(device_id);
            this.decicesManager.startAoutCheck();
            this.decicesManager.onNewDeviceLoaded = function (device) {
                _this.createLayout(device.layout);
            };
        };
        HBrowserController.prototype.createLayout = function (layout) {
            if (this.layoutModel) {
                window.location.reload();
                return;
            }
            this.layoutModel = new hbrowser.LayoutController(this.options.serverURL);
            this.layoutModel.setLayout(layout);
            this.layoutModel.appendTo(this.$container);
        };
        HBrowserController.prototype.onNeedLogin = function () {
            this.$container.load('myversion/login.html');
            this.debug.show('need login');
        };
        return HBrowserController;
    }());
    hbrowser.HBrowserController = HBrowserController;
})(hbrowser || (hbrowser = {}));
//# sourceMappingURL=hbrowser.js.map