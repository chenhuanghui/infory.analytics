angular.module('shop')

.controller('ShopCtrl', ['$scope', '$routeParams', 'remoteFactory', 'dataFactory', 'shopRemote', 'shopFactory',

    function($scope, $routeParams, remoteFactory, dataFactory, shopRemote, shopFactory) {
        var shopId = $routeParams.shopId;
        $scope.brandId = $routeParams.brandId;
        var brandId = $routeParams.brandId;
        var tempShop = dataFactory.getTempShop();
        var brand = dataFactory.getCurrentBrand();
        var fields = null;

        $scope.shop = null;
        $scope.bundle = {
            shopName: '',
            shopCover: '',
            shopStreetAddress: '',
            shopDistrictAddress: '',
            shopCityAddress: '',
            editName: false,
            editStreetAddress: false,
            editDistrictAddress: false,
            editCityAddress: false,
        };

        if (tempShop != null)
            $scope.shop = tempShop;

        if (brand != null) {
            fields = '["name", "id", "phone", "cover", "street_address", "district_address", "city_address", "user_gallery"]';

            $scope.shop.brand_logo = brand.logo;
            $scope.shop.brand_website = brand.website;
            $scope.shop.brand_fanpage = brand.fanpage;
            $scope.shop.brand_description = brand.description;
            $scope.shop.brand_type_business = brand.type_business;
            $scope.shop.phone = brand.owner_phone;

            $scope.shop.brand_id = brand.id;
        } else {
            fields = '["name", "id", "cover", phone", "full_address", "cover", "brand_logo", "brand_website", "brand_fanpage", "brand_type_business", "brand_description", "street_address", "district_address", "city_address", "user_gallery"]';
        }

        dataFactory.getShop(shopId, fields, function(data) {
            if (data.full_address != null)
                $scope.shop = data;
            else {
                $scope.shop.phone = data.phone;
            }

            $scope.bundle.shopName = data.name;
            $scope.bundle.shopCover = data.cover;
            $scope.bundle.shopStreetAddress = data.street_address;
            $scope.bundle.shopDistrictAddress = data.district_address;
            $scope.bundle.shopCityAddress = data.city_address;

        }, function() {});

        $scope.changeName = function() {
            if ($scope.bundle.shopName.length <= 0) {
                $scope.bundle.shopName = $scope.shop.name;
            } else {
                shopRemote.update({
                    name: $scope.bundle.shopName,
                    shop_id: shopId,
                }, function(data) {
                    if (data.error == undefined) {
                        $scope.shop.name = $scope.bundle.shopName;
                        $scope.bundle.editName = !$scope.bundle.editName;
                        dataFactory.setCurrentShop($scope.shop);
                        dataFactory.updateShopInBrand(shopId, $scope.brandId, $scope.shop);
                    } else {
                        $scope.bundle.editName = !$scope.bundle.editName;
                        $scope.bundle.shopName = $scope.shop.name;
                    }
                }, function() {

                });
            }
        }

        $scope.changeName = function() {
            if ($scope.bundle.shopName.length <= 0) {
                $scope.bundle.shopName = $scope.shop.name;
            } else {
                shopRemote.update({
                    name: $scope.bundle.shopName,
                    shop_id: shopId,
                }, function(data) {
                    if (data.error == undefined) {
                        $scope.shop.name = $scope.bundle.shopName;
                        $scope.bundle.editName = !$scope.bundle.editName;
                        dataFactory.setCurrentShop($scope.shop);
                        dataFactory.updateShopInBrand(shopId, $scope.brandId, $scope.shop);
                    } else {
                        $scope.bundle.editName = !$scope.bundle.editName;
                        $scope.bundle.shopName = $scope.shop.name;
                    }
                }, function() {

                });
            }
        }


        $scope.changeStreetAddress = function() {
            if ($scope.bundle.shopStreetAddress.length <= 0) {
                $scope.bundle.shopStreetAddress = $scope.shop.street_address;
            } else {
                shopRemote.update({
                    street_address: $scope.bundle.shopStreetAddress,
                    shop_id: shopId,
                }, function(data) {
                    if (data.error == undefined) {
                        $scope.shop.street_address = $scope.bundle.shopStreetAddress;
                        $scope.bundle.editStreetAddress = !$scope.bundle.editStreetAddress;
                        dataFactory.setCurrentShop($scope.shop);
                        dataFactory.updateShopInBrand(shopId, $scope.brandId, $scope.shop);
                    } else {
                        $scope.bundle.editStreetAddress = !$scope.bundle.editStreetAddress;
                        $scope.bundle.shopStreetAddress = $scope.shop.street_address;
                    }
                }, function() {

                });
            }
        }

        $scope.changeDistrictAddress = function() {
            if ($scope.bundle.shopDistrictAddress.length <= 0) {
                $scope.bundle.shopDistrictAddress = $scope.shop.district_address;
            } else {
                shopRemote.update({
                    district_address: $scope.bundle.shopDistrictAddress,
                    shop_id: shopId,
                }, function(data) {
                    if (data.error == undefined) {
                        $scope.shop.district_address = $scope.bundle.shopDistrictAddress;
                        $scope.bundle.editDistrictAddress = !$scope.bundle.editDistrictAddress;
                        dataFactory.setCurrentShop($scope.shop);
                        dataFactory.updateShopInBrand(shopId, $scope.brandId, $scope.shop);
                    } else {
                        $scope.bundle.editDistrictAddress = !$scope.bundle.editDistrictAddress;
                        $scope.bundle.shopDistrictAddress = $scope.shop.district_address;
                    }
                }, function() {

                });
            }
        }

        $scope.changeCityAddress = function() {
            if ($scope.bundle.shopCityAddress.length <= 0) {
                $scope.bundle.shopCityAddress = $scope.shop.city_address;
            } else {
                shopRemote.update({
                    city_address: $scope.bundle.shopCityAddress,
                    shop_id: shopId,
                }, function(data) {
                    if (data.error == undefined) {
                        $scope.shop.city_address = $scope.bundle.shopCityAddress;
                        $scope.bundle.editCityAddress = !$scope.bundle.editCityAddress;
                        dataFactory.setCurrentShop($scope.shop);
                        dataFactory.updateShopInBrand(shopId, $scope.brandId, $scope.shop);
                    } else {
                        $scope.bundle.editCityAddress = !$scope.bundle.editCityAddress;
                        $scope.bundle.shopCityAddress = $scope.shop.city_address;
                    }
                }, function() {

                });
            }
        }

        $scope.deleteUserImage = function(id) {
            var index = -1;

            for (var i = 0; i < $scope.usersGallery.length; i++) {
                if ($scope.usersGallery[i].id == id) {
                    index = i;
                    break;
                }
            }

            shopRemote.removeImage({
                shop_id: shopId,
                image_id: index
            }, function(data) {
                if (data.error == undefined) {
                    for (var i = $scope.usersGallery.length - 1; i >= 0; i--) {
                        if ($scope.usersGallery[i].id == id) {
                            $scope.usersGallery.splice(i, 1);
                            saveImageToFactory();
                            return;
                        }
                    }
                }
            }, function() {});
        }

        $scope.showUsersGallery = function() {
            var oldData = shopFactory.getData(brandId, shopId);


            if (oldData == null) {
                var fields = {
                    shop_id: shopId,
                    fields: '["user_gallery"]'
                };

                shopRemote.get(fields, function(data) {
                    if (data.user_gallery == null)
                        $scope.usersGallery = [];
                    else {
                        $scope.usersGallery = data.user_gallery;
                        saveImageToFactory();
                    }
                }, function() {});
            } else
                $scope.usersGallery = oldData.usersGallery;

        }

        function saveImageToFactory() {
            shopFactory.setData({
                brand_id: brandId,
                shop_id: shopId,
                usersGallery: $scope.usersGallery
            })
        }

    }
])

.config(function($routeProvider) {
    var access = routingConfig.accessLevels;
    $routeProvider
        .when('/shop/:brandId/:shopId', {
            templateUrl: 'modules/shop/template/shop.html',
            controller: 'ShopCtrl',
            access: access.user
        })
        .when('/create-shop', {
            templateUrl: 'modules/shop/template/shop_create.html',
            controller: 'CreateShopCtrl',
            access: access.user
        })
});