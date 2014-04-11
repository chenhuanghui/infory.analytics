angular.module('account')
    .controller('signUpCtrl', ['$scope',
        function($scope) {
            $scope.IsRightPass = false;
            $scope.password = '';
            $scope.confirmPassword = '';

            $scope.updatePass = function() {
                if ($scope.password != $scope.confirmPassword)
                    $scope.IsRightPass = false;
                else
                    $scope.IsRightPass = true;
            }
        }
    ])

.config(function($routeProvider) {
    $routeProvider
        .when('/signup', {
            templateUrl: 'modules/account/template/signup.html',
            controller: 'signUpCtrl'
        })
});