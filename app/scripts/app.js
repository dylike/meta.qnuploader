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

    $rootScope.config = {
        domain: 'http://7xixj1.com1.z0.glb.clouddn.com/',
        uptokenUrl: '_ATGryARBwpe-DEONUbpzef-OkKQXhWXulwgbp2V:r0ghxbW6nb_jc6oklZF62zPnPFU=:eyJzY29wZSI6Im1ldGFsYWItdGVzdCIsImRlYWRsaW5lIjoxNDUyNjkxNzA2fQ==',
        max_size: '5M'
    };

}]);
