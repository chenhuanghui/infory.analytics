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
            var query = filterHelper.buildQuery($scope.subfilters);
            fields = {
                bookmark_name: 'user_platform',
                brand_id: brandId,
                event: $scope.event.name,
                filter: JSON.stringify(query),
                time_unit: $scope.time_unit.name
            };

            var compareToObject = null;
            if ($scope.compareUnit.name_display != 'Chọn thuộc tính') {
                compareToObject = compareHelper.buildCompareToString($scope.compareUnit);
            }

            if (compareToObject != null) {
                fields.compare_by = JSON.stringify(compareToObject);
            }

            bookmarkRemote.eventCreate(fields, function(data) {
                console.log(data)
            }, function() {});
        }

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

.controller('FunnelCtrl', ['$scope', '$routeParams', '$location', 'dataFactory', 'remoteFactory', '$modal', 'filterHelper', 'funnelRemote', 'chartHelper', 'serviceHelper', 'funnelFactory', 'bookmarkRemote',
    function($scope, $routeParams, $location, dataFactory, remoteFactory, $modal, filterHelper, funnelRemote, chartHelper, serviceHelper, funnelFactory, bookmarkRemote) {

        var brandId = $routeParams.brandId;
        var path = $location.path().substring(0, 14);

        $scope.data = [{
            dateDropDownInput: moment("2013-10-22T00:00:00.000").toDate(),
            dateDisplay: "22-10-2013",
        }, {
            dateDropDownInput: moment("2014-02-22T00:00:00.000").toDate(),
            dateDisplay: "22-02-2014",
        }];

        $scope.metas = remoteFactory.meta_property_types;
        $scope.events = remoteFactory.meta_events;
        $scope.metadata = remoteFactory.meta_lists;

        switch (path) {
            case '/funnel/step1/':
                funnelFactory.setDataStep1(null);
                $scope.subfilters = null;

                $scope.nameOfChainOfBehaviours = '';
                $scope.behaviours = [{
                    id: 0,
                    metas: $scope.metas,
                    events: $scope.events,
                    metadata: $scope.metadata,
                    subfilters: null
                }];

                var fields = {
                    brand_id: brandId,
                    date_beg: $scope.data[0].dateDisplay,
                    date_end: $scope.data[1].dateDisplay,
                    by: 'turn',
                    funnel: ''
                };

                $scope.validation = true;
                $scope.updateValidate = function() {
                    if ($scope.nameOfChainOfBehaviours == undefined || $scope.nameOfChainOfBehaviours == '')
                        $scope.validation = true;
                    else
                        $scope.validation = false;

                }

                $scope.addBehaviour = function() {
                    var tempBehaviour = {
                        id: 0,
                        metas: $scope.metas,
                        events: $scope.events,
                        metadata: $scope.metadata,
                        subfilters: null
                    };

                    tempBehaviour.id = $scope.behaviours.length;
                    $scope.behaviours.push(tempBehaviour);
                }

                $scope.bookmark = function() {

                    var fields = {
                        bookmark_name: $scope.nameOfChainOfBehaviours,
                        brand_id: brandId,
                        time_unit: 'day',
                        funnel: []
                    }

                    for (var i = 0; i < $scope.behaviours.length; i++) {
                        fields.funnel.push({
                            filter: filterHelper.buildQuery($scope.behaviours[i].subfilters),
                            event: $scope.behaviours[i].subfilters[0].event.name
                        });
                    }

                    fields.funnel = JSON.stringify(fields.funnel);

                    bookmarkRemote.funnelCreate(fields, function(data) {
                        console.log(data);
                    }, function() {});
                }

                $scope.funnel = function() {
                    $location.path('/funnel/step2/' + brandId);
                    fields.funnel = [];
                    columnNames = [];

                    for (var i = 0; i < $scope.behaviours.length; i++) {
                        fields.funnel.push({
                            filter: filterHelper.buildQuery($scope.behaviours[i].subfilters),
                            event: $scope.behaviours[i].subfilters[0].event.name
                        });

                        columnNames.push($scope.behaviours[i].subfilters[0].event.name_display);
                    }

                    fields.funnel = JSON.stringify(fields.funnel);
                    funnelFactory.setDataStep1(fields);
                    $location.path('/funnel/step2/' + brandId);

                }
                break;

            case '/funnel/step2/':
                var fields = funnelFactory.getDataStep1();

                if (fields == null) {
                    $location.path('/funnel/step1/' + brandId);
                    return;
                }

                updateChart(fields);

                $scope.computeBys = [{
                    name: 'turn',
                    name_display: 'lượt'
                }, {
                    name: 'customer',
                    name_display: 'lượng khách hàng'
                }];

                $scope.updateCompareUnit = function() {
                    var compareToObject = null;

                    if ($scope.compareUnit.name_display != 'Chọn thuộc tính') {
                        compareToObject = compareHelper.buildCompareToString($scope.compareUnit);
                    }

                    if (compareToObject != null)
                        fields.compare_by = JSON.stringify(compareToObject);

                    updateChart(fields);
                }

                $scope.updateComputeBy = function() {
                    fields.by = $scope.computeBy.name;
                    updateChart(fields);
                };

                function updateChart(fields) {
                    funnelFactory.setDataStep1(fields);

                    funnelRemote.get(fields, function(data) {
                        var values = [];
                        for (var i = 0; i < data.length; i++)
                            values.push(data[i].count);

                        $scope.columnChart = chartHelper.buildLineChartForFunnel(values, columnNames);
                    }, function() {});
                }

                var columnNames = [];

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

                $scope.columnChart = {};
                break;
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
            .when('/funnel/step1/:brandId', {
                templateUrl: 'modules/engagement/funnel/funnel_step_1.html',
                controller: 'FunnelCtrl',
                access: access.user
            })
            .when('/funnel/step2/:brandId', {
                templateUrl: 'modules/engagement/funnel/funnel_step_2.html',
                controller: 'FunnelCtrl',
                access: access.user
            })
    });