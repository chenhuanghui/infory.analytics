angular.module('smgDirectives')
    .controller('FilterCtrl', ['$scope','remoteFactory', function ($scope,remoteFactory) {
        // $scope.metas = remoteFactory.meta_property_types;                               
        // $scope.events = remoteFactory.meta_events;
        
    }])
    .directive('smgFilter', function ($compile) {
        
        return {
            restrict: "A",
            templateUrl: 'common/template/filter.html',
            scope: {
                metas: "=",
                events: "="
            },
            link: function(scope, element, attrs) {
                
            }
        };

    })
    .directive('subfilter', function ($compile) {
        var qc = 1, _meta, _prop;
            
        return {
            restrict: 'A',
            templateUrl: 'common/template/subfilter.html',
            scope: {
                metas: "=",
                events: "=",
                event: "="

            },
            link: function (scope, element, attr) {
                scope.addCondition = function() {
                    $actionGroup = element.find(".action_group");
                    $queryGroup = element.find(".query_builder");
                    _prop = "property"+qc,
                    _meta = "meta"+qc;
                    scope.qc = qc;
                    var action = $compile('<select class="action clearfix row_'+ qc+'"> '
                                    + '<option>Và</option>'
                                    + '<option>Hoặc</option>'
                                + '</select>    ')(scope);
                    
                    var query_row = $compile('<div query-record events="events" metas="metas" event="event" class="row_'+qc+'" data=".row_'+qc+'"></div>')(scope);

                    $actionGroup.append(action);
                    $queryGroup.append(query_row);

                    qc++ ;
                }

                
            }
        };
    })
    .directive('queryRecord', [function () {

        return {
            restrict: 'A',
            scope: {
                metas: "=",
                events: "=",
                event: "="
            },
            templateUrl: 'common/template/query_record.html',
            link: function (scope, element, attr) {
                scope.removeCondition = function($event) {
                    rowId = $($event.target).parent().parent().attr("data");
                    element.parents().find(rowId).remove();
                }
            }
        };
    }])