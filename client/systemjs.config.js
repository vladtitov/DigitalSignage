/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
    // map tells the System loader where to look for things
    var map = {
        'app':                        'app', // 'dist',
       'app-screen':                        'app-screen', // 'dist',
        '@angular':                   'node_modules/@angular',
        'angular2':                   'node_modules/@angular',
        '@angular/router-deprecated':'node_modules/@angular/router-deprecated',
        '@angular2-material':         'node_modules/@angular2-material',
        'ng2-material':         'node_modules/ng2-material',
       // 'dragula': 'node_modules/dragula/dist/dragula.js',
       // 'ng2-dragula': 'node_modules/ng2-dragula',
        'ng2-uploader':'node_modules/ng2-uploader',
        'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
        'rxjs':                       'node_modules/rxjs',
        'moment': 'node_modules/moment/moment.js'
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app':                        { main: 'main.js',  defaultExtension: 'js' },
        'app-screen':                        { main: 'main.js',  defaultExtension: 'js' },
        'rxjs':                       { defaultExtension: 'js' },
        'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
        'ng2-material':         { main: 'index.js', defaultExtension: 'js' },
        //'ng2-dragula':{ main: 'ng2-dragula.js', defaultExtension: 'js' },
        'ng2-uploader':{ main: 'ng2-uploader.js', defaultExtension: 'js' }
    };
    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'upgrade',
    ];

    var materialPkgs = [
        'core',
        'checkbox',
        'input',
        'list'
    ];


    var materialPackages = [
        'core', 'toolbar', 'button', 'card', 'checkbox', 'icon', 'input', 'list', 'progress-bar',
        'progress-circle', 'radio', 'sidenav', 'grid-list', 'tabs', 'slide-toggle'
    ];
    materialPackages.forEach(function(item) {
        packages['@angular2-material/' + item] = { main: item };
    });

    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }
    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    }
    packages['@angular/router-deprecated'] = { main: '/bundles/router-deprecated' + '.umd.js', defaultExtension: 'js' };
    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

    ngPackageNames.forEach(setPackageConfig);
    var config = {
        map: map,
        packages: packages
    };
    System.config(config);
})(this);