'use strict';

angular.module('dashboardSmgApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap'
])
    .config(['$routeProvider', '$locationProvider', '$httpProvider',
        function($routeProvider, $locationProvider, $httpProvider) {

            var access = routingConfig.accessLevels;

            $routeProvider.when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl',
                access: access.user
            }).when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                access: access.anon
            }).when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegisterCtrl',
                access: access.anon
            }).when('/private', {
                templateUrl: 'views/private.html',
                controller: 'PrivateCtrl',
                access: access.user
            }).when('/admin', {
                templateUrl: 'views/admin.html',
                controller: 'AdminCtrl',
                access: access.admin
            }).when('/404', {
                templateUrl: '404',
                access: access.public
            }).otherwise({
                redirectTo: '/404'
            });

            //$locationProvider.html5Mode(true);
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
                }
            ];

        }
    ])

.run(['$rootScope', '$location', '$http', 'Auth',
    function($rootScope, $location, $http, Auth) {

        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            $rootScope.error = null;
            if (!Auth.authorize(next.access)) {
                if (Auth.isLoggedIn()) $location.path('/');
                else $location.path('/login');
            }
        });

    }
]);