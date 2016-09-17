/**
 * Created by Vlad on 8/14/2016.
 */
var htplayer;
(function (htplayer) {
    var CreateNewAccount = (function () {
        function CreateNewAccount() {
            this.$view = $('#CreateNewAccount');
            this.$password = this.$view.find('.password').first();
            // this.$password2 = this.$view.find('.password2');
            this.$username = this.$view.find('.username');
            this.$btnSubmit = this.$view.find('.submit').first();
        }
        CreateNewAccount.prototype.appendTo = function ($cont) {
            $cont.append((this.$view));
            this.addListeners();
        };
        CreateNewAccount.prototype.addListeners = function () {
            var _this = this;
            this.$btnClose = this.$view.find('.close').click(function () {
                //console.log('close');
                if (_this.onClose)
                    _this.onClose();
            });
            this.$showpassord = this.$view.find('.showpassword').first().click(function () {
                if (!_this.$showpassord.prop('checked')) {
                    _this.$password.prop('type', 'password');
                }
                else
                    _this.$password.prop('type', 'text');
            });
            this.$btnSubmit.click(function (evt) { return _this.onSubmitClick(evt); });
        };
        CreateNewAccount.prototype.getEmail = function () {
            var email = this.$username.val();
            var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (re.test(email)) {
                return email;
            }
            else {
                htplayer.showTip('input valid email adress', this.$username);
            }
        };
        CreateNewAccount.prototype.onSubmitClick = function (evt) {
            var _this = this;
            this.$btnSubmit.prop('disabled', true);
            setTimeout(function () {
                _this.$btnSubmit.prop('disabled', false);
            }, 2000);
            var email = this.getEmail();
            var password = this.$password.val();
            //var password2 = this.$password2.val()
            if (password.length < 6) {
                htplayer.showTip('Password should be minimum 6 chars', this.$password);
                return;
            }
            if (email) {
                this.userdata = new htplayer.VOUserData({});
                this.userdata.username = email;
                this.userdata.password = password;
                $.post(htplayer.server + 'account/new-user-player', this.userdata).done(function (res) {
                    console.log(res);
                    if (res.data && res.data.token) {
                        _this.userdata = new htplayer.VOUserData(res.data);
                        _this.userdata.username = email;
                        _this.userdata.password = password;
                        if (_this.onComplete)
                            _this.onComplete(_this.userdata);
                    }
                    else {
                        if (res.error.exists) {
                            alert('User exists with this email');
                        }
                        else
                            htplayer.showTip('Error processing request', _this.$btnSubmit);
                    }
                });
            }
        };
        return CreateNewAccount;
    }());
    htplayer.CreateNewAccount = CreateNewAccount;
})(htplayer || (htplayer = {}));
///<reference path="../typings/jquery/jquery.d.ts"/>
///<reference path="../typings/underscore/underscore.d.ts"/>
var htplayer;
(function (htplayer) {
    htplayer.server = 'http://192.168.1.10:56777/';
    htplayer.playerURL = '';
    var VOAsset = (function () {
        function VOAsset(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOAsset;
    }());
    htplayer.VOAsset = VOAsset;
    var VOPlayLists_Assets = (function () {
        function VOPlayLists_Assets(obj) {
            for (var str in obj)
                this[str] = obj[str];
            if (!this.lasting)
                this.lasting = this.duration;
        }
        return VOPlayLists_Assets;
    }());
    htplayer.VOPlayLists_Assets = VOPlayLists_Assets;
    // table layouts
    var VOLayoutProps = (function () {
        function VOLayoutProps(obj) {
            for (var str in obj)
                this[str] = obj[str];
            if (!this.id)
                this.id = -1;
        }
        return VOLayoutProps;
    }());
    htplayer.VOLayoutProps = VOLayoutProps;
    var VOLayout = (function () {
        function VOLayout(obj) {
            for (var str in obj)
                this[str] = obj[str];
            var vps = [];
            if (obj.viewports) {
                obj.viewports.forEach(function (item) {
                    vps.push(new VOViewport(item));
                });
            }
            this.viewports = vps;
            this.props = new VOLayoutProps(this.props);
        }
        return VOLayout;
    }());
    htplayer.VOLayout = VOLayout;
    var VOTemplate = (function () {
        function VOTemplate(obj) {
            for (var str in obj)
                this[str] = obj[str];
            var out = [];
            if (obj.viewports) {
                obj.viewports.forEach(function (item) {
                    out.push(new VOViewport(item));
                });
            }
            this.viewports = out;
        }
        return VOTemplate;
    }());
    htplayer.VOTemplate = VOTemplate;
    var VOPlayListProps = (function () {
        function VOPlayListProps(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOPlayListProps;
    }());
    htplayer.VOPlayListProps = VOPlayListProps;
    var VOPlaylist = (function () {
        function VOPlaylist(obj) {
            for (var str in obj)
                this[str] = obj[str];
            var ar = [];
            if (this.list)
                this.list.forEach(function (item) { ar.push(new VOPlayLists_Assets(item)); });
            this.list = ar;
            this.props = new VOPlayListProps(this.props || {});
        }
        return VOPlaylist;
    }());
    htplayer.VOPlaylist = VOPlaylist;
    var VOViewport = (function () {
        function VOViewport(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOViewport;
    }());
    htplayer.VOViewport = VOViewport;
    var UpdateResult = (function () {
        function UpdateResult(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return UpdateResult;
    }());
    htplayer.UpdateResult = UpdateResult;
    var VOStats = (function () {
        function VOStats(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOStats;
    }());
    htplayer.VOStats = VOStats;
    var VOUserData = (function () {
        function VOUserData(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VOUserData;
    }());
    htplayer.VOUserData = VOUserData;
    var VODevice = (function () {
        function VODevice(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VODevice;
    }());
    htplayer.VODevice = VODevice;
    var VODeviceStats = (function () {
        function VODeviceStats(obj) {
            for (var str in obj)
                this[str] = obj[str];
        }
        return VODeviceStats;
    }());
    htplayer.VODeviceStats = VODeviceStats;
})(htplayer || (htplayer = {}));
/**
 * Created by Vlad on 8/10/2016.
 */
///<reference path="../models.ts"/>
var htplayer;
(function (htplayer) {
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
    htplayer.DeviceModel = DeviceModel;
    var DevicesList = (function () {
        function DevicesList(userdata) {
            this.userdata = userdata;
            this.$view = $('#Devices');
            this.$view.append($('#Loading'));
            this.$list = $('#devices-list');
            this.loadData();
        }
        DevicesList.prototype.addListeners = function () {
            var _this = this;
            this.$submit = this.$view.find('.submit').first().click(function () {
                if (_this.selectedDevice) {
                    if (_this.onComplete) {
                        var dev = new htplayer.VODevice({
                            id: _this.selectedDevice.id,
                            label: _this.selectedDevice.layout,
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
        DevicesList.prototype.appendTo = function ($outlet) {
            this.$view.appendTo($outlet);
        };
        DevicesList.prototype.getDeviceByIg = function (id) {
            return this.devices.filter(function (item) { return item.id == id; });
        };
        DevicesList.prototype.loadData = function () {
            var _this = this;
            $.get(htplayer.server + 'player/' + this.userdata.token + '/devices').done(function (res) {
                var list = res.data;
                if (!list) {
                    console.warn(res);
                    return;
                }
                console.log(res.data);
                _this.metadata = res.metadata || [];
                _this.devices = list.map(function (item) { return new DeviceModel(item); });
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
            var list1 = $('<div>');
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
    htplayer.DevicesList = DevicesList;
})(htplayer || (htplayer = {}));
/**
 * Created by Vlad on 8/14/2016.
 */
var htplayer;
(function (htplayer) {
    var ForgetPassword = (function () {
        function ForgetPassword() {
            this.$view = $('#ForgetPassword');
            this.$username = this.$view.find('.username').first();
            this.$message = this.$view.find('.message');
        }
        ForgetPassword.prototype.setUserName = function (username) {
            this.$username.text(username);
        };
        ForgetPassword.prototype.addListeners = function () {
            var _this = this;
            this.$view.find('.close').click(function () {
                if (_this.onClose)
                    _this.onClose();
            });
            this.$btnSubmit = this.$view.find('.submit').first().click(function () { return _this.onSubmitClick(); });
            this.$btnClose = this.$view.find('.close').click(function () {
                if (_this.onClose)
                    _this.onClose();
            });
        };
        ForgetPassword.prototype.appendTo = function ($cont) {
            $cont.append(this.$view);
            this.addListeners();
        };
        ForgetPassword.prototype.setUsername = function (text) {
            this.$username.text(text);
        };
        ForgetPassword.prototype.onSubmitClick = function () {
            var _this = this;
            this.$btnSubmit.prop('disabled', true);
            setTimeout(function () {
                _this.$btnSubmit.prop('disabled', false);
            }, 2000);
            $.post(htplayer.server + 'account/forgetpassword', this.$username.text()).done(function (res) {
                if (res.data) {
                    _this.$message.text('Email sent to you with confirmation to reset password');
                }
                else {
                    htplayer.showTip('Error processing request', _this.$btnSubmit);
                }
            });
        };
        return ForgetPassword;
    }());
    htplayer.ForgetPassword = ForgetPassword;
})(htplayer || (htplayer = {}));
/**
 * Created by Vlad on 8/7/2016.
 */
///<reference path="../models.ts"/>
var htplayer;
(function (htplayer) {
    var LoginScreen = (function () {
        function LoginScreen(userdata) {
            this.userdata = userdata;
            this.init();
        }
        LoginScreen.prototype.init = function () {
            var _this = this;
            this.$account = $('#AccountScreen');
            this.$view = $('#LoginView');
            this.$username = this.$view.find('.username').first();
            this.$password = this.$view.find('.password').first();
            this.$btnSubmit = this.$view.find('.submit').first();
            this.$outlet = this.$account.find('.route-outlet');
            this.$form = this.$view.find('form');
            this.$btnClose = this.$view.find('.close');
            if (this.userdata) {
                this.$username.val(this.userdata.username);
                this.$password.val(this.userdata.password);
            }
            this.createNewAccount = new htplayer.CreateNewAccount();
            this.createNewAccount.$view.hide();
            this.createNewAccount.onClose = function () {
                _this.switchContent(_this.$view);
                _this.addVisteners();
            };
            this.createNewAccount.onComplete = function (userdata) {
                _this.userdata = userdata;
                if (_this.onComplete)
                    _this.onComplete(_this.userdata);
            };
            this.forgetPassword = new htplayer.ForgetPassword();
            this.forgetPassword.$view.hide();
            this.forgetPassword.onClose = function () {
                _this.switchContent(_this.$view);
                _this.addVisteners();
            };
            this.$btnForgetPassword = this.$view.find('.forgetpassword').first();
            this.$showpassord = this.$view.find('.showpassword').first();
            this.$newuser = this.$view.find('.newuser').first();
            this.addVisteners();
        };
        LoginScreen.prototype.addVisteners = function () {
            var _this = this;
            this.$btnClose.click(function () {
                if (_this.onClose)
                    _this.onClose();
            });
            this.$btnForgetPassword.click(function () {
                var email = _this.getEmail();
                console.log(email);
                if (email) {
                    _this.forgetPassword.setUsername(email);
                    _this.switchContent(_this.forgetPassword.$view);
                    _this.forgetPassword.addListeners();
                }
            });
            this.$showpassord.click(function () {
                if (!_this.$showpassord.prop('checked')) {
                    _this.$password.prop('type', 'password');
                }
                else
                    _this.$password.prop('type', 'text');
            });
            this.$btnSubmit.click(function (evt) { return _this.onSubmitClick(evt); });
            this.$newuser.click(function () {
                _this.switchContent(_this.createNewAccount.$view);
                _this.createNewAccount.addListeners();
            });
        };
        LoginScreen.prototype.appendTo = function ($outlet) {
            this.$account.appendTo($outlet);
            this.addVisteners();
            this.$view.show();
        };
        LoginScreen.prototype.switchContent = function ($newvie) {
            var cont = this.$outlet.children().remove();
            $newvie.removeClass('hide').addClass('show');
            $newvie.show();
            this.$outlet.append($newvie);
        };
        LoginScreen.prototype.onSubmitClick = function (evt) {
            var _this = this;
            this.$btnSubmit.prop('disabled', true);
            setTimeout(function () { _this.$btnSubmit.prop('disabled', false); }, 1000);
            this.validateForm();
        };
        LoginScreen.prototype.getEmail = function () {
            var email = this.$username.val();
            var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (re.test(email)) {
                return email;
            }
            else {
                htplayer.showTip('input valid email adress', this.$username);
            }
        };
        LoginScreen.prototype.validateForm = function () {
            var _this = this;
            var valid = true;
            var email = this.getEmail();
            var password = this.$password.val();
            if (password.length < 6) {
                htplayer.showTip('Password should be minimum 6 chars', this.$password);
                return;
            }
            if (email) {
                if (!this.userdata)
                    this.userdata = new htplayer.VOUserData({});
                this.userdata.username = email;
                this.userdata.password = password;
                $.post(htplayer.server + 'account/loginplayer', this.userdata).done(function (res) {
                    console.log(res);
                    if (res.data && res.data.token) {
                        _this.userdata = new htplayer.VOUserData(res.data);
                        _this.userdata.username = email;
                        _this.userdata.password = password;
                        if (_this.onComplete)
                            _this.onComplete(_this.userdata);
                    }
                    else {
                        htplayer.showTip('invalid username or password', _this.$btnSubmit);
                    }
                });
            }
        };
        LoginScreen.prototype.destroy = function () {
            this.$view.remove();
        };
        return LoginScreen;
    }());
    htplayer.LoginScreen = LoginScreen;
})(htplayer || (htplayer = {}));
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
//# sourceMappingURL=login.js.map