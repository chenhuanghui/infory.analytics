angular.module('engagement')

.controller('SegmentationCtrl', ['$scope', '$routeParams', '$location', 'remoteFactory', 'filterHelper', 'eventRemote', 'chartHelper', 'compareHelper', 'serviceHelper', 'bookmarkRemote',

    function($scope, $routeParams, $location, remoteFactory, filterHelper, eventRemote, chartHelper, compareHelper, serviceHelper, bookmarkRemote) {

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

        $scope.saveFilter = function() {
            buildQuery();
            fields.bookmark_name = 'user_age';

            bookmarkRemote.eventCreate(fields, function(data) {
                console.log(data)
            }, function() {});
        }

        function buildQuery() {
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
            }
        }

        $scope.getResult = function() {
            buildQuery();
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
                    $scope.chartData[0] = chartHelper.buildLineChart(data, $scope.event.name_display);
                    $scope.chartData[1] = chartHelper.buildPieChart(data, $scope.event.name_display);
                    $scope.chartData[2] = chartHelper.buildColumnChart(data, $scope.event.name_display);
                }
            }, function() {});
        }

        $scope.chartData = [{}, {}, {}];

        var intervalDate = serviceHelper.getIntervalDate();
        $scope.data = [{
            dateDropDownInput: intervalDate.date_beg,
            dateDisplay: serviceHelper.normalizeTime(intervalDate.date_beg),
        }, {
            dateDropDownInput: intervalDate.date_end,
            dateDisplay: serviceHelper.normalizeTime(intervalDate.date_end)
        }];

        $scope.onTimeSetOne = function(newDate, oldDate) {
            $scope.data[0].dateDisplay = serviceHelper.normalizeTime(newDate);

            if (fields != null) {
                fields.date_beg = $scope.data[0].dateDisplay;
                updateChart(fields);
            }
        }

        $scope.onTimeSetTwo = function(newDate, oldDate) {
            $scope.data[1].dateDisplay = serviceHelper.normalizeTime(newDate);
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
                templateUrl: 'modules/engagement/template/segmentation/segmentation.html',
                controller: 'SegmentationCtrl',
                access: access.user
            })
            .when('/funnel/step1/:brandId', {
                templateUrl: 'modules/engagement/template/funnel/funnel_step_1.html',
                controller: 'FunnelStep1Ctrl',
                access: access.user
            })
            .when('/funnel/step2/:brandId', {
                templateUrl: 'modules/engagement/template/funnel/funnel_step_2.html',
                controller: 'FunnelStep2Ctrl',
                access: access.user
            })
    });