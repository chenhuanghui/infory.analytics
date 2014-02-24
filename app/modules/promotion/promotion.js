angular.module('promotion')

.controller('promotionCtrl', ['$scope',
    function($scope) {
        $scope.activeTab = "user";
        $scope.brands = getBrands();
        $scope.promotionTypes = [{
            value: '1',
            label: 'Giảm giá trực tiếp (voucher)'
        }, {
            value: '2',
            label: 'Tích luỹ điểm'
        }];

        $scope.promotionList = [{
            name: "Chến dịch tết",
            logo: "img/contact-img.png",
            type: "Tích luỹ điểm",
            viewed: 500,
            used: 20,
            status: "Dang chay",
            created: "09/05/2014"
        }, {
            name: "Chến dịch hè",
            logo: "img/contact-img.png",
            type: "Tích luỹ điểm",
            viewed: 200,
            used: 100,
            status: "Tam dung",
            created: "27/04/2014"
        }, ];
        $scope.promotionDetail = {
            name: "Chến dịch tết",
            logo: "img/contact-img.png",
            type: "Tích luỹ điểm",
            viewed: 500,
            used: 20,
            status: "Dang chay",
            created: "09/05/2014",
            transactions: [{
                id: 1,
                created: "27/04/2014",
                user: "Tran",
                status: "Thành công"
            }, {
                id: 2,
                created: "28/04/2014",
                user: "Hoang",
                status: "Thành công"
            }, {
                id: 3,
                created: "29/04/2014",
                user: "Huy",
                status: "Pending"
            }]
        }


        // function
        function getBrands() {
            var data = [{
                id: 100,
                name: "Trung Nguyen"
            }, {
                id: 101,
                name: "GJC"
            }, {
                id: 100,
                name: "Passio"
            }]
            return data;
        }

    }
])

.config(function($routeProvider) {
    var access = routingConfig.accessLevels;

    $routeProvider
        .when('/promotion', {
            templateUrl: 'modules/promotion/promotion_list.html',
            controller: 'promotionCtrl',
            access: access.user
        })
        .when('/promotion/new', {
            templateUrl: 'modules/promotion/promotion_new.html',
            controller: 'promotionCtrl',
            access: access.user
        })
        .when('/promotion/:promotion_id', {
            templateUrl: 'modules/promotion/promotion_detail.html',
            controller: 'promotionCtrl',
            access: access.user
        })

});