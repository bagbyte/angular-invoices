'use strict';

angular.module('businessManager.suppliersDataFactory', [])
    .factory('suppliersDataFactory', ['$http', function($http) {

        var urlBase = '/api/companies';s
        var suppliersDataFactory = {};

        suppliersDataFactory.getSuppliers = function () {
            return $http.get(urlBase);
        };

        suppliersDataFactory.getSupplier = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        suppliersDataFactory.insertSupplier = function (supplier) {
            return $http.post(urlBase, supplier);
        };

        suppliersDataFactory.updateSupplier = function (supplier) {
            return $http.put(urlBase + '/' + supplier.ID, supplier)
        };

        suppliersDataFactory.deleteSupplier = function (id) {
            return $http.delete(urlBase + '/' + id);
        };

        return suppliersDataFactory;
    }]);