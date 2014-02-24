angular.module('home')

.controller('HomeCtrl', ['$scope', '$http', '$location', '$routeParams', 'remoteFactory', 'dataFactory', 'Auth',

    function($scope, $http, $location, $routeParams, remoteFactory, dataFactory, Auth) {
        $scope._username = Auth.user.name;

        dataFactory.getBrands(function(brands) {
            $scope.brands = brands;
            $scope.brand = brands[0];
        }, function() {});
    }
])