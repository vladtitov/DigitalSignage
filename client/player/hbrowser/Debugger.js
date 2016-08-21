/**
 * Created by Vlad on 8/19/2016.
 */
var hbrowser;
(function (hbrowser) {
    var Debugger = (function () {
        function Debugger() {
        }
        Debugger.prototype.send = function (data) {
            if (typeof data == 'object')
                data = JSON.stringify(data);
            $.post('http://192.168.1.10:56888/debug', data);
        };
        Debugger.prototype.show = function (msg) {
            if (!this.$console)
                this.createConsole();
            this.$console.append(msg);
        };
        Debugger.prototype.rewriteconsole = function () {
            var _this = this;
            console.log = function (log) { return _this.send(log); };
            console.error = function (log) { return _this.send(log); };
            console.warn = function (log) { return _this.send(log); };
        };
        Debugger.prototype.createConsole = function () {
            this.$view = $('<div>').appendTo('body').css({
                position: 'absolute',
                top: 0,
                left: 0
            });
            this.$console = $('<div>').appendTo(this.$view).css({
                position: 'absolute',
                top: 0,
                left: 0
            });
        };
        Debugger.prototype.stop = function () {
            clearInterval(this.interval);
        };
        Debugger.prototype.start = function () {
            var _this = this;
            this.interval = setInterval(function () { return _this.checkReload(); }, 3000);
            this.rewriteconsole();
        };
        Debugger.prototype.checkReload = function () {
            $.get('http://192.168.1.10:56888/reload/' + Date.now()).done(function (res) {
                // this.show(res);
                if (res == 'reload')
                    window.location.reload();
            });
        };
        return Debugger;
    }());
    hbrowser.Debugger = Debugger;
})(hbrowser || (hbrowser = {}));
//# sourceMappingURL=Debugger.js.map