// navbar
angular.module('thatjs', [])
    .service('data', function () {

        this.navItems = {

        };


    })

    .controller('headerNavCtrl', function ($scope) {
        window.headerNav = $scope;
        $scope.headerNav = [
            {'name': 'About'},
            {'name': 'Run'},
            {'name': 'Docs'}
        ];
    })

    .directive('headerNav', function () {  //header-nav

        return {
            restrict: 'A',

               // below needs refactoring, explicit controller not needed
               // scoping for directive
            template: '<ul class="global-nav" ng-controller="headerNavCtrl">' +
                '<li ng-repeat="item in headerNav"><a href="{{item.name | lowercase}}">{{item.name}}</a></li>' +
                '</ul>'
        };
    });