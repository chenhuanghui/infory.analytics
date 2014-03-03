angular.module('account')
    .controller('AccountCtrl', ['$scope', '$http', '$location', '$routeParams', 'remoteFactory', 'dataFactory', 'Auth',
        function($scope, $http, $location, $routeParams, remoteFactory, dataFactory, Auth) {

            $scope._username = Auth.user.name;

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