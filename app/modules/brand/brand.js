angular.module('brand')

	.controller('BrandCtrl', ['$scope', 'remoteFactory', function ($scope, remoteFactory) {
		$scope.msg = "brand view";
		test();
		function test() {
			console.log(remoteFactory.getInfo());
		}

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