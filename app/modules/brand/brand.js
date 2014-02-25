angular.module('brand')

.controller('BrandCtrl', ['$scope', '$http', '$location', '$routeParams', 'brandRemote', 'dataFactory',
    function($scope, $http, $location, $routeParams, brandRemote, dataFactory) {

        var brandId = $routeParams.brandId;
        $scope.brand = null;
        $scope.brands = null;
        $scope.editName = false;
        $scope.brandName = '';
        $scope.oderComments = [{
            field: 'like_count',
            display: 'Lượt thích'
        }, {
            field: 'updated_time',
            display: 'Thời gian'
        }];

        dataFactory.getBrands(function(brands) {
            $scope.brands = brands;
            if (brands.length != 0) {
                if (brandId == null) {
                    dataFactory.getBrand(brands[0].id, function(data) {
                        $scope.brand = data;
                        $scope.shop = $scope.brand.shops[0];
                        $scope.brandName = data.name;
                    }, function() {})
                } else {
                    for (var i = 0; i < brands.length; i++) {
                        if (brands[i].id == brandId) {
                            dataFactory.getBrand(brands[i].id, function(data) {
                                $scope.brand = data;
                                $scope.shop = $scope.brand.shops[0];
                                $scope.brandName = data.name;
                            }, function() {})
                            break;
                        }
                    }
                }
            }
        }, function() {});

        $scope.setCurrentBrand = function(brand) {
            $scope.brand = brand;
            dataFactory.setCurrentBrand(brand);
        }

        $scope.showUserProfile = function(brandId, userId, username, avatar) {
            dataFactory.setUsernameAvatar(username, avatar);

            //FOR TESTING REASON
            userId = 411;
            $location.path('/user/' + brandId + '/' + userId);
        }

        $scope.goToShopInfo = function(shop) {
            dataFactory.setTempShop(shop);
            $location.path('/shop/' + $scope.brand.id + '/' + shop.id);
        }

        $scope.changeName = function() {
            if ($scope.brandName.length <= 0) {
                $scope.brandName = $scope.brand.name;
            } else {
                brandRemote.updateBrandName(brandId, $scope.brandName, function(data) {
                    if (data.error == undefined) {
                        $scope.brand.name = $scope.brandName;
                        dataFactory.setCurrentBrand($scope.brand);
                        editName != editName;
                    } else {
                        $scope.brandName = $scope.brand.name;
                        editName != editName;
                    }
                }, function() {

                });

            }
        }
    }
])


.config(function($routeProvider) {
    var access = routingConfig.accessLevels;

    $routeProvider
        .when('/brand/infor/:brandId', {
            templateUrl: 'modules/brand/brand/brand.html',
            controller: 'BrandCtrl',
            access: access.user
        })
        .when('/brand/new', {
            templateUrl: 'modules/brand/brand_new.html',
            controller: 'brandCreateCtrl',
            access: access.user
        })
        .when('/brand/promotion-new', {
            templateUrl: 'modules/brand/promotion_new.html',
            access: access.user
        })
        .when('/brand/promotion', {
            templateUrl: 'modules/brand/promotion/promotion_list.html',
            controller: 'BrandCtrl',
            access: access.user
        })
        .when('/brand/comment/:brandId', {
            templateUrl: 'modules/brand/comment/comment.html',
            controller: 'BrandCtrl',
            access: access.user

        })
        .when('/brand/new', {
            templateUrl: 'modules/brand/brand_new.html',
            controller: 'BrandCtrl',
            access: access.user
        })
});