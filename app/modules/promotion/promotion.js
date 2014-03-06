angular.module('promotion')

.controller('PromotionCtrl', ['$scope', '$routeParams', 'remoteFactory', 'dataFactory', 'userRemote', 'serviceHelper', 'promotionRemote',

    function($scope, $routeParams, remoteFactory, dataFactory, userRemote, serviceHelper, promotionRemote) {

        var brandId = $routeParams.brandId;
        $scope.selectedShops = [];
        $scope.checkAllShops = false;

        dataFactory.getBrand(brandId, function(data) {
            $scope.brand = data;
            for (var i = 0; i < $scope.brand.shops.length; i++) {
                $scope.brand.shops[i].selectedId = i;
                $scope.selectedShops.push(i == 0);
            }

        }, function() {});

        $scope.orderPromotions = [{
            name: '',
            name_display: 'Tất cả'
        }, {
            name: 'news',
            name_display: 'Đăng tin'
        }, {
            name: 'score',
            name_display: 'Tích luỹ điểm'
        }, {
            name: 'voucher',
            name_display: 'Voucher'
        }];

        $scope.promotionTypes = [{
            name: 'news',
            name_display: 'Đăng tin'
        }, {
            name: 'score',
            name_display: 'Tích luỹ điểm'
        }, {
            name: 'voucher',
            name_display: 'Voucher'
        }];

        $scope.name = "Tên chương trình khuyến mãi mới";
        $scope.data = [{
            dateDropDownInput: moment("2013-10-22T00:00:00.000").toDate(),
            dateDisplay: "22-10-2013 00:00",
        }, {
            dateDropDownInput: moment("2014-02-22T00:00:00.000").toDate(),
            dateDisplay: "22-02-2014 00:00",
        }];

        $scope.time = '22-10-2013 00:00 đến 22-02-2014 00:00';

        function updateTime() {
            $scope.time = $scope.data[0].dateDisplay + " đến " + $scope.data[1].dateDisplay;
        }

        $scope.onTimeSetOne = function(newDate, oldDate) {
            $scope.data[0].dateDisplay = serviceHelper.normalizeTimeWithMinute(newDate);
            updateTime();
        }

        $scope.onTimeSetTwo = function(newDate, oldDate) {
            $scope.data[1].dateDisplay = serviceHelper.normalizeTimeWithMinute(newDate);
            updateTime();
        }

        $scope.sortPromotionList = function() {
            $scope.promotionList = [];
            switch ($scope.orderPromotion.name) {
                case '':
                    $scope.promotionList = $scope.promotionListFull;
                    break;

                default:
                    sortByType($scope.orderPromotion.name);
            }
        }


        function sortByType(type) {
            for (var i = 0; i < $scope.promotionListFull.length; i++) {
                if ($scope.promotionListFull[i].type == type)
                    $scope.promotionList.push($scope.promotionListFull[i]);
            }
        }

        var fields = '["id, "type", "name", "status"]';
        promotionRemote.list({
            brand_id: brandId,
            fields: fields
        }, function(data) {
            for (var i = 0; i < data.length; i++) {
                switch (data[i].type) {
                    case 'voucher':
                        data[i].typeDisplay = 'Voucher';
                        break;
                    case 'news':
                        data[i].typeDisplay = 'Đăng tin';
                        break;
                    case 'score':
                        data[i].typeDisplay = 'Tích luỹ điểm';
                        break;
                }

                data[i].stt = (i % 2 == 0) ? 'even' : 'odd';

                switch (data[i].status) {
                    case 'running':
                        data[i].statusClass = 'btn-flat success';
                        break;
                    case 'waiting':
                        data[i].statusClass = 'btn-flat gray';
                        break;
                    case 'stopped':
                        data[i].statusClass = 'btn-flat inverse';
                        break;
                }
                data[i].time = serviceHelper.normalizeTimeWithMinute(new Date(data[i].date_beg)) + " đến " + serviceHelper.normalizeTimeWithMinute(new Date(data[i].date_end));
            }

            $scope.promotionList = data;
            $scope.promotionListFull = data;
        }, function() {});

        $scope.numOfSelectedShops = 1;
        $scope.updateSelectedShops = function() {
            var num = 0;
            for (var i = 0; i < $scope.brand.shops.length; i++) {
                if ($scope.selectedShops[i] == true)
                    num++;
            }

            $scope.numOfSelectedShops = num;
        }

        $scope.checkAll = function() {
            for (var i = 0; i < $scope.brand.shops.length; i++)
                $scope.selectedShops[i] = $scope.checkAllShops;

            if ($scope.checkAllShops == true)
                $scope.numOfSelectedShops = $scope.selectedShops.length;
            else
                $scope.numOfSelectedShops = 0;
        }
    }
])
    .config(function($routeProvider) {
        var access = routingConfig.accessLevels;

        $routeProvider
            .when('/brand/promotion/:brandId', {
                templateUrl: 'modules/brand/promotion_new.html',
                controller: 'PromotionCtrl',
                access: access.user
            })
    });