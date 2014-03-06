angular.module('engagement')

.controller('SegmentationCtrl', ['$scope', '$routeParams', 'remoteFactory', 'filterHelper', 'eventRemote', 'chartHelper', 'compareHelper', 'serviceHelper',

    function($scope, $routeParams, remoteFactory, filterHelper, eventRemote, chartHelper, compareHelper, serviceHelper) {

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

.controller('FunnelCtrl', ['$scope', '$routeParams', 'dataFactory', 'remoteFactory', '$modal', 'filterHelper', 'funnelRemote', 'chartHelper', 'serviceHelper',
    function($scope, $routeParams, dataFactory, remoteFactory, $modal, filterHelper, funnelRemote, chartHelper, serviceHelper) {

        var brandId = $routeParams.brandId;
        $scope.metas = remoteFactory.meta_property_types;
        $scope.events = remoteFactory.meta_events;
        $scope.metadata = remoteFactory.meta_lists;
        $scope.subfilters = null;

        $scope.nameOfChainOfBehaviours = '';

        $scope.behaviours = [{
            id: 0,
            metas: $scope.metas,
            events: $scope.events,
            metadata: $scope.metadata,
            subfilters: null
        }];

        $scope.computeBys = [{
            name: 'turn',
            name_display: 'lượt'
        }, {
            name: 'customer',
            name_display: 'lượng khách hàng'
        }];

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

        $scope.data = [{
            dateDropDownInput: moment("2013-10-22T00:00:00.000").toDate(),
            dateDisplay: "22-10-2013",
        }, {
            dateDropDownInput: moment("2014-02-22T00:00:00.000").toDate(),
            dateDisplay: "22-02-2014",
        }];

        var fields = {
            brand_id: brandId,
            date_beg: $scope.data[0].dateDisplay,
            date_end: $scope.data[1].dateDisplay,
            by: 'turn',
            funnel: ''
        };

        $scope.updateCompareUnit = function() {
            var compareToObject = null;

            if ($scope.compareUnit.name_display != 'Chọn thuộc tính') {
                compareToObject = compareHelper.buildCompareToString($scope.compareUnit);
            }

            if (compareToObject != null)
                fields.compare_by = JSON.stringify(compareToObject);

            updateChart(fields);
        }

        $scope.data = [];
        $scope.updateComputeBy = function() {
            fields.by = $scope.computeBy.name;
            funnelRemote.get(fields, function(data) {

            }, function() {});
        };

        function updateChart(fields) {
            funnelRemote.get(fields, function(data) {
                var values = [];
                for (var i = 0; i < data.length; i++)
                    values.push(data[i].count);

                $scope.columnChart = chartHelper.buildLineChartForFunnel(values, columnNames);
            }, function() {});
        }

        var columnNames = [];

        $scope.funnel = function() {
            fields.funnel = [];
            columnNames = [];

            for (var i = 0; i < $scope.behaviours.length; i++) {

                var compareToObject = null;
                if ($scope.compareUnit.name_display != 'Chọn thuộc tính') {
                    compareToObject = compareHelper.buildCompareToString($scope.compareUnit);
                }

                if (compareToObject != null)
                    fields.compare_by = JSON.stringify(compareToObject);

                fields.funnel.push({
                    filter: filterHelper.buildQuery($scope.behaviours[i].subfilters),
                    event: $scope.behaviours[i].subfilters[0].event.name
                });

                columnNames.push($scope.behaviours[i].subfilters[0].event.name_display);
            }

            fields.funnel = JSON.stringify(fields.funnel);
            updateChart(fields);
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

        $scope.columnChart = {};

        /** modal **/
        $scope.open = function() {
            $scope.modalInstance = $modal.open({
                templateUrl: 'common/template/modal.html',
                controller: ModalInstanceCtrl,
                resolve: {
                    lineChart: function() {
                        return $scope.lineChart;
                    }
                }
            });
        };

        var ModalInstanceCtrl = function($scope, $modalInstance, lineChart) {
            $scope.lineChart = lineChart;
            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
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
            .when('/funnel/:brandId', {
                templateUrl: 'modules/engagement/funnel/funnel.html',
                controller: 'FunnelCtrl',
                access: access.user
            })
    });