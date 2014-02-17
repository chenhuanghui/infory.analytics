angular.module('account')
    .controller('signUpCtrl', ['$scope',
        function($scope) {
            $scope.activeTab = "account";
        }
    ])

.config(function($routeProvider) {
    $routeProvider
        .when('/signup', {
            templateUrl: 'modules/account/signup.html',
            controller: 'signUpCtrl'
        })
});