'use strict';

// Declare app level module which depends on views, and components
angular.module('businessManager', [
    'ngRoute',
    'businessManager.dashboard',
    'businessManager.topNav',
    'businessManager.sidebar',
    'businessManager.reports',
    'businessManager.reportsDataFactory',
    'businessManager.suppliersDataFactory'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/reports/list",
            {
                templateUrl: '/controllers/reports/list.html',
                controller: 'reports',
                controllerAs: "app"
            }
        )
        .when("/reports/create",
            {
                templateUrl: '/controllers/reports/form.html',
                controller: 'reports',
                controllerAs: "app"
            }
        )
        .when("/reports/show",
            {
                templateUrl: '/controllers/reports/form.html',
                controller: 'reports',
                controllerAs: "app"
            }
        )
        .otherwise({redirectTo: '/'});
}]);