// integrate requirejs

// need to download angular-resource

define(['angular', 'services/services'], function (angular)
    return angular.module('thatjs', ['ngResource'])
);
