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
//# sourceMappingURL=crete-account.js.map