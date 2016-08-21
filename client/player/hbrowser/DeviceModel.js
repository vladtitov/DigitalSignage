/**
 * Created by Vlad on 8/19/2016.
 */
var hbrowser;
(function (hbrowser) {
    var DeviceModel = (function () {
        function DeviceModel(obj) {
            for (var str in obj)
                this[str] = obj[str];
            var cl;
            this.$view = $('<div>').addClass('mydevice').data('id', this.id);
            var icon = '<div class="fa fa-desktop"></div>';
            var label = '<div>' + this.label + '</div>';
            var descr = '<div>' + this.description + '</div>';
            var props = '<div>' + label + descr + '</div>';
            this.$deviceView = $('<div>').addClass('mydevice-view').html(icon + props).appendTo(this.$view);
            if (this.image) {
                var layout = '<div><img src="' + this.image + '"/></div>';
                this.$layoutView = $('<div>').addClass('layout').html(layout).appendTo(this.$view);
            }
        }
        Object.defineProperty(DeviceModel.prototype, "selected", {
            set: function (sel) {
                sel ? this.$view.addClass('selected') : this.$view.removeClass('selected');
            },
            enumerable: true,
            configurable: true
        });
        return DeviceModel;
    }());
    hbrowser.DeviceModel = DeviceModel;
})(hbrowser || (hbrowser = {}));
//# sourceMappingURL=DeviceModel.js.map