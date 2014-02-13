'use strict';

var app = angular.module('Smg', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'home',
  'brand',
  'shop',
  'account',
  'user',
  'promotion',
  'smg.services'
]);
  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'modules/home/home.html',
        controller: 'MainCtrl'
      })
  });

  app.controller('MainCtrl', function ($scope, $rootScope) {
    $rootScope._username = "HAHAHAH";
  })

  



// Define modules

angular.module('smg.services', []);


angular.module('account',[
  'ngRoute'
]);  

angular.module('brand',[
  'ngRoute', 'smg.services'
]);  

angular.module('shop',[
  'ngRoute'
]);  

angular.module('home',[
  'ngRoute'
]);  

angular.module('user',[
  'ngRoute'
]);  

angular.module('promotion',[
  'ngRoute'
]);  