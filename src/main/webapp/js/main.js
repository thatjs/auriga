// integrate requirejs

require.config({
    paths: {
        angular: '/js/lib/angularjs/angularjs-1.3.0-beta-3',
        jquery: '/js/lib/jquery/jquery-1.11.0'
    },
    shim: {
        angular: {
            deps: [ 'jquery/jquery-1.11.0' ],
            exports: 'angular'
        }
    }
});

require([
        'thatjs',
        'services/services'
    ],
    function (angular, thatjs) {
        'use strict';

        thatjs.config(['$routeProvider',
            function ($routeProvider) {
                $routeProvider.
                    when('/', {
                        templateUrl: 'partials/phone-list.html',
                        controller: 'PhoneListCtrl'
                    }).
                    when('/phones/:phoneId', {
                        templateUrl: 'partials/phone-detail.html',
                        controller: 'PhoneDetailCtrl'
                    }).
                    otherwise({
                        redirectTo: '/phones'
                    });
            }]);
    }
);
