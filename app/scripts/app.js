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
        uptokenUrl: 'http://test.metalab.cn:3000/upload/token?bucket=metalab-test',
        //uptokenUrl: 'http://api.metalab.cn:3003/upload/token',
        maxSize: '1M'
    };

}]);
