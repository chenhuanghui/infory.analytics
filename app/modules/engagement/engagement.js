angular.module('engagement')

.controller('SegmentationCtrl', ['$scope', '$routeParams', 'remoteFactory', 'filterHelper', 'eventRemote', 'chartHelper',
    function($scope, $routeParams, remoteFactory, filterHelper, eventRemote, chartHelper) {

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

        $scope.compareUnits = [{
            name: 'day',
            name_display: 'Ngày'
        }, {
            name: 'week',
            name_display: 'Tuần'
        }, {
            name: 'month',
            name_display: 'Tháng'
        }];

        var fields = null;
        $scope.getResult = function() {
            var query = filterHelper.buildQuery($scope.subfilters);
            fields = {
                brand_id: brandId,
                event: $scope.event.name,
                filter: JSON.stringify(query),
                time_unit: $scope.time_unit.name,
                date_beg: $scope.dateBegin.toString(),
                date_end: $scope.dateEnd.toString()
            };

            eventRemote.count(fields, function(data) {
                if (data.error == undefined) {
                    $scope.chartData[0] = chartHelper.buildLineChart(data, $scope.event.name_display);
                }
            }, function() {});
        }

        $scope.updateChart = function() {
            if (fields != null) {
                fields.time_unit = $scope.time_unit.name;
                eventRemote.count(fields, function(data) {
                    if (data.error == undefined) {
                        $scope.chartData[0] = chartHelper.buildLineChart(data, $scope.event.name_display);
                    }
                }, function() {});
            }
        }

        $scope.chartData = [{}, {}, {}];

        $scope.data = [{
            dateDropDownInput: moment("2013-10-22T00:00:00.000").toDate(),
            dateDisplay: "22-10-2013",
        }, {
            dateDropDownInput: moment("2014-02-22T00:00:00.000").toDate(),
            dateDisplay: "22-02-2014",
        }];

        $scope.dateBegin = '2013-10-22';
        $scope.dateEnd = '2014-02-22';

        $scope.onTimeSetOne = function(newDate, oldDate) {
            var d = newDate.getDate();
            var m = newDate.getMonth() + 1;
            var y = newDate.getFullYear();

            $scope.data[0].dateDisplay = '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
            $scope.dateBegin = $scope.data[0].dateDisplay;
        }

        $scope.onTimeSetTwo = function(newDate, oldDate) {
            var d = newDate.getDate();
            var m = newDate.getMonth() + 1;
            var y = newDate.getFullYear();

            $scope.data[1].dateDisplay = '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
            $scope.dateEnd = $scope.data[1].dateDisplay;
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