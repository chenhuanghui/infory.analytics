angular.module('smgDirectives', ['ui.date'])
    .controller('FilterCtrl', ['$scope', 'remoteFactory',
        function($scope, remoteFactory) {
            // $scope.metas = remoteFactory.meta_property_types;                               
            // $scope.events = remoteFactory.meta_events;

        }
    ])
    .directive('smgFilter', function($compile) {

        return {
            restrict: "A",
            templateUrl: 'common/template/filter.html',
            scope: {
                metas: "=",
                events: "=",
                metadata: "="
            },
            link: function(scope, element, attrs) {

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
            link: function(scope, element, attr) {
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

                    var query_row = $compile('<div query-record events="events" metas="metas" event="event" metadata="metadata" class="row_' + qc + '" data=".row_' + qc + '"></div>')(scope);

                    if (element.find(".action").length > 0) {
                        $actionGroup.append(action_nor);
                    } else {
                        $actionGroup.append(action_op);
                    }
                    $queryGroup.append(query_row);

                    scope.$watch('operator', function(newOperator, oldOperator) {
                        _operator = newOperator;
                        element.find('.action_child').text(newOperator);
                    })
                    qc++;
                }
            }
        };
    })
    .directive('queryRecord', [

        function() {

            return {
                restrict: 'A',
                scope: {
                    metas: "=",
                    events: "=",
                    event: "=",
                    metadata: "="
                },
                templateUrl: 'common/template/query_record.html',
                link: function(scope, element, attr) {
                    scope.data = {
                        dateDropDownInput: moment("2013-01-22T00:00:00.000").toDate()
                    };

                    scope.onTimeSet = function(newDate, oldDate) {
                        console.log(newDate);
                        console.log(oldDate);
                    }

                    scope.removeCondition = function($event) {
                        rowId = $($event.target).parent().parent().attr("data");
                        element.parents().find(rowId).remove();
                        console.log(scope.property + "--" + scope.meta + "--" + scope.usrvalue);
                    }
                    scope.getValue = function() {
                        console.log(scope.property);
                    }
                }
            };
        }
    ])