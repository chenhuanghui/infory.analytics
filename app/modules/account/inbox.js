angular.module('account')
	
	.controller('inboxCtrl', ['$scope', function ($scope) {
		$scope.activeTab = "inbox";
	}])

	.config(function($routeProvider){
		$routeProvider
			.when('/inbox', {
				templateUrl: 'modules/account/inbox.html',
				controller: 'inboxCtrl'
			})
	});