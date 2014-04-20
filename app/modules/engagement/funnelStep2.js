angular.module('engagement')
    .controller('FunnelStep2Ctrl', ['$scope', '$routeParams', '$location', 'dataFactory', 'remoteFactory', '$modal', 'filterHelper', 'funnelRemote', 'chartHelper', 'serviceHelper', 'funnelFactory', 'bookmarkRemote', 'brandRemote', 'dialogHelper',
        function($scope, $routeParams, $location, dataFactory, remoteFactory, $modal, filterHelper, funnelRemote, chartHelper, serviceHelper, funnelFactory, bookmarkRemote, brandRemote, dialogHelper) {

            /** Global variables **/
            var brandId = $routeParams.brandId,
                intervalDate = serviceHelper.getIntervalDate(),
                step1Data = funnelFactory.getData(0, brandId),
                step2Data = funnelFactory.getData(1, brandId),
                fields = null,
                valueSuffix = 'lượt',
                unit = 'Số lượt',
                pros = {
                    id: brandId,
                    fields: '["funnel_bookmarks"]'
                },
                columnNames = [];


            /** Scope variables **/
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

            $scope.computeBys = [{
                name: 'turn',
                name_display: 'lượt'
            }, {
                name: 'customer',
                name_display: 'lượng khách hàng'
            }],
            $scope.computeBy = $scope.computeBys[0];

            $scope.columnChart = {};
            $scope.hideLoading = false;

            /** Logic **/
            dataFactory.updateBrandSideBar(brandId);

            if (step1Data == null) {
                if (step2Data != null) {

                }
            } else {
                fields = step1Data.fields;
                updateChart(fields);
            }

            brandRemote.get(pros, function(data) {
                if (data.error == undefined) {
                    data.funnel_bookmarks.unshift({
                        bookmark_name: 'Chọn các hành vi đã lưu',
                        id: -1
                    });

                    $scope.funnelBookmarks = data.funnel_bookmarks;
                    $scope.funnelBookmark = data.funnel_bookmarks[0];

                    if (step1Data == null && $scope.funnelBookmarks.length >= 2) {
                        $scope.funnelBookmark = data.funnel_bookmarks[1];
                        $scope.changeFunnelBookmark($scope.funnelBookmark.id);
                    } else {
                        $scope.hideLoading = true;
                    }
                } else
                    dialogHelper.showError(data.error.message);
            }, function() {})

            $scope.changeFunnelBookmark = function(id) {
                $('.z-dropdown').removeClass('open');
                for (var i = 1; i < $scope.funnelBookmarks.length; i++) {
                    if ($scope.funnelBookmarks[i].id == id) {
                        $scope.funnelBookmark = $scope.funnelBookmarks[i];
                        fields = {
                            brand_id: brandId,
                            date_beg: $scope.data[0].dateDisplay,
                            date_end: $scope.data[1].dateDisplay,
                            by: $scope.computeBy.name,
                            funnel: $scope.funnelBookmark.funnel
                        };
                        updateChart(fields);
                        return;
                    }
                }
            }

            $scope.updateCompareUnit = function() {
                var compareToObject = null;

                if ($scope.compareUnit.name_display != 'chọn thuộc tính') {
                    compareToObject = compareHelper.buildCompareToString($scope.compareUnit);
                }

                if (compareToObject != null)
                    fields.compare_by = JSON.stringify(compareToObject);

                updateChart(fields);
            }

            $scope.updateComputeBy = function() {
                fields.by = $scope.computeBy.name;
                if ($scope.computeBy.name == 'turn') {
                    valueSuffix = 'lượt';
                    unit = 'Số lượt';
                } else {
                    valueSuffix = 'người dùng';
                    unit = 'Số lượng người dùng';
                }
                updateChart(fields);
            };

            function updateChart(fields) {
                $scope.hideLoading = false;


                funnelRemote.get(fields, function(data) {
                    $scope.hideLoading = true;
                    if (data.error == undefined) {
                        var values = [];
                        for (var i = 0; i < data.length; i++)
                            values.push(data[i].count);

                        columnNames = [];
                        var filters = JSON.parse(fields.funnel);

                        for (var i = 0; i < filters.length; i++) {
                            columnNames.push(getEventNameDisplay(filters[i].event));
                        }

                        $scope.columnChart = chartHelper.buildLineChartForFunnel(values, columnNames, valueSuffix, unit);
                    } else
                        dialogHelper.showError(data.error.message);
                }, function() {});
            }


            $scope.goToStep1 = function() {
                $location.path('/funnel/step1/' + brandId);
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


            function getEventNameDisplay(name) {
                for (var i = 0; i < $scope.events.length; i++) {
                    if ($scope.events[i].name == name)
                        return $scope.events[i].name_display;
                }
            }
        }
    ])