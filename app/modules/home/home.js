angular.module('home')

.controller('HomeCtrl', ['$scope', '$http', '$location', '$routeParams', 'remoteFactory', 'dataFactory', 'Auth', 'brandRemote', 'chartHelper', 'serviceHelper', 'eventRemote', 'compareHelper', 'homeFactory',

    function($scope, $http, $location, $routeParams, remoteFactory, dataFactory, Auth, brandRemote, chartHelper, serviceHelper, eventRemote, compareHelper, homeFactory) {

        var events = remoteFactory.meta_events;
        var intervalDate = serviceHelper.getIntervalDate();

        $scope.brandId = $routeParams.brandId;
        if ($scope.brandId != null) {
            dataFactory.updateBrandSideBar($scope.brandId);
            dataFactory.getBrand($scope.brandId, function(data) {
                $scope.brand = data;
            }, function() {})
        }

        $scope.dataChart = [{}, {}, {}];

        var fields = [null, null, null, null];

        $scope.updateTimeUnit = function(time_unit, id) {
            fields[id].time_unit = time_unit.name;
            updateChart(fields[id], id);
        };

        $scope.updateEventBookmark = function(isNeedUpdateEvent) {
            if (isNeedUpdateEvent)
                updateEvent();

            if ($scope.eventBookmark == null)
                return;

            fields[3] = {
                brand_id: $scope.brandId,
                event: $scope.eventBookmark.event,
                filter: $scope.eventBookmark.filter,
                time_unit: $scope.time_unit_4.name
            };

            if ($scope.eventBookmark.compare_by != undefined) {
                var object = JSON.parse($scope.eventBookmark.compare_by);
                for (var o in object)
                    $scope.compareUnit = getCompareTo({
                        name: object[o].property
                    });
            }

            var compareToObject = null;
            if ($scope.compareUnit.name_display != 'Chọn thuộc tính') {
                compareToObject = compareHelper.buildCompareToString($scope.compareUnit);
            }

            if (compareToObject != null) {
                fields[3].compare_by = JSON.stringify(compareToObject);
            }

            updateChart(fields[3], 3);
        }

        $scope.updateHome = function(brandId) {
            $scope.brandId = brandId;
            brandRemote.getHome({
                    brand_id: brandId
                }, function(data) {

                    var oldData = homeFactory.getHomeData(brandId);
                    if (oldData == null) {
                        $scope.brandInfo = data;
                        $scope.time_unit_1 = $scope.time_units[0];
                        $scope.time_unit_2 = $scope.time_units[0];
                        $scope.time_unit_3 = $scope.time_units[0];
                        $scope.time_unit_4 = $scope.time_units[0];

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

                        dataFactory.getBookmarks(brandId, function(data) {
                                $scope.eventBookmarks = data.bookmarks.event_bookmarks;
                                if ($scope.eventBookmarks.length > 0) {
                                    $scope.eventBookmark = data.bookmarks.event_bookmarks[0];
                                    $scope.isHasBookmark = true;
                                } else {
                                    $scope.eventBookmark = null;
                                    $scope.isHasBookmark = false;
                                }

                                $scope.updateEventBookmark(true);

                            },
                            function() {});

                    } else {
                        fields = oldData.fields;
                        $scope.dataChart = oldData.data_chart;
                        $scope.eventBookmarks = oldData.event_bookmarks;
                        $scope.eventBookmark = oldData.event_bookmark;
                        $scope.data = oldData.data;

                        $scope.time_unit_1 = getTimeUnit(oldData.time_unit_1);
                        $scope.time_unit_2 = getTimeUnit(oldData.time_unit_2);
                        $scope.time_unit_3 = getTimeUnit(oldData.time_unit_3);
                        $scope.time_unit_4 = getTimeUnit(oldData.time_unit_4);

                        updateEvent();
                        if (oldData.compare_unit != null)
                            $scope.compareUnit = getCompareTo(oldData.compare_unit);

                        $scope.isHasBookmark = oldData.is_has_bookmark;
                    }

                },
                function() {});
        };

        function updateEvent() {
            if ($scope.eventBookmark == null)
                return;
            for (var i = 0; i < events.length; i++) {
                if (events[i].name == $scope.eventBookmark.event) {
                    $scope.event = events[i];
                    $scope.compareUnit = $scope.event.compare_properties[0];
                    break;
                }
            }
        }

        function getTimeUnit(old) {
            for (var i = 0; i < $scope.time_units.length; i++)
                if ($scope.time_units[i].name == old.name)
                    return $scope.time_units[i];
        }

        function getCompareTo(old) {
            for (var i = 0; i < $scope.event.compare_properties.length; i++)
                if ($scope.event.compare_properties[i].name == old.name)
                    return $scope.event.compare_properties[i];
        }

        function updateChart(field, id) {
            field.date_beg = $scope.data[id * 2].dateDisplay;
            field.date_end = $scope.data[id * 2 + 1].dateDisplay;
            switch (id) {
                case 0:
                    brandRemote.getCostChart(field, function(data) {
                        if (data.error == undefined)
                            $scope.dataChart[id] = chartHelper.buildLineChart(data, id + 1);
                    }, function() {});
                    break;
                case 1:
                    brandRemote.getDevelopmentChart(field, function(data) {
                        if (data.error == undefined)
                            $scope.dataChart[id] = chartHelper.buildLineChart(data, id + 1);
                    }, function() {});
                    break;
                case 2:
                    brandRemote.getCostChart(field, function(data) {
                        if (data.error == undefined)
                            $scope.dataChart[id] = chartHelper.buildLineChart(data, id + 1);
                    }, function() {});
                    break;
                case 3:
                    eventRemote.count(field, function(data) {
                        if (data.error == undefined) {
                            $scope.dataChart[id] = chartHelper.buildLineChart(data, field.event);
                        }
                    }, function() {});
                    break;
            }

            homeFactory.setHomeData({
                id: $scope.brandId,
                fields: fields,
                event_bookmarks: $scope.eventBookmarks,
                event_bookmark: $scope.eventBookmark,
                data_chart: $scope.dataChart,
                data: $scope.data,
                time_unit_1: $scope.time_unit_1,
                time_unit_2: $scope.time_unit_2,
                time_unit_3: $scope.time_unit_3,
                time_unit_4: $scope.time_unit_4,
                compare_unit: $scope.compareUnit,
                is_has_bookmark: $scope.isHasBookmark
            });
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
        }, {
            dateDropDownInput: intervalDate.date_beg,
            dateDisplay: serviceHelper.normalizeTime(intervalDate.date_beg),
        }, {
            dateDropDownInput: intervalDate.date_end,
            dateDisplay: serviceHelper.normalizeTime(intervalDate.date_end)
        }];

        $scope.onTimeSetOne = function(newDate, oldDate) {
            $scope.data[0].dateDisplay = serviceHelper.normalizeTime(newDate);
            if (fields[0] != null)
                updateChart(fields[0], 0);
        }

        $scope.onTimeSetTwo = function(newDate, oldDate) {
            $scope.data[1].dateDisplay = serviceHelper.normalizeTime(newDate);
            if (fields[0] != null)
                updateChart(fields[0], 0);
        }

        $scope.onTimeSetThree = function(newDate, oldDate) {
            $scope.data[2].dateDisplay = serviceHelper.normalizeTime(newDate);
            if (fields[1] != null)
                updateChart(fields[1], 1);
        }

        $scope.onTimeSetFour = function(newDate, oldDate) {
            $scope.data[3].dateDisplay = serviceHelper.normalizeTime(newDate);
            if (fields[1] != null)
                updateChart(fields[1], 1);
        }

        $scope.onTimeSetFive = function(newDate, oldDate) {
            $scope.data[4].dateDisplay = serviceHelper.normalizeTime(newDate);
            if (fields[2] != null)
                updateChart(fields[2], 2);
        }

        $scope.onTimeSetSix = function(newDate, oldDate) {
            $scope.data[5].dateDisplay = serviceHelper.normalizeTime(newDate);
            if (fields[2] != null) {
                updateChart(fields[2], 2);
            }
        }

        $scope.onTimeSetSeven = function(newDate, oldDate) {
            $scope.data[6].dateDisplay = serviceHelper.normalizeTime(newDate);
            if (fields[3] != null)
                updateChart(fields[3], 3);
        }

        $scope.onTimeSetEight = function(newDate, oldDate) {
            $scope.data[7].dateDisplay = serviceHelper.normalizeTime(newDate);
            if (fields[3] != null)
                updateChart(fields[3], 3);
        }

    }
])