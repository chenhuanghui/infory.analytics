angular.module('home',[
		'ngRoute'
	])
	
	.controller('homeCtrl', ['$scope', function ($scope) {
		$scope.activeTab = 'home';
	}])

	.config(function($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl: 'modules/home/home.html',
				controller: 'homeCtrl'
			})
	});