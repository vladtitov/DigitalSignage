/**
 * Created by Vlad on 8/19/2016.
 */
///<reference path="../models.ts"/>
///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="DeviceModel.ts"/>
var hbrowser;
(function (hbrowser) {
    var DevicesList = (function () {
        function DevicesList() {
        }
        DevicesList.prototype.addListeners = function () {
            var _this = this;
            this.$submit = this.$view.find('.submit').first().click(function () {
                if (_this.selectedDevice) {
                    if (_this.onComplete) {
                        var dev = new htplayer.VODevice({
                            id: _this.selectedDevice.id,
                            // label:this.selectedDevice.layout,
                            description: _this.selectedDevice.description,
                            layout_id: _this.selectedDevice.layout_id,
                            timestamp: _this.selectedDevice.timestamp
                        });
                        _this.onComplete(dev);
                    }
                }
                else
                    _this.$submit.prop('disabled', true);
            });
            this.$submit.prop('disabled', true);
            this.$list.on('click', '.mydevice', function (evt) {
                var id = $(evt.currentTarget).data('id');
                if (isNaN(id))
                    return;
                if (_this.selectedDevice)
                    _this.selectedDevice.selected = false;
                _this.$submit.prop('disabled', false);
                _this.selectedDevice = _this.getDeviceByIg(id)[0];
                _this.selectedDevice.selected = true;
            });
        };
        DevicesList.prototype.createView = function () {
            this.$view = $('<div>').addClass('devices-list-view text-center row');
            this.$submit = $('<button>').text('Sign this devise').prop('disabled', true).addClass('btn btn-primary').appendTo(this.$view);
            var row = $('<div>').addClass('row').appendTo(this.$view);
            this.$list = $('<div>').addClass('devices-list row').appendTo(row);
        };
        DevicesList.prototype.appendTo = function ($outlet) {
            if (!this.$view)
                this.createView();
            this.$view.appendTo($outlet);
            this.addListeners();
        };
        DevicesList.prototype.getDeviceByIg = function (id) {
            return this.devices.filter(function (item) { return item.id == id; });
        };
        DevicesList.prototype.loadDevices = function (url) {
            var _this = this;
            $.get(url).done(function (res) {
                var list = res.data;
                if (!list) {
                    console.warn(res);
                    return;
                }
                console.log(res.data);
                _this.metadata = res.metadata || [];
                _this.devices = list.map(function (item) { return new hbrowser.DeviceModel(item); });
                _this.showDevices();
                _this.showMetadata();
            }).fail(function () { return _this.onFail(); });
        };
        DevicesList.prototype.showMetadata = function () {
            var out = '<ul>';
            this.metadata.forEach(function (item) {
                out += '<li><label>' + item.label + '</label><span>' + item.value + '</span></li>';
            });
            out += '</ul>';
            this.$view.find('.metadata').first().html(out);
        };
        DevicesList.prototype.showDevices = function () {
            var list1 = this.$list;
            //   var list2=$('<div>');
            this.devices.forEach(function (item) {
                if (item.layout_id)
                    list1.append(item.$view);
                //  else list2.append(item.$view);
            });
            this.$list.append(list1);
            //  this.$list.append(list2);
        };
        return DevicesList;
    }());
    hbrowser.DevicesList = DevicesList;
})(hbrowser || (hbrowser = {}));
//# sourceMappingURL=DevicesList.js.map