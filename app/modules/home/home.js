angular.module('home',[
		'ngRoute'
	])
	
	.controller('homeCtrl', ['$scope', function ($scope) {
		
	}])

	.config(function($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl: 'modules/home/home.html',
				controller: 'homeCtrl'
			})
	});