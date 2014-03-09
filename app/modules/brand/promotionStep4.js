angular.module('promotion')

.controller('PromotionStep4Ctrl', ['$scope', '$routeParams', '$location', 'remoteFactory', 'dataFactory', 'userRemote', 'serviceHelper', 'promotionRemote', 'promotionFactory', 'serviceHelper',

    function($scope, $routeParams, $location, remoteFactory, dataFactory, userRemote, serviceHelper, promotionRemote, promotionFactory, serviceHelper) {

        var brandId = $routeParams.brandId;

        dataFactory.getBrand(brandId, function(data) {
            $scope.brand = data;

        }, function() {});

        $scope.goToStep1 = function() {
            $location.path('/brand/promotion/step1/' + brandId);
        }
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

        var dataStep3 = promotionFactory.getData(2);
        if (dataStep3 == null) {
            listPromotion();
            return;
        } else {
            var dataStep2 = promotionFactory.getData(1);
            var shops_apply = [];

            for (var i = 0; i < dataStep2.selectedShops.length; i++) {
                if (dataStep2.selectedShops[i] == true) {
                    shops_apply.push(dataStep2.shops[i].id);
                }
            }

            var fields = {
                name: dataStep2.name,
                brand_id: brandId,
                shops_apply: JSON.stringify(shops_apply),
                date_beg: serviceHelper.normalizeTime(dataStep2.date_beg.dateDropDownInput),
                date_end: serviceHelper.normalizeTime(dataStep2.date_end.dateDropDownInput),
                type: dataStep3.promotionType.name,
                requirement: ''
            }

            switch (dataStep3.promotionType.name) {
                case 'news':
                    fields.title = dataStep3.title;
                    break;
                case 'voucher':
                    var vouchers = [];


                    for (var i = 0; i < dataStep3.presentDescriptions.length; i++) {
                        var description = dataStep3.presentDescriptions[i];
                        if (description.nonoLimitedChecked == true)
                            description.amount = 0;

                        var available_days = [];

                        if (description.allChecked == true)
                            available_day = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
                        else {
                            if (description.monChecked == true)
                                available_days.push("mon");
                            if (description.tueChecked == true)
                                available_days.push("tue");
                            if (description.wedChecked == true)
                                available_days.push("wed");
                            if (description.thuChecked == true)
                                available_days.push("thu");
                            if (description.friChecked == true)
                                available_days.push("fri");
                            if (description.satChecked == true)
                                available_days.push("sat");
                            if (description.sunChecked == true)
                                available_days.push("sun");
                        }

                        vouchers.push({
                            description: description.description,
                            total: description.amount,
                            voucher_number: (i + 1).toString(),
                            requirement: description.target,
                            available_time: '7:30-15:30',
                            available_days: available_days,
                        });
                    }

                    fields.vouchers = JSON.stringify(vouchers);
                    break;
                case 'score':
                    break;
            }

            promotionRemote.create(fields, function(data) {
                if (data.error == undefined) {
                    listPromotion();
                }
            }, function() {});

            function listPromotion() {
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
        }
    }

])