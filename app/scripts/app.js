'use strict';

/**
 * @ngdoc overview
 * @name metaqnuploaderApp
 * @description
 * # metaqnuploaderApp
 *
 * Main module of the application.
 */
angular
    .module('metaqnuploaderApp', [
        'meta.qnuploader'
    ])
    .config(function () {
        //  $routeProvider
        //    .when('/', {
        //        templateUrl: 'views/main.html',
        //        controller: 'MainCtrl',
        //        controllerAs: 'main'
        //    })
        //    .when('/about', {
        //        templateUrl: 'views/about.html',
        //        controller: 'AboutCtrl',
        //        controllerAs: 'about'
        //    })
        //    .otherwise({
        //        redirectTo: '/'
        //    });
    }).run(['$rootScope', function ($rootScope) {

    $rootScope.files = [{
        name: '1',
        link: '3',
        size: '2'
    }];

    //$rootScope.data = {
    //    name: '1',
    //    link: '2',
    //    size: '3'
    //};

    $rootScope.config = {
        domain: 'http://7xixj1.com1.z0.glb.clouddn.com/',
        uptokenUrl: 'http://test.maikeji.cn:4000/qiniu/uptoken',
        maxSize: '1M',
        mimeTypes: [
            {title: "Image files", extensions: "jpg,jpeg,gif,png"}
        ]
    };

}]);
