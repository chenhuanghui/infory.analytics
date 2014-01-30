angular.module('promotion')
	
	.controller('promotionCtrl', ['$scope', function ($scope) {
		$scope.activeTab = "user";
		$scope.promotions = [{
		    value: '1',
		    label: 'Giảm giá trực tiếp (voucher)'
		  }, {
		    value: '2',
		    label: 'Tích luỹ điểm'
		  }];  
	}])

	.config(function($routeProvider){
		$routeProvider
			.when('/promotion/new', {
				templateUrl: 'modules/promotion/promotion_new.html',
				controller: 'promotionCtrl'
			})
			
	});