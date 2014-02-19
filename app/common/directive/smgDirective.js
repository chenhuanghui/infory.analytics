angular.module('smgDirectives')
    .controller('FilterCtrl', ['$scope','remoteFactory', function ($scope,remoteFactory) {
        $scope.metas = remoteFactory.meta_property_types;                               
        $scope.events = remoteFactory.meta_events;
        
    }])
    .directive('smgFilter', function ($compile) {
        var queryCount = 2;
        return {
            restrict: "A",
            templateUrl: 'common/template/filter.html',
            scope: true,
            link: function(scope, element, attrs) {
                
            },
            controller: function($scope, $element) {
                $scope.addCondition = function() {
                    $actionGroup = $element.find(".action_group");
                    $queryGroup = $element.find(".query_builder");
                    
                    console.log($scope);

                    var action = $compile('<select class="action clearfix row_'+queryCount+'"> '
                                    + '<option>Và</option>'
                                    + '<option>Hoặc</option>'
                                + '</select>    ')($scope);


                    var query_row = $compile('<div class="query_record row_'+ queryCount +'">'
                                    + '<select class="qr_1" ng-model="property" ng-options="property as property.name_display for property in $scope.event.properties" ng-init="property=event.properties[0]"></select>'
                                    + '<select class="qr_2" ng-model="meta" ng-options="meta as meta for meta in metas[property.type].operators_display" ng-init="meta=metas[property.type].operators_display[0]"></select>'
                                    + '<select class="qr_3">'
                                    +        '<option>Nam</option>'
                                    +        '<option>Nữ</option>'
                                    +    '</select>'
                                    + '<span class="icon-remove right remove" ng-click="removeCondition($event)" data=.row_'+queryCount+'></span>'
                                    + '</div>')($scope);
                    $actionGroup.append(action);
                    $queryGroup.append(query_row);

                    queryCount++ ;
                }
                $scope.removeCondition = function($event) {
                    rowId = $($event.target).attr("data");
                    $element.find(rowId).remove();
                }
            }
        };

    })