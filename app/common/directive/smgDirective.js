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
        var qc = 2,
            _prop = "property"+qc,
            _meta = "meta"+qc;
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
                    
                    var action = $compile('<select class="action clearfix row_'+ qc+'"> '
                                    + '<option>Và</option>'
                                    + '<option>Hoặc</option>'
                                + '</select>    ')(scope);


                    var query_row = $compile('<div class="query_record row_'+ qc +'">'
                                    + '<select class="qr_1" ng-model="'+_prop+'" ng-options="property as property.name_display for property in event.properties" ng-init="property=event.properties[0]"></select>'
                                    + '<select class="qr_2" ng-model="'+_meta+'" ng-options="meta as meta for meta in metas['+_prop+'.type].operators_display" ng-init="meta=metas[property.type].operators_display[0]"></select>'
                                    + '<select class="qr_3">'
                                    +        '<option>Nam</option>'
                                    +        '<option>Nữ</option>'
                                    +    '</select>'
                                    + '<span class="icon-remove right remove" ng-click="removeCondition($event)" data=.row_'+qc+'></span>'
                                    + '</div>')(scope);
                    $actionGroup.append(action);
                    $queryGroup.append(query_row);

                    qc++ ;
                }

                scope.removeCondition = function($event) {
                    rowId = $($event.target).attr("data");
                    element.find(rowId).remove();
                }
            }
        };
    })