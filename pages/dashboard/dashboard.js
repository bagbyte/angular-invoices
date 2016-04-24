'use strict';

angular.module('businessManager.dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/dashboard', {
        templateUrl: 'pages/dashboard/dashboard.html',
        controller: 'dashboardCtrl'
    });
}])

.controller('dashboardCtrl', [function() {

}]);