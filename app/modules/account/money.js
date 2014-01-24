angular.module('account')
	
	.controller('moneyCtrl', ['$scope', function ($scope) {
		$scope.activeTab = "money";
	}])

	.config(function($routeProvider){
		$routeProvider
			.when('/money', {
				templateUrl: 'modules/account/money.html',
				controller: 'moneyCtrl'
			})
	});