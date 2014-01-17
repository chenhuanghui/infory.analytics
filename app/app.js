'use strict';

angular.module('dashboardSmgApp', [
  'brand',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'modules/brand/brand-list.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
