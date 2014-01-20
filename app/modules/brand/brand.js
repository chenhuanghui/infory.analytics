angular.module('brand',[
		'ngRoute'
	])
	
	.controller('BrandCtrl', ['$scope', function ($scope) {
		$scope.msg = "brand view";
	}])
    .controller('brandCreateCtrl', ['$scope', function ($scope) {
		$scope.msg = "brand view";
	}])

	.config(function($routeProvider){
		$routeProvider
			.when('/brand', {
				templateUrl: 'modules/brand/index.html',
				controller: 'BrandCtrl'
			})
            .when('/brand/new', {
                templateUrl: 'modules/brand/brand_new.html',
                controller: 'brandCreateCtrl'
            })
	});