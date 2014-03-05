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

.controller('FunnelCtrl', ['$scope', '$routeParams', 'dataFactory', 'remoteFactory',
    function($scope, $routeParams, dataFactory, remoteFactory) {
        
        console.log(remoteFactory.meta_events);
        $scope.metas = remoteFactory.meta_property_types;
        $scope.events = remoteFactory.meta_events;
        $scope.metadata = remoteFactory.meta_lists;
        $scope.subfilters = null;
        
        $scope.columnChart = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Monthly Average Rainfall'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ]
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Rainfall (mm)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Tokyo',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

            }, {
                name: 'New York',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

            }, {
                name: 'London',
                data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

            }, {
                name: 'Berlin',
                data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

            }]
        };

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
        .when('/funnel', {
            templateUrl: 'modules/engagement/funnel/funnel.html',
            controller: 'FunnelCtrl',
            access: access.user
        })
});