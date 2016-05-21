'use strict';

angular.module('businessManager.topNav', [])
    .directive('topNav', function () {
        return {
            restrict: 'E',
            templateUrl: '/controllers/topNav/topNav.html',
            controller: 'topNavCtrl'
        }
    })
    .controller('topNavCtrl', ['$scope', '$location', function($scope, $location) {
    }]);