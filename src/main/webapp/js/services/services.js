// router
var thatjs = angular.module('thatjs', [
    'ngRoute',
    'pageControllers'
]);




// services
var services = angular.module('thatjs.services', ['ngResource']);

services.factory('Recipe', ['$resource',
    function ($resource) {
        return $resource('/recipes/:id', { id: '@id' });
    }]);

services.factory('MultiRecipeLoader', ['Recipe', '$q',
    function (Recipe, $q) {
        return function () {
            var delay = $q.defer();
            Recipe.query(function (recipes) {
                delay.resolve(recipes);
            },
                function () {
                    delay.reject('Unable to fetch recipes');
                });
            return delay.promise;
        };
    }]);

services.factory('RecipeLoader', ['Recipe', '$route', '$q',
    function (Recipe, $route, $q) {
        return function () {
            var delay = $q.defer();
            // ... stopped here ...
            Recipe.get(function (recipes) {
                delay.resolve(recipes);
            },
                function () {
                    delay.reject('Unable to fetch recipes');
                });
            return delay.promise;
        };
    }]);
