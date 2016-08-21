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
//# sourceMappingURL=login-screen.js.map