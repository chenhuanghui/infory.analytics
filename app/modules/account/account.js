angular.module('account')
    .controller('accountCtrl', ['$scope',
        function($scope) {
            $scope.activeTab = "inbox";
            $scope.activeTab = "personal";

            $scope.cancel = function() {
                window.history.back();
            };
        }
    ])

.config(function($routeProvider) {
    var access = routingConfig.accessLevels;

    $routeProvider
        .when('/inbox', {
            templateUrl: 'modules/account/inbox.html',
            controller: 'accountCtrl',
            access: access.user
        })
        .when('/money', {
            templateUrl: 'modules/account/money.html',
            controller: 'accountCtrl',
            access: access.user
        })
        .when('/personal', {
            templateUrl: 'modules/account/personal.html',
            controller: 'accountCtrl',
            access: access.user
        })
        .when('/signin', {
            templateUrl: 'modules/account/signin.html',
            controller: 'accountCtrl',
            access: access.user
        })
        .when('/signup', {
            templateUrl: 'modules/account/signup.html',
            controller: 'accountCtrl',
            access: access.user
        })

});