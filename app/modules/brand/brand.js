angular.module('brand',[
		'ngRoute'
	])
	
	.controller('BrandCtrl', ['$scope', function ($scope) {
		$scope.msg = "brand view";
	}])

	.config(function($routeProvider){
		$routeProvider
			.when('/brand', {
				templateUrl: 'brand/brand-list.html',
				controller: 'BrandCtrl'
			})
	});