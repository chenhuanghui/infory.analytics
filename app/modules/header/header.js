angular.module('header')

.controller('HeaderCtrl', ['$scope', '$location', 'dataFactory', 'Auth', 'brandRemote', 'dialogHelper',

    function($scope, $location, dataFactory, Auth, brandRemote, dialogHelper) {

        $scope.isVisibleBrandMenu = true;

        if ($location.path() == '/personal')
            $scope.isVisibleBrandMenu = false;

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

        $scope.setCurrentBrand = function(brand) {
            $scope.brand = brand;
            $('.z-btn .pop-dialog .close-icon').click();
            $location.path('/home/' + $scope.brand.id);
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
                    dataFactory.setCurrentBrand(null);
                    $('.z-btn .pop-dialog .close-icon').click();
                    $location.path('/brand/infor/' + data.brand_id);
                } else
                    dialogHelper.showError(data.error.message);
            }, function() {});
        }

        dataFactory.setUpdateBrandHeaderFunc($scope.updateBrand);
        dataFactory.setUpdateBrandsHeaderFunc($scope.updateBrands);
        dataFactory.setUpdateAccountNameHeaderFunc($scope.updateAccountName);
    }
])