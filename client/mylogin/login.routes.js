/**
 * Created by Dmitriy Prilutsky on 13.07.2016.
 */
"use strict";
var router_1 = require('@angular/router');
var login_manager_1 = require("./login-manager");
exports.routes = [
    { path: 'login-manager', component: login_manager_1.LoginManager },
    { path: '**', component: login_manager_1.LoginManager }
];
exports.appRouterProviders = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=login.routes.js.map