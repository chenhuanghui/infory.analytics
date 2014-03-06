angular.module('smgDirectives', ['ui.date'])
    .directive('smgFilter', function($compile) {

        return {
            restrict: "A",
            templateUrl: 'common/template/filter.html',
            scope: {
                subfilters: "=",
                metas: "=",
                events: "=",
                metadata: "=",
                event: "="
            },
            controller: function($scope) {
                $scope.subfilters = [];
                var num = 0;

                this.addFilter = function(scope) {
                    $scope.subfilters.push(scope);
                }

                this.removeFilter = function(id) {
                    for (var i = $scope.subfilters.length - 1; i >= 0; i--) {
                        if ($scope.subfilters[i].getValue().id == id) {
                            $scope.subfilters.splice(i, 1);
                            return;
                        }
                    }
                }
            }
        };

    })
    .directive('subfilter', function($compile) {
        var qc = 1,
            _meta, _prop
            _operator = "AND";

        return {
            restrict: 'A',
            templateUrl: 'common/template/subfilter.html',
            scope: {
                metas: "=",
                events: "=",
                event: "=",
                metadata: "="

            },
            link: function(scope, element, attr, ctrl) {
                scope.addCondition = function() {
                    $actionGroup = element.find(".action_group");
                    $queryGroup = element.find(".query_builder");

                    _prop = "property" + qc,
                    _meta = "meta" + qc;

                    scope.qc = qc;
                    scope.operator = _operator;

                    var action_op = $compile('<select ng-model="operator" class="action clearfix row_' + qc + '"> ' + '<option>AND</option>' + '<option>OR</option>' + '</select>    ')(scope);

                    // $compile('<div class="btn-group pull-right action clearfix row_'+qc+'"><button class="glow left active">AND </button><button class="glow right">OR</button></div>')(scope);

                    var action_nor = $compile('<span class="btn-flat white action action_child clearfix  row_' + qc + '">{{operator}}</span>')(scope);

                    var query_row = $compile('<div query-record operator="operator" id="' + qc + '" events="events" metas="metas" event="event" metadata="metadata" class="row_' + qc + '" data=".row_' + qc + '"></div>')(scope);

                    if (element.find(".action").length > 0) {
                        $actionGroup.append(action_nor);
                    } else {
                        $actionGroup.append(action_op);
                    }
                    $queryGroup.append(query_row);

                    scope.$watch('operator', function(newOperator, oldOperator) {
                        _operator = newOperator;
                        element.find('.action_child').text(newOperator);
                    });

                    qc++;
                }
            }
        };
    })
    .directive('queryRecord', ['serviceHelper',

        function(serviceHelper) {
            return {
                require: '^smgFilter',
                restrict: 'A',
                scope: {
                    operator: "=",
                    metas: "=",
                    events: "=",
                    event: "=",
                    metadata: "=",
                    id: "@"
                },
                templateUrl: 'common/template/query_record.html',
                link: function(scope, element, attr, ctrl) {
                    scope.data = [{
                        dateDropDownInput: moment("2013-01-22T00:00:00.000").toDate(),
                        dateDisplay: "22-01-2013",
                    }, {
                        dateDropDownInput: moment("2013-01-22T00:00:00.000").toDate(),
                        dateDisplay: "22-01-2013",
                    }];

                    scope.paremeters = {
                        firstInput: '',
                        secondInput: ''
                    }

                    scope.$watch('event', function() {
                        scope.property = scope.event.properties[0];
                    });

                    scope.updateFields = function() {
                        scope.meta = scope.metas[scope.property.type].operators_display[0];
                        if (scope.metas[scope.property.type].operators_ui_controller[scope.metas[scope.property.type].operators_display.indexOf(scope.meta)] == 'dropdown')
                            scope.paremeters.firstInput = scope.metadata[scope.property.available_values][0];
                    }

                    scope.onTimeSetOne = function(newDate, oldDate) {
                        scope.paremeters.firstInput = '';
                        scope.data[0].dateDisplay = serviceHelper.normalizeTime(newDate);
                    }

                    scope.onTimeSetTwo = function(newDate, oldDate) {
                        scope.paremeters.secondInput = '';
                        scope.data[1].dateDisplay = serviceHelper.normalizeTime(newDate);
                    }

                    scope.removeCondition = function($event) {
                        rowId = $($event.target).parent().parent().attr("data");
                        element.parents().find(rowId).remove();

                        ctrl.removeFilter(scope.id);
                    }

                    scope.getValue = function() {
                        switch (scope.metas[scope.property.type].operators_ui_controller[scope.metas[scope.property.type].operators_display.indexOf(scope.meta)]) {
                            case 'date picker':
                                scope.paremeters.firstInput = scope.data[0].dateDropDownInput;
                                scope.paremeters.secondInput = '';
                                break;
                            case 'two date picker':
                                scope.paremeters.firstInput = scope.data[0].dateDropDownInput;
                                scope.paremeters.secondInput = scope.data[1].dateDropDownInput;
                                break;
                        }

                        return {
                            id: scope.id,
                            property: scope.property,
                            meta: scope.meta,
                            paremeters: scope.paremeters,
                            operator: scope.operator,
                            event: event.name
                        };
                    }
                    ctrl.addFilter(scope);
                }
            };
        }
    ])