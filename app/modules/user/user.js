angular.module('user')

.controller('userCtrl', ['$scope', '$routeParams', 'remoteFactory', 'dataFactory',

    function($scope, $routeParams, remoteFactory, dataFactory) {
        $scope.activeTab = "user";
        $scope.cssLink = "user-profile.css";
    $scope.brandId = dataFactory.getBrandId();

        $id = $routeParams.id;
    }
])

.config(function($routeProvider) {
    $routeProvider
        .when('/user', {
            templateUrl: 'modules/user/user_list.html',
            controller: 'userCtrl'
        })
        .when('/user/new', {
            templateUrl: 'modules/user/new_user.html',
            controller: 'userCtrl'
        })
        .when('/user/manager', {
            templateUrl: 'modules/user/user_manager.html',
            controller: 'userCtrl'
        })
        .when('/user/notify-new', {
            templateUrl: 'modules/user/user_notify_new.html',
            controller: 'userCtrl'
        })
        .when('/user/:id', {
            templateUrl: 'modules/user/user_profile.html',
            controller: 'userCtrl'
        })
});