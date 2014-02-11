'use strict';

angular.module('dashboardSmgApp')
    .controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$window', 'Auth',
        function($rootScope, $scope, $location, $window, Auth) {

            $scope.rememberme = true;
            $scope.login = function() {
                Auth.login({
                        username: $scope.username,
                        role: $scope.role
                    },
                    function(res) {
                        $location.path('/');
                    },
                    function(err) {
                        $rootScope.error = "Failed to login";
                    });
            };

            $scope.loginOauth = function(provider) {
                $window.location.href = '/auth/' + provider;
            };
        }
    ]);