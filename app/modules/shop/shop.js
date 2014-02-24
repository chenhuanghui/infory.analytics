angular.module('shop')

.controller('ShopCtrl', ['$scope', '$routeParams', 'remoteFactory', 'dataFactory',
    function($scope, $routeParams, remoteFactory, dataFactory) {
        var shopId = $routeParams.shopId;
        $scope.brandId = $routeParams.brandId;
        var tempShop = dataFactory.getTempShop();
        var brand = dataFactory.getCurrentBrand();
        var fields = null;

        $scope.shop = null;

        if (tempShop != null)
            $scope.shop = tempShop;

        if (brand != null) {
            fields = '["name", "id", "phone"]';

            $scope.shop.brand_logo = brand.logo;
            $scope.shop.brand_website = brand.website;
            $scope.shop.brand_fanpage = brand.fanpage;
            $scope.shop.phone = brand.owner_phone;
            $scope.shop.brand_type_business = brand.type_business;

            $scope.shop.brand_id = brand.id;
        } else {
            fields = '["name", "id", "phone", "full_address", "cover", "brand_logo", "brand_website", "brand_fanpage", "brand_type_business"]';
        }

        dataFactory.getShop(shopId, fields, function(data) {
            if (data.full_address != null)
                $scope.shop = data;
            else
                $scope.shop.phone = data.phone;
        }, function() {});
    }
])

.config(function($routeProvider) {
    var access = routingConfig.accessLevels;
    $routeProvider
        .when('/shop/:brandId/:shopId', {
            templateUrl: 'modules/shop/shop.html',
            controller: 'ShopCtrl',
            access: access.user
        })
        .when('/create-shop', {
            templateUrl: 'modules/shop/shop_create.html',
            controller: 'CreateShopCtrl',
            access: access.user
        })
});