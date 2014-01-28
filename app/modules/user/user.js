angular.module('user')
	
	.controller('userCtrl', ['$scope', function ($scope) {
		$scope.activeTab = "user";
		$scope.cssLink = "user-profile.css";
	}])

	.config(function($routeProvider){
		$routeProvider
			.when('/user', {
				templateUrl: 'modules/user/user_list.html',
				controller: 'userCtrl'
			})
			.when('/user/new', {
				templateUrl: 'modules/user/new_user.html',
				controller: 'userCtrl'
			})
			.when('/user/:id', {
				templateUrl: 'modules/user/user_profile.html',
				controller: 'userCtrl'
			})
	});