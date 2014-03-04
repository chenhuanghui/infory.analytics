angular.module('home')

.controller('HomeCtrl', ['$scope', '$http', '$location', '$routeParams', 'remoteFactory', 'dataFactory', 'Auth', 'brandRemote', 'chartHelper',

    function($scope, $http, $location, $routeParams, remoteFactory, dataFactory, Auth, brandRemote, chartHelper) {
        $scope.brandId = -1;
        $scope.dataChart = [{}, {}];

        var fields = [null, null, null];

        $scope.updateTimeUnit = function(time_unit, id) {
            fields[id].time_unit = time_unit.name_display;
            updateChart(fields[id], id);
        };

        $scope.updateHome = function(brandId) {
            $scope.brandId = brandId;
            brandRemote.getHome({
                brand_id: brandId
            }, function(data) {
                $scope.brandInfo = data;

                fields[0] = {
                    brandId: $scope.brandId,
                    time_units: $scope.time_unit_1.name_display,
                    date_beg: $scope.data[0].dateDisplay,
                    date_end: $scope.data[1].dateDisplay
                };


                fields[1] = {
                    brandId: $scope.brandId,
                    time_units: $scope.time_unit_2.name_display,
                    date_beg: $scope.data[2].dateDisplay,
                    date_end: $scope.data[3].dateDisplay
                };


                fields[2] = {
                    brandId: $scope.brandId,
                    time_units: $scope.time_unit_3.name_display,
                    date_beg: $scope.data[4].dateDisplay,
                    date_end: $scope.data[5].dateDisplay
                };

                updateChart(fields[0], 0);
                updateChart(fields[1], 1);
                updateChart(fields[2], 2);

            }, function() {});
        };

        function updateChart(fields, id) {
            brandRemote.getCostChart(fields, function(data) {
                if (data.error == undefined)
                    $scope.dataChart[id] = chartHelper.buildLineChart(data, id + 1);
            }, function() {});
        }
        dataFactory.setUpdateHomeFunc($scope.updateHome);

        $scope.time_units = [{
            name: 'day',
            name_display: 'Ngày'
        }, {
            name: 'week',
            name_display: 'Tuần'
        }, {
            name: 'month',
            name_display: 'Tháng'
        }];

        $scope.data = [{
            dateDropDownInput: moment("2013-10-22T00:00:00.000").toDate(),
            dateDisplay: "22-10-2013",
        }, {
            dateDropDownInput: moment("2014-02-22T00:00:00.000").toDate(),
            dateDisplay: "22-02-2014",
        }, {
            dateDropDownInput: moment("2013-10-22T00:00:00.000").toDate(),
            dateDisplay: "22-10-2013",
        }, {
            dateDropDownInput: moment("2014-02-22T00:00:00.000").toDate(),
            dateDisplay: "22-02-2014",
        }, {
            dateDropDownInput: moment("2013-10-22T00:00:00.000").toDate(),
            dateDisplay: "22-10-2013",
        }, {
            dateDropDownInput: moment("2014-02-22T00:00:00.000").toDate(),
            dateDisplay: "22-02-2014",
        }];

        $scope.onTimeSetOne = function(newDate, oldDate) {
            var d = newDate.getDate();
            var m = newDate.getMonth() + 1;
            var y = newDate.getFullYear();

            $scope.data[0].dateDisplay = '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
            if (fields[0] != null) {
                fields[0].date_beg = $scope.data[0].dateDisplay = '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
                updateChart(fields[0], 0);
            }
        }

        $scope.onTimeSetTwo = function(newDate, oldDate) {
            var d = newDate.getDate();
            var m = newDate.getMonth() + 1;
            var y = newDate.getFullYear();

            $scope.data[1].dateDisplay = '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
            if (fields[0] != null) {
                fields[0].date_end = $scope.data[1].dateDisplay = '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
                updateChart(fields[0], 0);
            }
        }

        $scope.onTimeSetThree = function(newDate, oldDate) {
            var d = newDate.getDate();
            var m = newDate.getMonth() + 1;
            var y = newDate.getFullYear();

            $scope.data[2].dateDisplay = '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
            if (fields[1] != null) {
                fields[1].date_beg = $scope.data[2].dateDisplay = '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
                updateChart(fields[1], 1);
            }
        }

        $scope.onTimeSetFour = function(newDate, oldDate) {
            var d = newDate.getDate();
            var m = newDate.getMonth() + 1;
            var y = newDate.getFullYear();

            $scope.data[3].dateDisplay = '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
            if (fields[1] != null) {
                fields[1].date_end = $scope.data[3].dateDisplay = '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
                updateChart(fields[1], 1);
            }
        }

        $scope.onTimeSetFive = function(newDate, oldDate) {
            var d = newDate.getDate();
            var m = newDate.getMonth() + 1;
            var y = newDate.getFullYear();

            $scope.data[4].dateDisplay = '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
            if (fields[2] != null) {
                fields[2].date_beg = $scope.data[4].dateDisplay = '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
                updateChart(fields[2], 2);
            }
        }

        $scope.onTimeSetSix = function(newDate, oldDate) {
            var d = newDate.getDate();
            var m = newDate.getMonth() + 1;
            var y = newDate.getFullYear();

            $scope.data[5].dateDisplay = '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
            if (fields[2] != null) {
                fields[2].date_end = $scope.data[5].dateDisplay = '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
                updateChart(fields[2], 2);
            }
        }

    }
])