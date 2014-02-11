angular.module('account')
	.controller('accountCtrl', ['$scope', function ($scope) {
		$scope.activeTab = "inbox";
		$scope.activeTab = "personal";

		$scope.cancel = function (){
			window.history.back();
		};
	}])

	.config(function($routeProvider){
		$routeProvider
			.when('/inbox', {
				templateUrl: 'modules/account/inbox.html',
				controller: 'accountCtrl'
			})
			.when('/money', {
				templateUrl: 'modules/account/money.html',
				controller: 'accountCtrl'
			})
			.when('/personal', {
				templateUrl: 'modules/account/personal.html',
				controller: 'accountCtrl'
			})
	});