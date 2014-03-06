angular.module('header')

.controller('SideBarCtrl', ['$scope', '$routeParams', '$location', 'dataFactory', 'Auth',

    function($scope, $location, $routeParams, dataFactory, Auth) {
        $scope.brandId = $routeParams.brandId;;

        $scope.updateBrandId = function(id) {
            $scope.brandId = id;
        }

        $scope.$watch('brandId', function() {
            console.log($scope.brandId);
        });

        dataFactory.setUpdateBrandSideBarFunc($scope.updateBrandId);
    }
])