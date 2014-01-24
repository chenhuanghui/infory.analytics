'use strict';

angular.module('dashboardSmgApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'home',
  'brand',
  'shop',
  'account'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'modules/home/home.html',
        controller: 'MainCtrl'
      })
  })

  .controller('MainCtrl', function ($scope, $rootScope) {
    $rootScope._username = "HAHAHAH";
  });


// Define modules

angular.module('account',[
  'ngRoute'
]);  

angular.module('brand',[
  'ngRoute'
]);  

angular.module('shop',[
  'ngRoute'
]);  

angular.module('home',[
  'ngRoute'
]);  