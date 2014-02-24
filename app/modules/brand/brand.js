angular.module('brand')

.controller('BrandCtrl', ['$scope', '$http', '$location', 'remoteFactory', 'dataFactory',
    function($scope, $http, $location, remoteFactory, dataFactory) {
        $scope.msg = "brand view";
        $scope.brand = null;
        $scope.brands = null;

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
                dataFactory.getBrand(brands[0].id, function(data) {
                    $scope.brand = data;
                    $scope.shop = $scope.brand.shops[0];
                }, function() {})
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

    }
])


.config(function($routeProvider) {
    var access = routingConfig.accessLevels;

    $routeProvider
        .when('/brand', {
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
        .when('/brand/comment', {
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