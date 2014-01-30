angular.module('promotion')
	
	.controller('promotionCtrl', ['$scope', function ($scope) {
		$scope.activeTab = "user";
		$scope.promotionTypes= [{
		    value: '1',
		    label: 'Giảm giá trực tiếp (voucher)'
		  }, {
		    value: '2',
		    label: 'Tích luỹ điểm'
		}];  
		$scope.promotionList = [
			{
				name:"Chến dịch tết",
				logo: "img/contact-img.png",
				type: "Tích luỹ điểm",
				viewed: 500,
				used: 20,
				status: "Dang chay",
				created: "09/05/2014"
			},
			{
				name:"Chến dịch hè",
				logo: "img/contact-img.png",
				type: "Tích luỹ điểm",
				viewed: 200,
				used: 100,
				status: "Tam dung",
				created: "27/04/2014"
			},
		];
	}])

	.config(function($routeProvider){
		$routeProvider
			.when('/promotion', {
				templateUrl: 'modules/promotion/promotion_list.html',
				controller: 'promotionCtrl'
			})
			.when('/promotion/new', {
				templateUrl: 'modules/promotion/promotion_new.html',
				controller: 'promotionCtrl'
			})
			
	});