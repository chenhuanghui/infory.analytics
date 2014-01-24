angular.module('account')
	.controller('signInCtrl', ['$scope', function ($scope) {
		$scope.activeTab = "account";
	}])

	.config(function($routeProvider){
		$routeProvider
			.when('/signin', {
				templateUrl: 'modules/account/signin.html',
				controller: 'signInCtrl'
			})
	});