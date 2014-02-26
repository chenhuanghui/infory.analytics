angular.module('home')

.controller('HomeCtrl', ['$scope', '$http', '$location', '$routeParams', 'remoteFactory', 'dataFactory', 'Auth',

    function($scope, $http, $location, $routeParams, remoteFactory, dataFactory, Auth) {
        $scope._username = Auth.user.name;
    }
])