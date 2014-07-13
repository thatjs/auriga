/*globals window */
// dev link /js/thatjs/main/app.js
// prod /v1000/js/that.js - optimized, minified and compressed

// declare module name and dependencies
angular.module('thatjs', ['urlDecode', 'quickNotes'])

    .controller('headerNavCtrl', function ($scope) {
        window.headerNav = $scope;
        $scope.headerNav = [
            {'name': 'About'},
            {'name': 'Run'},
            {'name': 'Docs'}
        ];
    });

// quicknotes
angular.module('quickNotes', [])

    .controller('quicknotes', function ($scope) {

        $scope.expression = {
            command: 'git',
            subcommand: 'commit',
            flags: '-m',
            args: '"Commit message"',
            content: 'Commit the changes in the working directory to the local repository.'
        };

    })

    .directive('quickNotes', function () {  //quick-notes

        return {
            restrict: 'A',
            template: '<div class="quicknotes">' +
                '<div class="cmd arg action">{{expression.command}}</div>' +
                '<div class="arg action">{{expression.subcommand}}</div>' +
                '<div class="arg action">{{expression.flags}}</div>' +
                '<div class="arg">{{expression.args}}</div>' +
                '<div class="content">{{expression.content}}</div>' +
                '</div>'
        };
    });

// urlDecode
angular.module('urlDecode', [])

    .controller('decode', function ($scope) {

        $scope.decodedStr = "http://localhost:8080/thatjs/odata/Person(id='826',group='12',role='6')?" +
            "$filter=Status eq 'active'&$format=json";


        $scope.update = function (event) {
            // console.info(event); // working
        };

        $scope.decode = function (str) {
            $scope.encodedStr = str;
            // console.info('str = ', str);
        };

        $scope.encode = function (str) {
            $scope.decodedStr = str;
            // console.info('str = ', str);
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
            // ng-model, specify scope variable, which can be used as an argument passed to scope functions
            template: '<textarea class="col-4 js-src" ng-keyup="update(event=$event)" ng-model="decodedStr">{{decodedStr}}</textarea>' +
                '<textarea class="col-4 js-src js-test" ng-keyup="update(event=$event)" ng-model="encodedStr">{{encodedStr}}</textarea>' +
                '<div class="clearfix"><button class="btn btn-primary" ng-click="encode(decodedStr)">encode</button>' +
                '<button class="btn btn-secondary" ng-click="decode(encodedStr)">decode</button></div>',

            // require: ngModel makes the controll avaiable here
            // play nice with angular form controllers
            link: function (scope, element, attr) {
                // ngModel.$render = function () {
                //     element.find('textarea .js-src').val(ngModel.$viewValue || 'not working yet');
                // };
            }
        };
    });

