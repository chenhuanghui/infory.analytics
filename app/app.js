'use strict';

angular.module('dashboardSmgApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'home',
  'brand',
  'inbox',
  'shop'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'modules/home/home.html',
        controller: 'MainCtrl'
      })
  });

angular.module('dashboardSmgApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });