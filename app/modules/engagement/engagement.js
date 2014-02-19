angular.module('engagement')

	.controller('SegmentationCtrl', ['$scope', 'remoteFactory', function ($scope, remoteFactory) {
			$scope.eventModel = {name: "view",
								name_display: "chọn thuộc tính"};
			$scope.metas = remoteFactory.meta_property_types; 								
			$scope.events = remoteFactory.meta_events;
			
			

			$scope.select_event = function (event) {
				console.log(event.name_display);
				$scope.eventModel = event;
			}

			$scope.select_property = function (property) {
				console.log(property.type);
				$scope.meta = $scope.metas[property.type];
				console.log($scope.meta);
			}

			$scope.select_meta = function (meta) {
				console.log(meta);
			}
	}])
    

	.config(function($routeProvider){
		$routeProvider
			.when('/segmentation', {
				templateUrl: 'modules/engagement/segmentation/segmentation.html',
				controller: 'SegmentationCtrl'
			})
	});