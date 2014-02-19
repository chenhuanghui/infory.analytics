angular.module('brand')

.controller('BrandCtrl', ['$scope', 'remoteFactory', '$http',

    function($scope, remoteFactory, $http) {
        $scope.msg = "brand view";
        $scope.brand = null;

        $scope.oderComments = [{
            field: 'like_count',
            display: 'Lượt thích'
        }, {
            field: 'updated_time',
            display: 'Thời gian'
        }];

        $http.post('http://dev2.smartguide.vn/dashboard/api/v1/brand/list', {
            fields: '["name", "logo", "cover", "type_business", "website", "fanpage", "description", "shops"]'
        }).success(function(data) {
            $scope.brand = data[0];
            $scope.shop = $scope.brand.shops[0];
        }).error(function(data) {
            console.log(data);
        });
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