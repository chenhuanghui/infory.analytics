angular.module('brand')

	.controller('BrandCtrl', ['$scope', 'remoteFactory', function ($scope, remoteFactory) {
		$scope.msg = "brand view";
		// test();
		// function test() {
			
		// 	var request = remoteFactory.api('/getMetaEvent', 'GET', {}, function(data){
		// 		console.log(data);
		// 	}, function(error){
		// 		console.log(error);
		// 	});
		// }

	}])
    

	.config(function($routeProvider){
		$routeProvider
			.when('/brand', {
				templateUrl: 'modules/brand/brand/brand.html',
				controller: 'BrandCtrl'
			})
			.when('/brand/new', {
                templateUrl: 'modules/brand/brand_new.html',
                controller: 'brandCreateCtrl'
            })
            .when('/brand/promotion-new', {
                templateUrl: 'modules/brand/promotion_new.html'
            })
            .when('/brand/promotion', {
				templateUrl: 'modules/brand/promotion/promotion_list.html',
				controller: 'BrandCtrl'
			})

            .when('/brand/comment', {
				templateUrl: 'modules/brand/comment/comment.html',
				controller: 'BrandCtrl'
			})

			.when('/brand/new', {
			    templateUrl: 'modules/brand/brand_new.html',
			    controller: 'BrandCtrl'
			})
	});