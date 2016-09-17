/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */
"use strict";
var router_1 = require('@angular/router');
var sign_in_1 = require("./login/sign-in");
var new_user_1 = require("./login/new-user");
var reset_password_1 = require("./login/reset-password");
var change_password_1 = require("./login/change-password");
exports.loginRoutes = [
    { path: 'sign-in', component: sign_in_1.SignIn },
    { path: 'new-user', component: new_user_1.NewUser },
    { path: 'reset-password', component: reset_password_1.ResetPassword },
    { path: 'change-password/:token', component: change_password_1.ChangePassword },
    { path: '**', component: sign_in_1.SignIn }
];
exports.routing = router_1.RouterModule.forRoot(exports.loginRoutes);
//# sourceMappingURL=login.routing.js.map