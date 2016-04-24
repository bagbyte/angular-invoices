'use strict';

// Declare app level module which depends on views, and components
angular.module('businessManager', [
    'ngRoute',
    'businessManager.dashboard'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/dashboard'});
}]);