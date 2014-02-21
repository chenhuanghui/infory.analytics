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

        dataFactory.getBrands(function(brands, brand) {
            $scope.brands = brands;
            $scope.brand = brand;
            $scope.shop = $scope.brand.shops[0];
        })

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
    $routeProvider
        .when('/brand', {
            templateUrl: 'modules/brand/brand/brand.html',
            controller: 'BrandCtrl',
        })
        .when('/brand/new', {
            templateUrl: 'modules/brand/brand_new.html',
            controller: 'brandCreateCtrl'
        })
        .when('/brand/promotion-new', {
            templateUrl: 'modules/brand/promotion_new.html'
        })
        .when('/brand/promotion', {
            templateUrl: 'modules/brand/promotion/promotion_list.html',
            controller: 'BrandCtrl'
        })

    .when('/brand/comment', {
        templateUrl: 'modules/brand/comment/comment.html',
        controller: 'BrandCtrl'
    })

    .when('/brand/new', {
        templateUrl: 'modules/brand/brand_new.html',
        controller: 'BrandCtrl'
    })
});