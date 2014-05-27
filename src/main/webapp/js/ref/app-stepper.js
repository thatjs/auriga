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

    // external data binding
    // <body ng-app="thatjs" ng-controller="ratingCtrl">
    //     <h3>tj-stepper demo (3/5)</h3>
    //     Model value : {{ rating }}<br>
    //     <hr>
    //     <div ng-model="rating" tj-stepper></div>
    // </body>

    .controller('ratingCtrl', function ($scope) {
        $scope.rating = 42;
        $scope.minRating = 45;
        $scope.maxRating = 50;
    })

    // declare native directive
    .directive('tjStepper', function () {
        return {
            // can be used as attribute or element
            restrict: 'AE',
            // scope don't need to bind value to external ngModel
            // as we require its controller, can access directly
            scope: {
                min: '=',
                max: '='
            },
            require: 'ngModel',
            // directive scope as private and empty
            // scope: {},
            // databinding to control a public variable
            // binds internal value variable to outer application
            // = is double data binding
            // usage: <div tj-stepper ng-model="rating"></div>
            // scope: {
            //     value: '=ngModel'
            // },
            // markup to generate
            // template: '<button>-</button>' +
            //     '<div>0</div>' +
            //     '<button>+</button>'
            // markup to generate
            template: '<button ng-click="decrement()">-</button>' +
                '<div>{{ value }}</div>' +
                '<button ng-click="increment()">+</button>',
            // this function is called on each tjStepper instance initialization
            // we just declare what we need in the above template
            // link: function (scope, element, attributes) {
            //     scope.value = 0;
            //     scope.increment = function () {
            //         scope.value++;
            //     };
            //     scope.decrement = function () {
            //         scope.value--;
            //     };
            // }
            // require ngModel makes the controll avaiable here
            // play nice with angular form controllers
            link: function (scope, element, attributes, modelCtrl) {

                // when model changes, update the view (just update the div content)
                modelCtrl.$render = function () {
                    element.find('div').text(modelCtrl.$viewValue);
                };

                function checkValidity() {
                    // check if min/max defined to check validity
                    var isOverMin = (angular.isDefined(scope.min) && modelCtrl.$viewValue < parseInt(scope.min, 10)),
                        isOverMax = (angular.isDefined(scope.max) && modelCtrl.$viewValue > parseInt(scope.max, 10)),
                        valid = !(isOverMin || isOverMax);
                    // set our model validity
                    // the outOfBounds is an arbitrary key for the error.
                    // will be used to generate the CSS class names for the errors
                    modelCtrl.$setValidity('outOfBounds', valid);
                }

                // update the model then the view
                function updateModel(offset) {
                    // call $parsers pipeline the update $modelValue
                    modelCtrl.$setViewValue(modelCtrl.$viewValue + offset);
                    // update the local view
                    modelCtrl.$render();
                    // check validity
                    checkValidity();
                }

                // update the value when the user clicks the buttons
                scope.increment = function () {
                    updateModel(+1);
                };
                scope.decrement = function () {
                    updateModel(-1);
                };

                // check validity on start, in case we're directly out of bounds
                checkValidity();
                // watch out min/max and recheck validity if they change
                scope.$watch('min+max', function () {
                    checkValidity();
                });
            }
        };
    });

// basic usage:
// <div tj-stepper></div>

