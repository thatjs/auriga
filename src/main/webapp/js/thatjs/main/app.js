/*globals window */
// dev link /js/thatjs/main/app.js
// prod /v1000/js/that.js - optimized, minified and compressed

// declare module name and dependencies = none
angular.module('thatjs', ['urlDecode'])

    .controller('headerNavCtrl', function ($scope) {
        window.headerNav = $scope;
        $scope.headerNav = [
            {'name': 'About'},
            {'name': 'Run'},
            {'name': 'Docs'}
        ];
    });

angular.module('urlDecode', [])

    .controller('decode', function ($scope) {
        $scope.rawUrl = "http://localhost:8080/thatjs/odata/Person(id='826',group='12',role='6')?$filter=Status eq 'active'&$format=json";

        $scope.update = function (event) {
            console.info(event); // working
        };

        window.here = $scope;
    })


    // <div twin-textarea ng-controller="decode"></div>
    .directive('twinTextarea', function () {

        // window.there = $
        return {
            restrict: 'A',
            // require: 'ngModel',
            // controller: 'urlDecodeCtrl',
            // adding ng-model, tryme does not render, data is first textbox echoes in second
            template: '<textarea class="col-4 js-src" ng-keyup="update(event=$event)">{{rawUrl}}</textarea>' +
                '<textarea class="col-4 js-src js-test" ng-keyup="update(event=$event)"></textarea>',

            // require: ngModel makes the controll avaiable here
            // play nice with angular form controllers
            link: function (scope, element, attr) {
                // ngModel.$render = function () {
                //     element.find('textarea .js-src').val(ngModel.$viewValue || 'not working yet');
                // };
            }
        };
    });

