// dev link /js/thatjs/main/app.js
// prod /v1000/js/that.js - optimized, minified and compressed

// declare module name and dependencies = none
angular.module('thatjs', [])

    .controller('headerNavCtrl', function ($scope) {
        $scope.headerNav = [
            {'name': 'About'},
            {'name': 'Run'},
            {'name': 'Docs'}
        ];
    })

    .directive('twinTextarea', function () {
        return {
            restrict: 'A',
            template: '<textarea class="col-4 js-src">tryme</textarea>' +
                '<textarea class="col-4 js-src js-test"></textarea>'
        };
    });

