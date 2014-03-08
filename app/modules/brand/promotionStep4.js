angular.module('promotion')

.controller('PromotionStep4Ctrl', ['$scope', '$routeParams', '$location', 'remoteFactory', 'dataFactory', 'userRemote', 'serviceHelper', 'promotionRemote', 'promotionFactory', 'serviceHelper',

    function($scope, $routeParams, $location, remoteFactory, dataFactory, userRemote, serviceHelper, promotionRemote, promotionFactory, serviceHelper) {

        var brandId = $routeParams.brandId;

        dataFactory.getBrand(brandId, function(data) {
            $scope.brand = data;

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

        // var dataStep3 = promotionFactory.getDataStep3();
        // var dataStep2 = promotionFactory.getDataStep2();
        // var shops_apply = [];

        // for (var i = 0; i < dataStep2.selectedShops.length; i++) {
        //     if (dataStep2.selectedShops[i] == true) {
        //         shops_apply.push(dataStep2.shops[i].id);
        //     }
        // }

        // var fields = {
        //     name: dataStep2.name,
        //     brand_id: brandId,
        //     shops_apply: JSON.stringify(shops_apply),
        //     // date_beg: serviceHelper.normalizeTime(dataStep2.date_beg),
        //     // date_end: serviceHelper.normalizeTime(dataStep2.date_end),
        //     type: dataStep3.promotionType.name,
        // }

        // if (dataStep3 == null) {
        //     $location.path('/brand/promotion/step3/' + brandId);
        //     return;
        // }

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

    }
])