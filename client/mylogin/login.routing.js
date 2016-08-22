/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */
"use strict";
var router_1 = require('@angular/router');
var sign_in_1 = require("./login/sign-in");
var new_user_1 = require("./login/new-user");
var forget_password_1 = require("./login/forget-password");
exports.loginRoutes = [
    { path: 'sign-in', component: sign_in_1.SignIn },
    { path: 'new-user', component: new_user_1.NewUser },
    { path: 'forget-password', component: forget_password_1.ForgetPassword },
    { path: '**', component: sign_in_1.SignIn }
];
exports.loginRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(exports.loginRoutes);
//# sourceMappingURL=login.routing.js.map