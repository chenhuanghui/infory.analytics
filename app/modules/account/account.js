angular.module('account')
    .controller('AccountCtrl', ['$scope', '$http', '$location', '$routeParams', 'dataFactory', 'Auth', 'accountRemote',
        function($scope, $http, $location, $routeParams, dataFactory, Auth, accountRemote) {

            $scope._username = Auth.user.name;

            $scope.activeTab = "inbox";
            $scope.activeTab = "personal";

            $scope.cancel = function() {
                window.history.back();
            };

            $scope.showSuccessNotify = false;
            var orignalAccount = null;
            if ($location.path() == '/personal') {
                var fields = '["name"], ["avatar"], ["balance"], ["company"], ["email"]';
                accountRemote.get(fields, function(data) {
                    $scope.account = data;
                    $scope.account.password = "111111";
                    $scope.account.confirmPassword = "111111";
                    $scope._username = data.name;
                    if ($scope.account.balance == null)
                        $scope.account.balance = 0;
                    orignalAccount = data;
                }, function() {});
            }

            $scope.update = function() {
                var fields = {
                    name: $scope.account.name,
                    email: $scope.account.email,
                    company: $scope.account.company,
                    password: $scope.account.password
                };

                accountRemote.update(fields, function(data) {
                    if (data.error == undefined) {
                        orignalAccount = $scope.account;
                        $scope.showSuccessNotify = true;
                    } else {
                        $scope.account = orignalAccount;
                    }
                }, function() {
                    $scope.account = orignalAccount;
                })
            }
        }
    ])

.config(function($routeProvider) {
    var access = routingConfig.accessLevels;

    $routeProvider
        .when('/inbox', {
            templateUrl: 'modules/account/inbox.html',
            controller: 'AccountCtrl',
            access: access.user
        })
        .when('/money', {
            templateUrl: 'modules/account/money.html',
            controller: 'AccountCtrl',
            access: access.user
        })
        .when('/personal', {
            templateUrl: 'modules/account/personal.html',
            controller: 'AccountCtrl',
            access: access.user
        })
        .when('/signin', {
            templateUrl: 'modules/account/signin.html',
            controller: 'AccountCtrl',
            access: access.user
        })
        .when('/signup', {
            templateUrl: 'modules/account/signup.html',
            controller: 'AccountCtrl',
            access: access.user
        })
});