/*globals window, console */
// quicknotes
angular.module('quickNotes', [])

    .service('data', function () {

        this.expression = {
            id: '24', // uuid later, assembled id
            contentId: '24',
            tooltip: 'Click to edit',
            args: [{
                name: 'git',
                sort: '0',
                parent: null,
                id: '20',  // uuid later
                editable: true,
                editing: false
            }, {
                name: 'commit',
                sort: '1',
                parent: '20',
                id: '21',
                editable: true,
                editing: false
            }, {
                name: '-m',
                sort: '2',
                parent: '20',
                id: '22',
                editable: true,
                editing: false
            }, {
                name: '"Commit message"',
                sort: '3',
                parent: '20',
                id: '23',
                editable: false,
                editing: false
            }],
            content: 'Commit the changes in the working directory to the local repository.'
        };
    })

    .controller('quicknotes', function ($scope, data) {


        $scope.expression = data.expression;

        $scope.edit = function (item) {
            console.info('editing');
            console.info(item);
            // working except block switch breaks layout, need to add inline-block/float to form element
            item.editing = (item.editing === true) ? false : true;
        };

        $scope.getTitle = function (item) {
            return (item.editable === true) ? this.expression.tooltip : '';
        };

        $scope.getActionCls = function (item) {
            return (item.editable === true) ? ' action' : '';
        };


    })

    .directive('quickNotes', function () {  //quick-notes

        // item passed to edit() method is unique

        return {
            restrict: 'A',

            template: '<div class="quicknotes">' +

                '<form ng-repeat-start="item in expression.args" ng-show="item.editing" debug="{{item.name}}" ng-submit="item.editing = false">' +
                '<input type="text" size="6" ng-model="item.name" ng-model-options="{ updateOn: \'change\' }" placeholder="cmd" ng-required/>' +
                '</form>' +

                '<div ng-repeat-end class="arg{{getActionCls(item)}}" ng-hide="item.editing" ' +
                    'ng-click="edit(item)" title="{{getTitle(item)}}">{{item.name}}</div>' +

                '<div class="content">{{expression.content}}</div>' +

                '</div>'
        };
    })

    // not working yet
    .directive('cmdEditable', function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                // view -> model
                elem.on('blur', function () {
                    scope.$apply(function () {
                        ctrl.$setViewValue(elem.html());
                    });
                });

                // model -> view
                ctrl.$render = function () {
                    elem.html(ctrl.$viewValue);
                };

                // load init value from DOM
                ctrl.$setViewValue(elem.html());
            }
        };
    });