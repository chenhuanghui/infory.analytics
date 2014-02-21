angular.module('brand')

.controller('BrandCtrl', ['$scope', '$http', 'remoteFactory', 'dataFactory',
    function($scope, $http, remoteFactory, dataFactory) {
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

        dataFactory.getBrand(function(data) {
            $scope.brand = data[0];
            $scope.shop = $scope.brand.shops[0];
        }, function() {});

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