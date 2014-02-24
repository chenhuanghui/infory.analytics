angular.module('shop')

.controller('CreateShopCtrl', ['$scope',
    function($scope) {
        $scope.searchCompleted = false;
        $scope.defaultCategories = [{
            id: 1,
            name: "Thức ăn"
        }, {
            id: 2,
            name: "Đồ uống"
        }, {
            id: 3,
            name: "Giải trí"
        }, {
            id: 4,
            name: "Thời trang"
        }, {
            id: 5,
            name: "Du lịch"
        }, {
            id: 6,
            name: "Sức khỏe"
        }, {
            id: 7,
            name: "Sản phẩm"
        }, {
            id: 8,
            name: "Dịch vụ"
        }];
        $scope.cityList = [{
            id: 1,
            name: "Hà Nội"
        }, {
            id: 2,
            name: "Đà Nẵng"
        }, {
            id: 3,
            name: "Huế"
        }, {
            id: 4,
            name: "Nha Trang"
        }, {
            id: 5,
            name: "Hồ Chí Minh"
        }];

        $scope.search = function() {
            $scope.searchResults = [{
                id: 1,
                logo: 'http://dashboard.smartguide.vn/media/brand/14/1472-2013-10-31-20-07-38.jpeg',
                shop_name: "Gloria Jean's Coffees Bitexco",
                address: "Tầng 4 Food Creative TTTM Icon 68, Tòa nhà tài chính Bitexco - 2 Hải Triều, Q.1 , Hồ Chí Minh",
                category: "Giải khát",
                view: "1043"
            }, {
                id: 2,
                logo: 'http://125.253.122.44/media/brand/14/3834-2014-01-16-17-04-38.jpeg',
                shop_name: "SmartGuide",
                address: "Phòng 10.01, tòa nhà BMC, 422 Võ Văn Kiệt, Phường Cô Giang, Quận 1, TP. Hồ Chí Minh",
                category: "Sản phẩm",
                view: "1043"
            }, {
                id: 3,
                logo: 'http://125.253.122.44/media/brand/15/5769-2013-11-05-09-31-02.jpeg',
                shop_name: "Coca Suki Parkson Hùng Vương",
                address: "Lầu 3, Parkson Hùng Vương - 126 Hùng Vương, P12, Quận 5, TP. Hồ Chí Minh",
                category: "Thức ăn",
                view: "1043"
            }];
            $scope.searchCompleted = true;
        };

        $scope.chooseShop = function(index) {
            $scope.chosenShop = $scope.searchResults[index];
            $scope.searchCompleted = false;
        };
    }
])

.config(function($routeProvider) {
    var access = routingConfig.accessLevels;
    $routeProvider
        .when('/shop', {
            templateUrl: 'shop/shop-list.html',
            controller: 'ShopCtrl',
            access: access.user
        })
        .when('/create-shop', {
            templateUrl: 'modules/shop/shop_create.html',
            controller: 'CreateShopCtrl',
            access: access.user
        })
});