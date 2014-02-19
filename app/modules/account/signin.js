angular.module('account')
    .controller('signInCtrl', ['$scope', '$location', '$window', 'Auth',
        function($scope, $location, $window, Auth) {
            $scope.user = Auth.user;
            $scope.userRoles = Auth.userRoles;
            $scope.accessLevels = Auth.accessLevels;
            $scope.hideMessage = true;

            $scope.logout = function() {
                Auth.logout(function() {
                    $location.path('/login');
                }, function() {

                });
            };

            $scope.login = function() {
                Auth.login({
                        username: $scope.username,
                        password: $scope.password,
                        rememberme: $scope.rememberme
                    },
                    function(res) {
                        $scope.hideMessage = false;
                        $location.path('/');
                    },
                    function(err) {
                        $scope.message = err;
                        $scope.hideMessage = false;
                    });
            };

            $scope.loginOauth = function(provider) {
                $window.location.href = '/auth/' + provider;
            };
        }
    ]);