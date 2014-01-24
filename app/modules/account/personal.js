angular.module('account')
	.controller('personalCtrl', ['$scope', function ($scope) {
		$scope.activeTab = "personal";

		$scope.cancel = function (){
			window.history.back();
		};
	}])

	.config(function($routeProvider){
		$routeProvider
			.when('/personal', {
				templateUrl: 'modules/account/personal.html',
				controller: 'personalCtrl'
			})
	});

