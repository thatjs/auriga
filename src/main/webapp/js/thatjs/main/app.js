// dev link /js/thatjs/main/app.js
// prod /v1000/js/that.js - optimized, minified and compressed

var thatjs = angular.module('thatjs', []);


thatjs.controller('headerNavCtrl', function ($scope) {
    $scope.headerNav = [
        {'name': 'About'},
        {'name': 'Run'},
        {'name': 'Docs'}
    ];
});


