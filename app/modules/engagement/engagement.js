angular.module('engagement')

.controller('SegmentationCtrl', ['$scope', '$routeParams', 'remoteFactory', 'filterHelper', 'eventRemote', 'chartHelper', 'compareHelper',
    function($scope, $routeParams, remoteFactory, filterHelper, eventRemote, chartHelper, compareHelper) {

        var brandId = $routeParams.brandId;

        $scope.metas = remoteFactory.meta_property_types;
        $scope.events = remoteFactory.meta_events;
        $scope.metadata = remoteFactory.meta_lists;
        $scope.subfilters = [];
        $scope.chartTypes = [{
            display_name: "Biểu đồ đường",
            id: 0
        }, {
            display_name: "Biểu đồ tròn",
            id: 1
        }, {
            display_name: "Biểu đồ cột",
            id: 2
        }];

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

        $scope.hideTypeChart = true;

        var fields = null;
        $scope.getResult = function() {
            var query = filterHelper.buildQuery($scope.subfilters);
            fields = {
                brand_id: brandId,
                event: $scope.event.name,
                filter: JSON.stringify(query),
                time_unit: $scope.time_unit.name,
                date_beg: $scope.data[0].dateDisplay,
                date_end: $scope.data[1].dateDisplay
            };

            var compareToObject = null;
            if ($scope.compareUnit.name_display != 'Chọn thuộc tính') {
                compareToObject = compareHelper.buildCompareToString($scope.compareUnit);
            }

            if (compareToObject != null) {
                fields.compare_by = JSON.stringify(compareToObject);
                $scope.hideTypeChart = false;
            } else
                $scope.hideTypeChart = true;

            updateChart(fields);
        }

        $scope.updateChart = function() {
            if (fields != null) {
                fields.time_unit = $scope.time_unit.name;
                updateChart(fields);
            }
        }

        function updateChart(fields) {
            eventRemote.count(fields, function(data) {
                if (data.error == undefined) {
                    console.log(data);

                    $scope.chartData[0] = chartHelper.buildLineChart(data, $scope.event.name_display);
                    $scope.chartData[1] = chartHelper.buildPieChart(data, $scope.event.name_display);
                    $scope.chartData[2] = chartHelper.buildColumnChart(data, $scope.event.name_display);
                }
            }, function() {});
        }

        $scope.chartData = [{}, {}, {}];

        $scope.data = [{
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

            if (fields != null) {
                fields.date_beg = $scope.data[0].dateDisplay;
                updateChart(fields);
            }
        }

        $scope.onTimeSetTwo = function(newDate, oldDate) {
            var d = newDate.getDate();
            var m = newDate.getMonth() + 1;
            var y = newDate.getFullYear();

            $scope.data[1].dateDisplay = '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
            if (fields != null) {
                fields.date_end = $scope.data[1].dateDisplay;
                updateChart(fields);
            }
        }

    }
])

.config(function($routeProvider) {
    var access = routingConfig.accessLevels;
    $routeProvider
        .when('/segmentation/:brandId', {
            templateUrl: 'modules/engagement/segmentation/segmentation.html',
            controller: 'SegmentationCtrl',
            access: access.user
        })
});