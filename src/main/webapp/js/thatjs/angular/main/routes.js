/*globals window, console */
// dev link /js/thatjs/main/routes.js
// prod /v1000/js/out/that.js - optimized, minified and compressed

// declare module name and dependencies
angular.module('thatjs', ['ngResource', 'ngRoute'])
    .constant('baseUrl', '/views')
    .config(function ($routeProvider, $locationProvider) {

        $locationProvider.html5mode = true;

        $routeProvider.when('/about', {
            templateUrl: '/js/thatjs/views/about.html'
        });

        $routeProvider.when('/docs', {
            templateUrl: '/js/thatjs/views/docs.html'
        });

        $routeProvider.otherwise({
            templateUrl: '/js/thatjs/views/about.html'
        });

    })

    .controller('defaultCtrl', function ($scope, $http, $resources, $location, baseUrl) {

        $location.path('/about');

    });
