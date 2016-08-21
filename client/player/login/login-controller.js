///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="../../typings/moment/moment.d.ts"/>
///<reference path="../../typings/underscore/underscore.d.ts"/>
///<reference path="../models.ts"/>
///<reference path="login-screen.ts"/>
///<reference path="crete-account.ts"/>
///<reference path="forget-password.ts"/>
///<reference path="devices-list.ts"/>
var htplayer;
(function (htplayer) {
    htplayer.showTip = function (message, obj) {
        var tip = $('#Library #ToolTip').clone().html('<span class="fa fa-minus-circle"></span> <span>' + message + '</span>').offset(obj.offset());
        tip.appendTo('body');
        setTimeout(function () {
            tip.remove();
        }, 3000);
    };
    var LoginController = (function () {
        function LoginController() {
            console.log('login controller          ');
            this.$view = $('#MainContainer');
            this.$outlet = this.$view.find('.route-outlet').first();
            $.ajaxSetup({
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                }
            });
            try {
                this.userdata = JSON.parse(localStorage.getItem('userdata'));
            }
            catch (e) {
                console.log('error LoginController.constructor  ', e);
            }
            //console.log('this.userdata    ',this.userdata)
            this.doLogin('at start');
        }
        LoginController.prototype.onReady = function () {
        };
        LoginController.prototype.closeLoginModule = function () {
            if (typeof MyApplicationLoadHTML == 'undefined')
                window.location.href = 'htplayer.html';
            else
                MyApplicationLoadHTML('htplayer.html');
        };
        LoginController.prototype.onDevicesComplete = function (device) {
            this.mydevice = device;
            // console.log(device);
            localStorage.setItem('mydevice', JSON.stringify(this.mydevice));
            this.closeLoginModule();
        };
        LoginController.prototype.doDevices = function () {
            var _this = this;
            this.devicesList = new htplayer.DevicesList(this.userdata);
            this.devicesList.onComplete = function (device) { return _this.onDevicesComplete(device); };
            this.devicesList.onFail = function () { return _this.doLogin('device fail'); };
            this.$outlet.children().remove();
            this.devicesList.appendTo(this.$outlet);
            this.devicesList.addListeners();
        };
        LoginController.prototype.onLoginComplete = function (userdata) {
            this.userdata = userdata;
            localStorage.setItem('userdata', JSON.stringify(this.userdata));
            this.doDevices();
        };
        LoginController.prototype.doLogin = function (reason) {
            var _this = this;
            console.log('login ' + reason);
            this.login = new htplayer.LoginScreen(this.userdata);
            this.login.onComplete = function (userdata) { return _this.onLoginComplete(userdata); };
            this.$outlet.children().remove();
            this.login.appendTo(this.$outlet);
            this.login.onClose = function () { return _this.closeLoginModule(); };
        };
        return LoginController;
    }());
    htplayer.LoginController = LoginController;
})(htplayer || (htplayer = {}));
$(document).ready(function () { return new htplayer.LoginController(); });
//# sourceMappingURL=login-controller.js.map