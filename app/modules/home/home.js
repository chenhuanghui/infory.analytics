angular.module('home')

.controller('homeCtrl', ['$scope',
    function($scope) {
        $scope.activeTab = 'home';
    }
])

.config(function($routeProvider) {

    var access = routingConfig.accessLevels;

    $routeProvider
        .when('/', {
            templateUrl: 'modules/home/home.html',
            controller: 'homeCtrl',
            access: access.user
        })
});