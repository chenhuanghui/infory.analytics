angular.module('engagement')
    .controller('FunnelStep2Ctrl', ['$scope', '$routeParams', '$location', 'dataFactory', 'remoteFactory', '$modal', 'filterHelper', 'funnelRemote', 'chartHelper', 'serviceHelper', 'funnelFactory', 'bookmarkRemote',
        function($scope, $routeParams, $location, dataFactory, remoteFactory, $modal, filterHelper, funnelRemote, chartHelper, serviceHelper, funnelFactory, bookmarkRemote) {

            var brandId = $routeParams.brandId;
            dataFactory.updateBrandSideBar(brandId);

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

            var oldData = funnelFactory.getData(0, brandId);

            if (oldData == null) {
                $location.path('/funnel/step1/' + brandId);
                return;
            }

            updateChart(oldData.fields);

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
        }
    ])