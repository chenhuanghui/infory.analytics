angular.module('engagement')

	.controller('SegmentationCtrl', ['$scope', 'remoteFactory', function ($scope, remoteFactory) {
			$scope.metas = remoteFactory.meta_property_types; 								
			$scope.events = remoteFactory.meta_events;
			$scope.metadata = remoteFactory.meta_lists;

	}])
    

	.config(function($routeProvider){
		$routeProvider
			.when('/segmentation', {
				templateUrl: 'modules/engagement/segmentation/segmentation.html',
				controller: 'SegmentationCtrl'
			})
	});