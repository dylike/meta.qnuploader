'use strict';

/**
 * @ngdoc overview
 * @name metaqnuploader
 * @description
 * # metaqnuploader
 *
 * Main module of the application.
 */
angular
    .module('metaqnuploaderApp', ['meta.qnuploader'])
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
        uptokenUrl: '_ATGryARBwpe-DEONUbpzef-OkKQXhWXulwgbp2V:2YbJyiyKojbg5Yy1yB05qP3VB7g=:eyJzY29wZSI6Im1ldGFsYWItdGVzdCIsImRlYWRsaW5lIjoxNDUyNzQ5NTA3fQ==',
        maxSize: '5MB'
    };

}]);
