angular.module('inbox',[
		'ngRoute'
	])
	
	.controller('inboxCtrl', ['$scope', function ($scope) {
		$scope.msg = "brand view";
	}])

	.config(function($routeProvider){
		$routeProvider
			.when('/inbox', {
				templateUrl: 'modules/inbox/index.html',
				controller: 'inboxCtrl'
			})
	});