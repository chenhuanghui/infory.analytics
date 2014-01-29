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
  'account',
  'user'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {

    var access = rolesConfig.accessLevels;

    $routeProvider
      .when('/', {
        templateUrl: 'modules/home/home.html',
        controller: 'MainCtrl',
        access: access.user
      })
      .when('/404', {
        templateUrl: '404',
        access: access.public
      }).otherwise({
         redirectTo: '/404'
      });

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    //delete $httpProvider.defaults.headers.post['Content-type']

    $httpProvider.interceptors.push(function($q, $location) {
       return {
           'responseError': function(response) {
               if (response.status === 401 || response.status === 403) {
                   $location.path('/login');
                   return $q.reject(response);
               } else {
                   return $q.reject(response);
               }
           }
       }
    });
 
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [

    function(data) {
    /**
    * The workhorse; converts an object to x-www-form-urlencoded serialization.
    * @param {Object} obj
    * @return {String}
    */
      var param = function(obj) {
        var query = '';
        var name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
         value = obj[name];

         if (value instanceof Array) {
           for (i = 0; i < value.length; ++i) {
             subValue = value[i];
             fullSubName = name + '[' + i + ']';
             innerObj = {};
             innerObj[fullSubName] = subValue;
             query += param(innerObj) + '&';
           }
         } else if (value instanceof Object) {
           for (subName in value) {
             subValue = value[subName];
             fullSubName = name + '[' + subName + ']';
             innerObj = {};
             innerObj[fullSubName] = subValue;
             query += param(innerObj) + '&';
           }
         } else if (value !== undefined && value !== null) {
           query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
         }
        }

        return query.length ? query.substr(0, query.length - 1) : query;
      };

      return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
  })

  .controller('MainCtrl', function ($scope, $rootScope) {
    $rootScope._username = "HAHAHAH";
  })

  .run(['$rootScope', '$location', '$http', 'Auth',
    function($rootScope, $location, $http, Auth) {
      $rootScope.$on("$routeChangeStart", function(event, next, current) {
        $rootScope.error = null;
        if (!Auth.authorize(next.access)) {
          if (Auth.isLoggedIn()) 
            $location.path('/');
          else 
            $location.path('/login');
        }
      });
    }
  ]);


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

angular.module('user',[
  'ngRoute'
]);  