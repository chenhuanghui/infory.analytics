angular.module('engagement')

.controller('SegmentationCtrl', ['$scope', '$routeParams', '$location', 'remoteFactory', 'filterHelper', 'eventRemote', 'chartHelper', 'compareHelper', 'serviceHelper', 'bookmarkRemote', 'homeFactory', 'segmentationFactory',

    function($scope, $routeParams, $location, remoteFactory, filterHelper, eventRemote, chartHelper, compareHelper, serviceHelper, bookmarkRemote, homeFactory, segmentationFactory) {

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

        $scope.chartData = [{}, {}, {}];

        var intervalDate = serviceHelper.getIntervalDate();
        $scope.data = [{
            dateDropDownInput: intervalDate.date_beg,
            dateDisplay: serviceHelper.normalizeTime(intervalDate.date_beg),
        }, {
            dateDropDownInput: intervalDate.date_end,
            dateDisplay: serviceHelper.normalizeTime(intervalDate.date_end)
        }];

        var fields = null;

        var oldData = segmentationFactory.getData(brandId);
        if (oldData != null) {
            for (var i = 0; i < $scope.chartTypes.length; i++)
                if ($scope.chartTypes[i].id == oldData.chartType.id) {
                    $scope.chartType = $scope.chartTypes[i];
                    break;
                }

            for (var i = 0; i < $scope.time_units.length; i++)
                if ($scope.time_units[i].name == oldData.time_unit.name) {
                    $scope.time_unit = $scope.time_units[i];
                    break;
                }

            $scope.event = oldData.event;

            for (var i = 0; i < $scope.event.compare_properties.length; i++)
                if ($scope.event.compare_properties[i].name == oldData.compareUnit.name) {
                    $scope.compareUnit = $scope.event.compare_properties[i];
                    break;
                }

            $scope.hideTypeChart = oldData.hideTypeChart;
            $scope.chartData = oldData.chartData;
            $scope.data = oldData.data;
            fields = oldData.fields;
        } else {
            $scope.time_unit = $scope.time_units[0];
            $scope.chartType = $scope.chartTypes[0];
            $scope.event = $scope.events[0];
            $scope.compareUnit = $scope.event.compare_properties[0];
        }

        function saveInfor() {
            segmentationFactory.setData({
                brand_id: brandId,
                chartType: $scope.chartType,
                time_unit: $scope.time_unit,
                hideTypeChart: $scope.hideTypeChart,
                chartData: $scope.chartData,
                data: $scope.data,
                fields: fields,
                compareUnit: $scope.compareUnit,
                event: $scope.event
            })
        }

        $scope.saveFilter = function() {
            buildQuery();
            fields.bookmark_name = 'user_age';

            bookmarkRemote.eventCreate(fields, function(data) {
                if (data.error == undefined) {
                    homeFactory.addEventBookmark(brandId, fields);
                }

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
                fields.compare_by = JSON.stringify(compareToObject);
                $scope.hideTypeChart = false;
            } else
                $scope.hideTypeChart = true;
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

                    saveInfor();
                }
            }, function() {});
        }

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

        $scope.updateEvent = function() {
            $scope.compareUnit = $scope.event.compare_properties[0];
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