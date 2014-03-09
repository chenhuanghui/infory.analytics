angular.module('engagement')
    .controller('FunnelCtrl', ['$scope', '$routeParams', '$location', 'dataFactory', 'remoteFactory', '$modal', 'filterHelper', 'funnelRemote', 'chartHelper', 'serviceHelper', 'funnelFactory', 'bookmarkRemote',
        function($scope, $routeParams, $location, dataFactory, remoteFactory, $modal, filterHelper, funnelRemote, chartHelper, serviceHelper, funnelFactory, bookmarkRemote) {

            var brandId = $routeParams.brandId;
            var path = $location.path().substring(0, 14);

            var intervalDate = serviceHelper.getIntervalDate();
            $scope.data = [{
                dateDropDownInput: intervalDate.date_beg,
                dateDisplay: serviceHelper.normalizeTime(intervalDate.date_beg),
            }, {
                dateDropDownInput: intervalDate.date_end,
                dateDisplay: serviceHelper.normalizeTime(intervalDate.date_end)
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