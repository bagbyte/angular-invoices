'use strict';

angular.module('businessManager.reports', [])
    .controller('reports', ['$scope', 'reportsDataFactory', function($scope, dataFactory) {

        $scope.status;
        $scope.reports;
        $scope.orders;

        getReports();

        function getReports() {
            dataFactory.getReports()
                .then(function (response) {
                    $scope.reports = response.data;
                }, function (error) {
                    $scope.status = 'Unable to load reports: ' + error.message;
                });
        }

        $scope.updateReport = function (id) {
            var rep;
            for (var i = 0; i < $scope.reports.length; i++) {
                var currRep = $scope.reports[i];
                if (currRep.ID === id) {
                    rep = currRep;
                    break;
                }
            }

            dataFactory.updateReport(rep)
                .then(function (response) {
                    $scope.status = 'Updated Report! Refreshing report list.';
                }, function (error) {
                    $scope.status = 'Unable to update report: ' + error.message;
                });
        };

        $scope.insertReport = function () {
            //Fake report data
            var rep = {
                ID: 10,
                FirstName: 'JoJo',
                LastName: 'Pikidily'
            };
            dataFactory.insertReport(rep)
                .then(function (response) {
                    $scope.status = 'Inserted Report! Refreshing report list.';
                    $scope.reports.push(rep);
                }, function(error) {
                    $scope.status = 'Unable to insert report: ' + error.message;
                });
        };

        $scope.deleteReport = function (id) {
            dataFactory.deleteReport(id)
                .then(function (response) {
                    $scope.status = 'Deleted Report! Refreshing report list.';
                    for (var i = 0; i < $scope.reports.length; i++) {
                        var rep = $scope.reports[i];
                        if (rep.ID === id) {
                            $scope.reports.splice(i, 1);
                            break;
                        }
                    }
                    $scope.orders = null;
                }, function (error) {
                    $scope.status = 'Unable to delete report: ' + error.message;
                });
        };

        $scope.getReportOrders = function (id) {
            dataFactory.getOrders(id)
                .then(function (response) {
                    $scope.status = 'Retrieved orders!';
                    $scope.orders = response.data;
                }, function (error) {
                    $scope.status = 'Error retrieving reports! ' + error.message;
                });
        };

        $scope.openExpenseForm = function(size) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/controllers/expenses/form.html',
                controller: 'expenses',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }]);