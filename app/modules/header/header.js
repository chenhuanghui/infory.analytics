angular.module('header')

.controller('HeaderCtrl', ['$scope', 'dataFactory', 'Auth',

    function($scope, dataFactory, Auth) {

        $scope._username = Auth.user.name;

        $scope.updateBrand = function(brand) {
            $scope.brand = brand;
        }

        $scope.updateBrands = function(brands) {
            $scope.brands = brands;
        }

        $scope.updateAccountName = function(name) {
            $scope._username = name;
        }

        dataFactory.setUpdateBrandHeaderFunc($scope.updateBrand);
        dataFactory.setUpdateBrandsHeaderFunc($scope.updateBrands);
        dataFactory.setUpdateAccountNameHeaderFunc($scope.updateAccountName);
    }
])