/**
 * Created by Vlad on 8/19/2016.
 */
///<reference path="../models.ts"/>
var hbrowser;
(function (hbrowser) {
    var DevicesManager = (function () {
        function DevicesManager(serverURL) {
            this.serverURL = serverURL;
            this.myinterval = 0;
        }
        DevicesManager.prototype.loadFromStorage = function () {
            try {
                this.mydevice = new htplayer.VODevice(JSON.parse(localStorage.getItem('mydevice')));
            }
            catch (e) {
                console.log(e);
            }
            // console.log(this.mydevice);
            if (this.mydevice && this.mydevice.id) {
                this.device_id = this.mydevice.id;
                this.loadDevice(this.device_id);
            }
            else if (this.onNeedDevice)
                this.onNeedDevice();
        };
        DevicesManager.prototype.startAoutCheck = function (delay) {
            var _this = this;
            if (!delay)
                delay = 10000;
            if (this.myinterval == 0)
                this.myinterval = setInterval(function () { return _this.loadDevice(); }, delay);
        };
        DevicesManager.prototype.stopAutoCheck = function () {
            clearInterval(this.myinterval);
            this.myinterval = 0;
        };
        DevicesManager.prototype.isOldDeviceData = function (newD) {
            var oldD = this.mydevice;
            if (oldD && oldD.timestamp == newD.timestamp && oldD.layout.props.id == newD.layout.props.id && oldD.layout.props.timestamp == newD.layout.props.timestamp)
                return true;
            return false;
        };
        DevicesManager.prototype._onDeviceLoaded = function (res) {
            //console.log(res);
            if (res.data) {
                var device = new htplayer.VODevice(res.data);
                if (this.isOldDeviceData(device)) {
                    console.log('old device and layout');
                    return;
                }
                else {
                    console.log('new  device or layout');
                    this.mydevice = new htplayer.VODevice(res.data);
                    localStorage.setItem('mydevice', JSON.stringify(this.mydevice));
                    if (this.onNewDeviceLoaded)
                        this.onNewDeviceLoaded(this.mydevice);
                }
                if (this.onDeviceLoaded)
                    this.onDeviceLoaded(this.mydevice);
            }
            else
                this._onError(res);
        };
        DevicesManager.prototype.loadDevice = function (device_id) {
            var _this = this;
            if (device_id)
                this.device_id = device_id;
            if (!this.device_id)
                return false;
            $.get(this.serverURL + '/device/' + this.device_id).done(function (res) { return _this._onDeviceLoaded(res); }).fail(function (err) { return _this._onError(err); });
            return true;
        };
        DevicesManager.prototype._onError = function (err) {
            //console.error(err);
            if (this.onError)
                this.onError(err);
        };
        return DevicesManager;
    }());
    hbrowser.DevicesManager = DevicesManager;
})(hbrowser || (hbrowser = {}));
//# sourceMappingURL=DevicesManager.js.map