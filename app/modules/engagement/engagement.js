angular.module('engagement')

.controller('SegmentationCtrl', ['$scope', 'remoteFactory', 'filterHelper',
    function($scope, remoteFactory, filterHelper) {
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

        $scope.getResult = function() {
            var query = filterHelper.buildQuery($scope.metas, $scope.events, $scope.metadata, $scope.event, $scope.subfilters);
            console.log(query);
        }

        $scope.chartData = [{}, {}, {}];

    }
])

.config(function($routeProvider) {
    var access = routingConfig.accessLevels;
    $routeProvider
        .when('/segmentation', {
            templateUrl: 'modules/engagement/segmentation/segmentation.html',
            controller: 'SegmentationCtrl',
            access: access.user
        })
});