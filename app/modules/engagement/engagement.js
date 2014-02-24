angular.module('engagement')

.controller('SegmentationCtrl', ['$scope', 'remoteFactory',
    function($scope, remoteFactory) {
        $scope.metas = remoteFactory.meta_property_types;
        $scope.events = remoteFactory.meta_events;
        $scope.metadata = remoteFactory.meta_lists;

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