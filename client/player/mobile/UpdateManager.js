/**
 * Created by Vlad on 8/19/2016.
 */
///<reference path="../models.ts"/>
var htplayer;
(function (htplayer) {
    var UpdateManager = (function () {
        function UpdateManager() {
        }
        UpdateManager.prototype.start = function () {
            try {
                this.userdata = new htplayer.VOUserData(JSON.parse(localStorage.getItem('userdata')));
            }
            catch (e) {
                console.log(e);
            }
            //  console.log('userdata ',this.userdata);
            if (!this.userdata || !this.userdata.token) {
                if (this.onNeedLogin)
                    this.onNeedLogin();
                return;
            }
            htplayer.playerURL = htplayer.server + 'player/' + this.userdata.token + '/';
            try {
                this.mydevice = new htplayer.VODevice(JSON.parse(localStorage.getItem('mydevice')));
            }
            catch (e) {
                console.log(e);
            }
            if (!this.mydevice) {
                if (this.onNeedLogin)
                    this.onNeedLogin();
                return;
            }
            // console.log('mydevice     ',this.mydevice);
            try {
                this.mylayout = new htplayer.VOLayout(JSON.parse(localStorage.getItem('mylayout')));
            }
            catch (e) {
                console.log(e);
            }
            // console.log('mylayout ',this.mylayout);
            if (!this.mylayout) {
                this.loadLayout();
            }
            else {
                if (UpdateManager.online)
                    this.loadDevice();
                else {
                    console.log('on ready');
                    if (this.onReady)
                        this.onReady(this.mylayout);
                }
            }
        };
        UpdateManager.prototype.loadDevice = function () {
            var _this = this;
            var url = htplayer.playerURL + 'mydevice-stats/' + this.mydevice.id;
            console.log('load device ' + url);
            $.get(url).done(function (res) {
                //  console.log(res);
                if (res.data) {
                    var olddevice = _this.mydevice;
                    _this.mydevice = new htplayer.VODevice(res.data);
                    localStorage.setItem('mydevice', JSON.stringify(_this.mydevice));
                    _this.loadLayout();
                }
                else
                    console.warn(res);
            });
        };
        UpdateManager.prototype.onOldLayout = function () {
            if (this.onReady)
                this.onReady(this.mylayout);
        };
        UpdateManager.prototype.loadLayout = function () {
            var _this = this;
            var url = htplayer.playerURL + 'layout/' + this.mydevice.layout_id;
            console.log('load layout ' + url);
            $.get(url).done(function (res) {
                /// console.log(res);
                if (res.data) {
                    var oldLayout = _this.mylayout;
                    _this.mylayout = new htplayer.VOLayout(res.data);
                    if (_this.onReady)
                        _this.onReady(_this.mylayout);
                    if (oldLayout && _this.mylayout.id === oldLayout.id && _this.mylayout.timestamp == oldLayout.timestamp) {
                        _this.onOldLayout();
                    }
                    else {
                        localStorage.setItem('mylayout', JSON.stringify(_this.mylayout));
                        if (_this.onNewLayout)
                            _this.onNewLayout(_this.mylayout);
                    }
                }
                else
                    console.warn(res);
            });
        };
        UpdateManager.prototype.saveData = function () {
            localStorage.setItem('userdata', JSON.stringify(this.userdata));
            localStorage.setItem('mydevice', JSON.stringify(this.mydevice));
        };
        UpdateManager.prototype.saveLayout = function () {
            console.log('savong ', this.mylayout);
            localStorage.setItem('mylayout', JSON.stringify(this.mylayout));
        };
        return UpdateManager;
    }());
    htplayer.UpdateManager = UpdateManager;
})(htplayer || (htplayer = {}));
//# sourceMappingURL=UpdateManager.js.map