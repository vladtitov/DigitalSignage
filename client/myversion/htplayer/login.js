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
    //
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
    var AssetItemModel = (function () {
        function AssetItemModel(obj) {
            for (var str in obj)
                this[str] = obj[str];
            if (typeof MainLibrary !== 'undefined')
                MainLibrary.library.addItem(this);
            else
                this.inLibrary = true;
            if (!this.lasting)
                this.lasting = this.duration;
        }
        return AssetItemModel;
    }());
    htplayer.VOAssetItem = AssetItemModel;
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
 * Created by Vlad on 8/5/2016.
 */
///<reference path="../models.ts"/>
var htplayer;
(function (htplayer) {
    var FileLoader = (function () {
        function FileLoader(asset, directory) {
            this.asset = asset;
            this.directory = directory;
            this.server = 'http://192.168.1.10:56777/';
            this.READY = 'ready';
            this.trigger = $({});
            this.download();
        }
        FileLoader.prototype.destroy = function () {
            this.asset = null;
            this.file = null;
            this.fs = null;
            this.trigger = null;
        };
        FileLoader.prototype.download = function () {
            var _this = this;
            var fileTransfer = new FileTransfer();
            var url = encodeURI(this.server + this.asset.path);
            var path = this.directory + this.asset.filename;
            fileTransfer.download(url, path, function (entry) {
                _this.asset.path = entry.toURL();
                _this.file = entry;
                _this.trigger.triggerHandler(_this.READY, _this);
                console.log("download complete: " + _this.asset.filename);
            }, function (error) {
                console.log("download error source " + error.source);
                console.log("download error target " + error.target);
                console.log("upload error code" + error.code);
            }, false, {
                headers: {
                    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                }
            });
            console.log('start download ' + this.asset.filename);
        };
        return FileLoader;
    }());
    htplayer.FileLoader = FileLoader;
    var MainLibrary = (function () {
        function MainLibrary() {
            this.haveNames = [];
            this.inQueue = [];
            this.necessaryNames = [];
            this.inProgressNames = [];
            this.server = 'http://192.168.1.10:56777/';
        }
        /* haveFile(name:string):boolean{
             if(this.useFiles) return this.haveNames.indexOf(name) !==-1;
            return true;
         }
 */
        MainLibrary.prototype.onErrorCreateFile = function (err) {
        };
        MainLibrary.prototype.onErrorLoadFs = function (err) {
            alert('error load filesystem ' + err);
        };
        MainLibrary.prototype.getFilesystem = function () {
            var _this = this;
            if (!this.online)
                return;
            window.requestFileSystem(window.PERSISTENT, 0, function (fs) {
                //console.log(fs);
                _this.fs = fs;
                _this.root = fs.root;
                _this.root.getDirectory('content', { create: true }, function (dir) {
                    _this.directory = dir.toURL();
                    dir.createReader().readEntries(function (res) {
                        _this.files = res;
                        _this.haveNames = res.map(function (item) { return item.name; });
                        console.log('have names ', _this.haveNames);
                        if (_this.onReady)
                            _this.onReady();
                    }, function (error) { console.log('error read files'); });
                });
                /* fs.root.getFile("newPersistentFile.txt", { create: true, exclusive: false }, function (fileEntry) {
 
                     console.log("fileEntry is file?" + fileEntry.isFile.toString());
                     // fileEntry.name == 'someFile.txt'
                     // fileEntry.fullPath == '/someFile.txt'
                    // writeFile(fileEntry, null);
 
                 },(err)=>this. onErrorCreateFile(err));*/
            }, function (err) { return _this.onErrorLoadFs(err); });
        };
        MainLibrary.prototype.addToLibrary = function (asset) {
            asset.inLibrary = true;
            var filename = asset.filename;
            this.haveNames.push(filename);
        };
        MainLibrary.prototype.onFileReady = function (fl) {
            var asset = fl.asset;
            this.addToLibrary(asset);
            fl.destroy();
            //this.loadNext();
        };
        MainLibrary.prototype.loadNext = function () {
            var _this = this;
            if (this.itemsInQueue.length === 0) {
                return;
            }
            var asset = this.itemsInQueue.pop();
            var loader = new FileLoader(asset, this.directory);
            loader.READY, function (evt, loader) { return _this.onFileReady(loader); };
        };
        /*  addInQueueAr(paths:string[]):void{
              paths.forEach((path:string)=>{
                  if(!path || path =='undefined' || path ==='null'){
                      console.log('ERRRROR library to load    '+path);
                  }else{
                      var name:string = path.substr(path.lastIndexOf('/')+1);
                      if(!name || name.indexOf('.')==-1){
                          console.log('ERRRROR library to load    '+path);
                      }else  this.inQueue.push(path)
                  }
              })
  
  
              this.loadNext();
          }
  */
        MainLibrary.prototype.addInQueue = function (asset) {
            if (!this.itemsInQueue)
                this.itemsInQueue = [];
            var exists = this.itemsInQueue.filter(function (item) { return item.filename == asset.filename; });
            if (exists.length === 0) {
                this.itemsInQueue.push(asset);
                this.loadNext();
            }
        };
        MainLibrary.prototype.addItem = function (item) {
            if (this.online) {
                item.inLibrary = true;
                return;
            }
            item.filename = item.path.substr(item.path.lastIndexOf('/') + 1);
            if (this.haveNames.indexOf(item.filename) !== -1)
                item.inLibrary = true;
            else
                this.addInQueue(item);
        };
        MainLibrary.library = new MainLibrary();
        return MainLibrary;
    }());
    htplayer.MainLibrary = MainLibrary;
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
                console.log(this.$view);
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
            var _this = this;
            this.userdata = userdata;
            this.$view = $('#Devices');
            this.$view.append($('#Loading'));
            this.$list = $('#devices-list');
            this.$btnPlayHere = $('#btnPlayHere').click(function () {
                console.log(_this.selectedDevice);
                if (_this.onComplete)
                    _this.onComplete(_this.selectedDevice);
            });
            this.$btnPlayHere.hide();
            this.$list.on('click', '.mydevice', function (evt) {
                var id = $(evt.currentTarget).data('id');
                if (isNaN(id))
                    return;
                if (_this.selectedDevice)
                    _this.selectedDevice.selected = false;
                _this.selectedDevice = _this.getDeviceByIg(id)[0];
                _this.selectedDevice.selected = true;
                _this.$btnPlayHere.show();
            });
            this.loadData();
        }
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
 * Created by Vlad on 8/7/2016.
 */
///<reference path="../models.ts"/>
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
                    if (res.data && res.data.token) {
                        _this.userdata = new htplayer.VOUserData(res.data);
                        _this.userdata.username = email;
                        _this.userdata.password = password;
                        if (_this.onComplete)
                            _this.onComplete(_this.userdata);
                    }
                    else {
                        if (res.exists) {
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
    var LoginScreen = (function () {
        function LoginScreen(userdata) {
            var _this = this;
            this.userdata = userdata;
            this.$account = $('#AccountScreen');
            this.$view = $('#LoginView');
            this.$username = this.$view.find('.username').first();
            console.log(this.$username);
            this.createNewAccount = new CreateNewAccount();
            this.createNewAccount.$view.hide();
            this.createNewAccount.onClose = function () {
                _this.switchContent(_this.$view);
                _this.addVisteners();
            };
            this.forgetPassword = new ForgetPassword();
            this.forgetPassword.$view.hide();
            this.forgetPassword.onClose = function () {
                _this.switchContent(_this.$view);
                _this.addVisteners();
            };
            console.log(this.$view);
            this.$outlet = this.$account.find('.route-outlet');
            this.init();
        }
        LoginScreen.prototype.addVisteners = function () {
            var _this = this;
            this.$btnForgetPassword = this.$view.find('.forgetpassword').first().click(function () {
                var email = _this.getEmail();
                console.log(email);
                if (email) {
                    _this.forgetPassword.setUsername(email);
                    _this.switchContent(_this.forgetPassword.$view);
                    _this.forgetPassword.addListeners();
                }
            });
            this.$showpassord = this.$view.find('.showpassword').first().click(function () {
                if (!_this.$showpassord.prop('checked')) {
                    _this.$password.prop('type', 'password');
                }
                else
                    _this.$password.prop('type', 'text');
            });
            this.$btnSubmit.click(function (evt) { return _this.onSubmitClick(evt); });
            this.$newuser = this.$view.find('.newuser').first().click(function () {
                _this.switchContent(_this.createNewAccount.$view);
                _this.createNewAccount.addListeners();
            });
        };
        LoginScreen.prototype.appendTo = function ($outlet) {
            this.$account.appendTo($outlet);
            this.addVisteners();
            this.$view.show();
        };
        LoginScreen.prototype.init = function () {
            this.$form = this.$view.find('form');
            this.$password = this.$view.find('.password').first();
            this.$btnSubmit = this.$view.find('.submit').first();
            if (this.userdata) {
                $('#Username').val(this.userdata.username);
                $('#Password').val(this.userdata.password);
            }
        };
        LoginScreen.prototype.switchContent = function ($newvie) {
            var cont = this.$outlet.children().remove();
            // cont.fadeOut(function(){ cont.remove()})
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
/**
 * Created by Vlad on 8/11/2016.
 */
var htplayer;
(function (htplayer) {
    var ViewportModel = (function () {
        function ViewportModel(obj) {
            this.timer = 0;
            this.currentIndex = -1;
            for (var str in obj)
                this[str] = obj[str];
            this.getPlaylist();
        }
        ViewportModel.prototype.getPlaylist = function () {
            if (this.playlist_id) {
                this.loadPlaylist();
            }
        };
        ViewportModel.prototype.destroy = function () {
            this.view.remove();
        };
        ViewportModel.prototype.appendView = function ($container) {
            this.view = new htplayer.PlayerLite(this);
            this.view.appendTo($container);
        };
        ViewportModel.prototype.getNextItem = function () {
            this.currentIndex++;
            if (this.currentIndex >= this.playlistItems.length)
                this.currentIndex = 0;
            return this.playlistItems[this.currentIndex];
        };
        ViewportModel.prototype.startPlay = function () {
            this.view.startPlay();
        };
        ViewportModel.prototype.stopPlay = function () {
            this.view.stopPlay();
        };
        ViewportModel.prototype.setItems = function (ar) {
            this.playlistItems = ar;
        };
        ViewportModel.prototype.loadPlaylist = function () {
            var _this = this;
            $.get(htplayer.playerURL + 'playlist/' + this.playlist_id).done(function (res) {
                console.log(res);
                if (res.data) {
                    var ar = res.data.map(function (item) { return new htplayer.VOAssetItem(item); });
                    _this.setItems(ar);
                    _this.startPlay();
                }
                // var vo:VOPlaylist = new VOPlaylist(res.data);
                // this.playlist = new PlayListModel(vo);
                //   this.startPlay();
            });
        };
        return ViewportModel;
    }());
    htplayer.ViewportModel = ViewportModel;
})(htplayer || (htplayer = {}));
/**
 * Created by Vlad on 8/11/2016.
 */
var htplayer;
(function (htplayer) {
    var PlayerLite = (function () {
        function PlayerLite(model) {
            this.model = model;
            this.width = model.width;
            this.height = model.height;
            this.x = model.x;
            this.y = model.y;
        }
        PlayerLite.prototype.startPlay = function () {
            this.isPlaying = true;
            this.playNext();
        };
        PlayerLite.prototype.stopPlay = function () {
            this.isPlaying = false;
        };
        PlayerLite.prototype.destroy = function () {
        };
        PlayerLite.prototype.playNext = function () {
            var _this = this;
            if (!this.isPlaying)
                return;
            var asset = this.model.getNextItem();
            //console.log('hext item    ',asset);
            if (!asset || !asset.inLibrary) {
                setTimeout(function () { return _this.playNext(); }, 1000);
                return;
            }
            if (!this.nextItem) {
                this.nextItem = asset;
                this.playNext();
                return;
            }
            this.prevItem = this.currentItem;
            this.currentItem = this.nextItem;
            this.nextItem = asset;
            var currentItem = this.currentItem;
            if (isNaN(currentItem.lasting))
                currentItem.lasting = 10;
            var delay = currentItem.lasting;
            if (this.prevItem && this.prevItem.asset_id === this.currentItem.asset_id) {
                console.log('same asset skipping');
            }
            else {
                switch (currentItem.type) {
                    case 'video':
                        delay += 3;
                        this.showVideo(currentItem);
                        break;
                    case 'image':
                        this.showImage(currentItem);
                        break;
                    default:
                        this.showImage(currentItem);
                        break;
                }
            }
            setTimeout(function () { return _this.playNext(); }, (delay * 1000));
        };
        PlayerLite.prototype.remove = function () {
            this.$view.remove();
        };
        PlayerLite.prototype.showImage = function (item) {
            var view = $('<img>').attr('src', item.path).css('max-width', this.width + 'px').css('max-height', this.height + 'px');
            this.switchView(view);
        };
        PlayerLite.prototype.switchView = function (newview) {
            var prev = this.$view.children();
            prev.fadeOut(function () {
                prev.remove();
            });
            newview.hide();
            this.$view.append(newview);
            newview.fadeIn();
        };
        PlayerLite.prototype.showVideo = function (item) {
            var view = $('<video>').attr('autoplay', 'true').append($('<source>').attr('src', item.path)).css('max-width', this.width + 'px').css('max-height', this.height + 'px');
            this.switchView(view);
        };
        PlayerLite.prototype.appendTo = function ($container) {
            this.$view = $('<div>').addClass('ht-player').width(this.width).height(this.height).offset({ left: this.x, top: this.y }).appendTo($container);
            return this.$view;
        };
        return PlayerLite;
    }());
    htplayer.PlayerLite = PlayerLite;
})(htplayer || (htplayer = {}));
/**
 * Created by Vlad on 8/5/2016.
 */
///<reference path="../models.ts"/>
///<reference path="viewport-model.ts"/>
///<reference path="player-lite.ts"/>
var htplayer;
(function (htplayer) {
    var HTMyPlayer = (function () {
        function HTMyPlayer(selector) {
            this.$view = $(selector);
        }
        HTMyPlayer.prototype.appendTo = function ($container) {
            $container.append(this.$view);
        };
        HTMyPlayer.prototype.width = function () {
            return this.layout.width || 1920;
        };
        HTMyPlayer.prototype.height = function () {
            return this.layout.height || 1080;
        };
        HTMyPlayer.prototype.start = function () {
        };
        HTMyPlayer.prototype.checkLayoutTimestamp = function () {
        };
        HTMyPlayer.prototype.createView = function () {
            var _this = this;
            this.viewports.forEach(function (model) {
                model.appendView(_this.$view);
            });
        };
        HTMyPlayer.prototype.loadLayoutStats = function () {
            $.get(htplayer.playerURL + 'layout-stats/' + this.layout.id).done(function (res) {
                // this.deviceStats = new VODeviceStats(res.data);
            });
        };
        HTMyPlayer.prototype.setNewLayout = function (layout) {
            this.layout = layout;
            this.setNewViewPorts();
        };
        HTMyPlayer.prototype.loadLayout = function (layout_id) {
            var _this = this;
            $.get(htplayer.playerURL + 'layout/' + layout_id).done(function (res) {
                console.log(res);
                if (res.data) {
                    _this.layout = new htplayer.VOLayout(res.data);
                    _this.setNewViewPorts();
                    if (_this.onLayotLoaded)
                        _this.onLayotLoaded();
                }
                else
                    console.warn(res);
            });
        };
        HTMyPlayer.prototype.setNewViewPorts = function () {
            this.viewports = this.layout.viewports.map(function (item) { return new htplayer.ViewportModel(item); });
            this.createView();
        };
        return HTMyPlayer;
    }());
    htplayer.HTMyPlayer = HTMyPlayer;
})(htplayer || (htplayer = {}));
///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="../../typings/moment/moment.d.ts"/>
///<reference path="../../typings/underscore/underscore.d.ts"/>
///<reference path="../../typings/cordova/cordova.d.ts"/>
///<reference path="../htplayer/ht-payer.ts"/>
///<reference path="../models.ts"/>
///<reference path="login-screen.ts"/>
var htplayer;
(function (htplayer) {
    var UpdateManager = (function () {
        function UpdateManager() {
        }
        UpdateManager.prototype.start = function () {
            try {
                this.userdata = JSON.parse(localStorage.getItem('userdata'));
            }
            catch (e) {
                console.log(e);
            }
            if (!this.userdata && this.userdata.token) {
                this.onNeedLogin('no userdata');
                return;
            }
            htplayer.playerURL = htplayer.server + 'player/' + this.userdata.token + '/';
            try {
                this.mydevice = JSON.parse(localStorage.getItem('mydevice'));
            }
            catch (e) {
                console.log(e);
            }
            if (!this.mydevice) {
                this.onNeedLogin('do device');
                return;
            }
            try {
                this.mylayout = JSON.parse(localStorage.getItem('mylayout'));
            }
            catch (e) {
                console.log(e);
            }
            if (!this.mylayout) {
                this.onNeedLayout();
            }
            else
                this.onReady();
            /* this.layout = layout;
 
             if(MainLibrary.library.online){
                 this.loadDevice();
             }else{
                 if(dev.layout_id){ this.startAutoload(userdata);
                 }else  this.doLogin();
 
             }*/
        };
        UpdateManager.prototype.checkUpdate = function () {
        };
        UpdateManager.prototype.loadLayout = function () {
            var _this = this;
            $.get(htplayer.playerURL + '/layout/' + this.mydevice.layout_id).done(function (res) {
                console.log(res);
                if (res.data) {
                    var oldLayout = _this.mylayout;
                    _this.mylayout = new htplayer.VOLayout(res.data);
                    if (oldLayout && _this.mylayout.id === oldLayout.id && _this.mylayout.timestamp == oldLayout.timestamp) {
                        if (_this.onOldLayout)
                            _this.onOldLayout();
                    }
                    else {
                        if (_this.onNewLayout)
                            _this.onNewLayout();
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
    var MainAppController = (function () {
        function MainAppController() {
            var _this = this;
            htplayer.showTip = this.showTip;
            htplayer.MainLibrary.library.online = true;
            console.log('htplayer comiled          ');
            this.$autologin = $('#auto-login');
            ///  this.$loading = $('#Loading');
            this.$view = $('#MainContainer');
            this.$outlet = this.$view.find('.route-outlet').first();
            $.ajaxSetup({
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                }
            });
            this.updateManager = new UpdateManager();
            this.updateManager.onNeedLayout = function () { return _this.onNeedLayout(); };
            this.updateManager.onNeedLogin = function (reason) { return _this.doLogin(reason); };
            this.updateManager.onReady = function () { return _this.onReady(); };
            this.updateManager.start();
        }
        MainAppController.prototype.showTip = function (message, obj) {
            var tip = $('#Library #ToolTip').clone().html('<span class="fa fa-minus-circle"></span> <span>' + message + '</span>').offset(obj.offset());
            tip.appendTo('body');
            setTimeout(function () {
                tip.remove();
            }, 3000);
        };
        MainAppController.prototype.onReady = function () {
            this.isAppReady = true;
            console.log('appready ');
            this.startAutoload();
        };
        MainAppController.prototype.loadLayout = function () {
            var _this = this;
            this.updateManager.onOldLayout = function (layout) {
                console.log(' on old layout');
            };
            this.updateManager.onNewLayout = function (layout) {
                console.log(' on new layout');
                _this.updateManager.saveLayout();
                // this.player.setNewLayout(layout)
            };
            this.updateManager.loadLayout();
        };
        MainAppController.prototype.onNeedLayout = function () {
            console.log('need layout');
            this.loadLayout();
        };
        MainAppController.prototype.startPlayer = function () {
            console.log('start player');
            if (!this.player) {
                this.player = new htplayer.HTMyPlayer('#HTMyPlayer');
                this.player.setNewLayout(this.updateManager.mylayout);
            }
            this.player.appendTo(this.$outlet);
            this.player.start();
        };
        MainAppController.prototype.startAutoload = function () {
            var _this = this;
            console.log('autoload');
            var interval = setTimeout(function () {
                $('#auto-load').fadeOut(function () {
                    $('#auto-load').remove();
                });
                _this.startPlayer();
            }, 100000);
            var $view = $('#auto-load').append($('#Loading')).appendTo(this.$outlet);
            $view.find('.btn').click(function () {
                clearInterval(interval);
                _this.doLogin('user wants');
            });
        };
        MainAppController.prototype.onDevicesComplete = function (device) {
            this.updateManager.mydevice = device;
        };
        MainAppController.prototype.doDevices = function () {
            var _this = this;
            var devices = new htplayer.DevicesList(this.updateManager.userdata);
            devices.onComplete = function (device) { return _this.onDevicesComplete(device); };
            devices.onFail = function () { return _this.doLogin('device fail'); };
        };
        MainAppController.prototype.onLoginComplete = function (userdata) {
            this.updateManager.userdata = userdata;
            this.clearOutlet();
            this.doDevices();
        };
        MainAppController.prototype.clearOutlet = function () {
            var cont = this.$outlet.children();
            cont.fadeOut(function () { cont.remove(); });
        };
        MainAppController.prototype.doLogin = function (reason) {
            var _this = this;
            console.log('login ' + reason);
            this.clearOutlet();
            this.login = new htplayer.LoginScreen(this.updateManager.userdata);
            this.login.onComplete = function (userdata) { return _this.onLoginComplete(userdata); };
            this.login.appendTo(this.$outlet);
        };
        return MainAppController;
    }());
    htplayer.MainAppController = MainAppController;
})(htplayer || (htplayer = {}));
$(document).ready(function () { return new htplayer.MainAppController(); });
//# sourceMappingURL=mobile.js.map