angular.module('engagement')

	.controller('SegmentationCtrl', ['$scope', 'remoteFactory', function ($scope, remoteFactory) {
		

	}])
    

	.config(function($routeProvider){
		$routeProvider
			.when('/segmentation', {
				templateUrl: 'modules/engagement/segmentation/segmentation.html',
				controller: 'SegmentationCtrl'
			})
	});