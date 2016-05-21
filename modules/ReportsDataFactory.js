'use strict';

angular.module('businessManager.reportsDataFactory', [])
    .factory('reportsDataFactory', ['$http', function($http) {

        var urlBase = '/api/dailyReports';
        var reportsDataFactory = {};

        reportsDataFactory.getReports = function () {
            return $http.get(urlBase);
        };

        reportsDataFactory.getReport = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        reportsDataFactory.insertReport = function (report) {
            return $http.post(urlBase, report);
        };

        reportsDataFactory.updateReport = function (report) {
            return $http.put(urlBase + '/' + report.ID, report)
        };

        reportsDataFactory.deleteReport = function (id) {
            return $http.delete(urlBase + '/' + id);
        };

        return reportsDataFactory;
    }]);