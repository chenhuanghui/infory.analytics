angular.module('account')
    .controller('signInCtrl', ['$rootScope', '$scope', '$location', '$window', 'Auth',
        function($rootScope, $scope, $location, $window, Auth) {
            $scope.user = Auth.user;
            $scope.userRoles = Auth.userRoles;
            $scope.accessLevels = Auth.accessLevels;

            $scope.logout = function() {
                Auth.logout(function() {
                    $location.path('/login');
                }, function() {
                    $rootScope.error = "Failed to logout";
                });
            };

            $scope.login = function() {
                Auth.login({
                        username: $scope.username,
                        password: $scope.password,
                        rememberme: $scope.rememberme
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