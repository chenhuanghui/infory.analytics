angular.module('engagement')

	.controller('SegmentationCtrl', ['$scope',function ($scope) {
			
	}])
    

	.config(function($routeProvider){
		$routeProvider
			.when('/segmentation', {
				templateUrl: 'modules/engagement/segmentation/segmentation.html',
				controller: 'SegmentationCtrl'
			})
	});