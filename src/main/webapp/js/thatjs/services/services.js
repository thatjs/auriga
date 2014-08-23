/*globals angular */
// apiService
// inject dependency into module, then call the service object method
//
// Usage:
// angular.module('thatjs.widget', ['thatjs.apiService'])
//   .controller('widget', function ($scope, $http, apiService) {
//     ...
//     apiService.getData(itemId).then(function (promise) {
//       $scope.myVar = promise.results;
//     });
//
// Notes:
//   $http methods return promise objects

angular.module('thatjs.apiService', [])
    .service('apiService', ['$http', function ($http) {
        return {
            baseUrl: '/api/Navigation',
            getNavigation: function () {
                var promise = $http.get(this.baseUrl)
                    .success(function (data, status, headers, config) {
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        return {
                            "status": false
                        };
                    });

                return promise;
            },

            getCommand: function (commandId) {
                // /api/Command(000267a3-5c30-40aa-80da-6773466d3a34)
                var promise = $http.get('/api/Command(' + commandId + ')')
                    .success(function (data, status, headers, config) {
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        return {
                            "status": false
                        };
                    });

                return promise;
            }
        };
    }]);
