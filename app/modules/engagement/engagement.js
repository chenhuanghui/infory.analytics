angular.module('engagement')

.controller('SegmentationCtrl', ['$scope', '$routeParams', '$location', 'remoteFactory', 'filterHelper', 'eventRemote', 'chartHelper', 'compareHelper', 'serviceHelper', 'bookmarkRemote', 'homeFactory', 'segmentationFactory', 'dataFactory', 'queryHelper',

    function($scope, $routeParams, $location, remoteFactory, filterHelper, eventRemote, chartHelper, compareHelper, serviceHelper, bookmarkRemote, homeFactory, segmentationFactory, dataFactory, queryHelper) {

        var brandId = $routeParams.brandId;
        dataFactory.updateBrandSideBar(brandId);

        $scope.metas = remoteFactory.meta_property_types;
        $scope.events = remoteFactory.meta_events;
        $scope.metadata = remoteFactory.meta_lists;
        $scope.subfilters = [];
        $scope.oldsubfilters = [];

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

            $scope.time_unit = getTimeUnit(oldData.time_unit.name);
            $scope.compareUnit = getCompareTo(oldData.compareUnit);

            $scope.hideTypeChart = oldData.hideTypeChart;
            $scope.chartData = oldData.chartData;
            $scope.data = oldData.data;

            //$scope.oldsubfilters = oldData.oldsubfilters;

            fields = oldData.fields;

            $scope.eventBookmark = oldData.eventBookmark;
            $scope.oldsubfilters = queryHelper.decode($scope.eventBookmark);
            $scope.eventBookmarks = oldData.eventBookmarks;
            $scope.isHasBookmark = oldData.isHasBookmark;

        } else {
            $scope.time_unit = $scope.time_units[0];
            $scope.chartType = $scope.chartTypes[0];
            $scope.event = $scope.events[0];
            $scope.compareUnit = $scope.event.compare_properties[0];

            dataFactory.getBookmarks(brandId, function(data) {
                    data.bookmarks.event_bookmarks.unshift({
                        bookmark_name: 'Chọn bộ lọc đã lưu',
                        id: -1
                    });

                    $scope.eventBookmarks = data.bookmarks.event_bookmarks;
                    $scope.eventBookmark = data.bookmarks.event_bookmarks[0];

                    saveInfor();

                },
                function() {});
        }

        $scope.changeEventBookmark = function(id) {
            for (var i = 0; i < $scope.eventBookmarks.length; i++) {
                if ($scope.eventBookmarks[i].id == id) {

                    $scope.eventBookmark = $scope.eventBookmarks[i];

                    for (var j = 0; j < $scope.events.length; j++) {
                        if ($scope.events[i] == $scope.eventBookmark.event) {
                            $scope.event = $scope.events[i];
                            break;
                        }
                    }

                    if ($scope.eventBookmark.compare_by != undefined) {
                        var object = JSON.parse($scope.eventBookmark.compare_by);
                        for (var o in object)
                            $scope.compareUnit = getCompareTo({
                                name: object[o].property,

                            });
                    }

                    $scope.time_unit = getTimeUnit($scope.eventBookmark.time_unit);
                    $scope.oldsubfilters = queryHelper.decode($scope.eventBookmark);

                    saveInfor();
                    return;
                }
            }
        }

        function getTimeUnit(old) {
            for (var i = 0; i < $scope.time_units.length; i++)
                if ($scope.time_units[i].name == old)
                    return $scope.time_units[i];
        }

        function getCompareTo(old) {
            for (var i = 0; i < $scope.event.compare_properties.length; i++)
                if ($scope.event.compare_properties[i].name == old.name)
                    return $scope.event.compare_properties[i];
        }

        function saveInfor() {
            var saveSubfilters = [];
            var size = $scope.subfilters.length;

            for (var i = 0; i < size; i++) {
                saveSubfilters.push($scope.subfilters[i].getValue());
            }

            segmentationFactory.setData({
                brand_id: brandId,
                chartType: $scope.chartType,
                time_unit: $scope.time_unit,
                hideTypeChart: $scope.hideTypeChart,
                chartData: $scope.chartData,
                data: $scope.data,
                fields: fields,
                compareUnit: $scope.compareUnit,
                event: $scope.event,
                oldsubfilters: saveSubfilters,
                eventBookmark: $scope.eventBookmark,
                eventBookmarks: $scope.eventBookmarks,
                isHasBookmark: $scope.isHasBookmark,
                time_unit: $scope.time_unit,
                compareUnit: $scope.compareUnit
            })
        }

        $scope.updateDateEvent = function() {
            var id = $scope.eventBookmark.id;
            if (id != -1) {
                buildQuery();
                var pare = {
                    bookmark_id: id,
                    bookmark_name: $scope.eventBookmark.bookmark_name,
                    event: fields.event,
                    filter: fields.filter,
                    time_unit: fields.time_unit
                };

                if (fields.compare_by != undefined)
                    pare.compare_by = fields.compare_by;

                bookmarkRemote.eventUpdate(pare, function(data) {
                    saveInfor();
                }, function() {});
            }

        }

        $scope.createEvent = function(name) {
            if (name == '')
                return;

            buildQuery();
            fields.bookmark_name = name;
            homeFactory.addEventBookmark(brandId, fields);

            // bookmarkRemote.eventCreate(fields, function(data) {
            //     if (data.error == undefined) {
            //         homeFactory.addEventBookmark(brandId, fields);
            //     }

            // }, function() {});
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