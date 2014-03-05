angular.module('header')

.controller('HeaderCtrl', ['$scope', '$location', 'dataFactory', 'Auth', 'brandRemote',

    function($scope, $location, dataFactory, Auth, brandRemote) {

        $scope._username = Auth.user.name;
        $scope.newBrandName = 'New brand';
        $scope.updateBrand = function(brand) {
            $scope.brand = brand;
        }

        $scope.updateBrands = function(brands) {
            $scope.brands = brands;
        }

        $scope.updateAccountName = function(name) {
            $scope._username = name;
        }

        $scope.setCurrentBrand = function(brand) {
            $scope.brand = brand;
            dataFactory.updateHome($scope.brand.id);
            dataFactory.updateBrandSideBar($scope.brand.id);
            $('.z-btn .pop-dialog .close-icon').click();
            $location.path('/brand/infor/' + $scope.brand.id);
        }

        $scope.createBrand = function(name) {
            if (name.length == '')
                return;

            brandRemote.create({
                name: name
            }, function(data) {
                if (data.error == undefined) {
                    $scope.brands.push({
                        id: data.brand_id,
                        name: name
                    });
                    $scope.newBrandName = 'New brand';
                }
            }, function() {});
        }

        dataFactory.setUpdateBrandHeaderFunc($scope.updateBrand);
        dataFactory.setUpdateBrandsHeaderFunc($scope.updateBrands);
        dataFactory.setUpdateAccountNameHeaderFunc($scope.updateAccountName);
    }
])