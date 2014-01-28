angular.module('promotion')
	
	.controller('promotionCtrl', ['$scope', function ($scope) {
		$scope.activeTab = "user";
	}])

	.config(function($routeProvider){
		$routeProvider
			.when('/promotion/new', {
				templateUrl: 'modules/promotion/promotion_new.html',
				controller: 'promotionCtrl'
			})
			
	});