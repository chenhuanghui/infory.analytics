angular.module('home')

.controller('HomeCtrl', ['$scope', '$http', '$location', '$routeParams', 'remoteFactory', 'dataFactory', 'Auth', 'brandRemote', 'chartHelper', 'serviceHelper',

    function($scope, $http, $location, $routeParams, remoteFactory, dataFactory, Auth, brandRemote, chartHelper, serviceHelper) {

        var intervalDate = serviceHelper.getIntervalDate();

        $scope.brandId = $routeParams.brandId;
        if ($scope.brandId != null) {
            dataFactory.getBrand($scope.brandId, function(data) {
                $scope.brand = data;
            }, function() {})
        }

        $scope.dataChart = [{}, {}, {}];

        var fields = [null, null, null];

        $scope.updateTimeUnit = function(time_unit, id) {
            fields[id].time_unit = time_unit.name;
            updateChart(fields[id], id);
        };

        $scope.updateHome = function(brandId) {
            $scope.brandId = brandId;
            brandRemote.getHome({
                brand_id: brandId
            }, function(data) {
                $scope.brandInfo = data;

                fields[0] = {
                    brand_id: $scope.brandId,
                    time_unit: $scope.time_unit_1.name,
                    date_beg: $scope.data[0].dateDropDownInput,
                    date_end: $scope.data[1].dateDropDownInput
                };


                fields[1] = {
                    brand_id: $scope.brandId,
                    time_unit: $scope.time_unit_2.name,
                    date_beg: $scope.data[2].dateDropDownInput,
                    date_end: $scope.data[3].dateDropDownInput
                };


                fields[2] = {
                    brand_id: $scope.brandId,
                    time_unit: $scope.time_unit_3.name,
                    date_beg: $scope.data[4].dateDropDownInput,
                    date_end: $scope.data[5].dateDropDownInput
                };

                updateChart(fields[0], 0);
                updateChart(fields[1], 1);
                updateChart(fields[2], 2);

            }, function() {});
        };

        function updateChart(fields, id) {
            fields.date_beg = serviceHelper.normalizeTime($scope.data[id * 2].dateDropDownInput);
            fields.date_end = serviceHelper.normalizeTime($scope.data[id * 2 + 1].dateDropDownInput);
            brandRemote.getCostChart(fields, function(data) {
                if (data.error == undefined)
                    $scope.dataChart[id] = chartHelper.buildLineChart(data, id + 1);
            }, function() {});
        }

        $scope.updateBrand = function(brand) {
            $scope.brand = brand;
        }

        dataFactory.setUpdateHomeBrandFunc($scope.updateBrand);
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
            dateDropDownInput: intervalDate.date_beg,
            dateDisplay: serviceHelper.normalizeTime(intervalDate.date_beg),
        }, {
            dateDropDownInput: intervalDate.date_end,
            dateDisplay: serviceHelper.normalizeTime(intervalDate.date_end)
        }, {
            dateDropDownInput: intervalDate.date_beg,
            dateDisplay: serviceHelper.normalizeTime(intervalDate.date_beg),
        }, {
            dateDropDownInput: intervalDate.date_end,
            dateDisplay: serviceHelper.normalizeTime(intervalDate.date_end)
        }, {
            dateDropDownInput: intervalDate.date_beg,
            dateDisplay: serviceHelper.normalizeTime(intervalDate.date_beg),
        }, {
            dateDropDownInput: intervalDate.date_end,
            dateDisplay: serviceHelper.normalizeTime(intervalDate.date_end)
        }];

        $scope.onTimeSetOne = function(newDate, oldDate) {
            $scope.data[0].dateDisplay = serviceHelper.normalizeTime(newDate);
            if (fields[0] != null) {
                fields[0].date_beg = $scope.data[0].dateDropDownInput;
                updateChart(fields[0], 0);
            }
        }

        $scope.onTimeSetTwo = function(newDate, oldDate) {
            $scope.data[1].dateDisplay = serviceHelper.normalizeTime(newDate);
            if (fields[0] != null) {
                fields[0].date_end = $scope.data[1].dateDropDownInput;
                updateChart(fields[0], 0);
            }
        }

        $scope.onTimeSetThree = function(newDate, oldDate) {
            $scope.data[2].dateDisplay = serviceHelper.normalizeTime(newDate);
            if (fields[1] != null) {
                fields[1].date_beg = $scope.data[2].dateDropDownInput;
                updateChart(fields[1], 1);
            }
        }

        $scope.onTimeSetFour = function(newDate, oldDate) {
            $scope.data[3].dateDisplay = serviceHelper.normalizeTime(newDate);
            if (fields[1] != null) {
                fields[1].date_end = $scope.data[3].dateDropDownInput;
                updateChart(fields[1], 1);
            }
        }

        $scope.onTimeSetFive = function(newDate, oldDate) {
            $scope.data[4].dateDisplay = serviceHelper.normalizeTime(newDate);
            if (fields[2] != null) {
                fields[2].date_beg = $scope.data[4].dateDropDownInput;
                updateChart(fields[2], 2);
            }
        }

        $scope.onTimeSetSix = function(newDate, oldDate) {
            $scope.data[5].dateDisplay = serviceHelper.normalizeTime(newDate);
            if (fields[2] != null) {
                fields[2].date_end = $scope.data[5].dateDropDownInput;
                updateChart(fields[2], 2);
            }
        }

    }
])