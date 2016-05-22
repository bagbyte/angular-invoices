'use strict';

angular.module('businessManager.reports', ['ui.bootstrap.modal'])
    .controller('reports', ['$scope', '$filter', 'reportsDataFactory', function($scope, $filter, dataFactory) {

        $scope.status;
        $scope.reports;
        $scope.orders;

        $scope.report = emptyReport();
        $scope.expense = emptyExpense();
        $scope.newExpense = true;

        getReports();

        function getReports() {
            dataFactory.getReports()
                .then(function (response) {
                    $scope.reports = response.data;
                }, function (error) {
                    $scope.status = 'Unable to load reports: ' + error.message;
                });
        }

        function emptyExpense() {
            return {
                id: null,
                amount: 0,
                hasInvoice: false,
                description: '',
                note: ''
            };
        }

        function emptyReport() {
            return {
                id: null,
                date: $filter('date')(new Date(), 'dd/MM/yyyy'),
                total: 0.0,
                cash: 0.0,
                extra: 0.0,
                note: '',
                expenses: []
            };
        }

        function getExtraValue(report) {
            var extra = 0;

            if (!isNaN(report.total))
                extra = report.total;

            if (!isNaN(report.cash))
                extra -= report.cash;

            angular.forEach(report.expenses, function(expense, key) {
                if (!isNaN(expense.amount))
                    extra -= expense.amount;
            });

            return extra;
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

        $scope.extraValue = function() {
            return getExtraValue($scope.report);
        };

        $scope.updateExtraValue = function() {
            $scope.report.extra = getExtraValue($scope.report);
        };

        $scope.emptyExpense = function() {
            $scope.expense = emptyExpense();
            $scope.newExpense = true;
        };

        $scope.openExpenseForm = function(expense) {
        };

        $scope.addExpense = function() {
            if ($scope.newExpense)
                $scope.report.expenses.push($scope.expense);

            $scope.updateExtraValue();
        };

        $scope.hasExpenses = function() {
            return $scope.report.expenses.length > 0;
        };

        $scope.deleteExpense = function(index) {
            $scope.report.expenses.splice(index, 1);

            $scope.updateExtraValue();
        };

        $scope.setCurrentExpense = function(index) {
            $scope.newExpense = false;
            $scope.expense = $scope.report.expenses[index];
        };
/*
        $scope.deleteExpense = function(expense) {
            var index = $scope.report.expenses.indexOf(expense);
            $scope.report.expenses.splice(index, 1);
        };

        $scope.setCurrentExpense = function(expense) {
            $scope.newExpense = false;
            $scope.expense = expense;
        };
*/

        $('#report-date').daterangepicker({
            singleDatePicker: true,
            calender_style: "picker_4",
            format: 'DD/MM/YYYY'
        });
    }]);