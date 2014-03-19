angular.module('promotion')

.controller('PromotionStep4Ctrl', ['$scope', '$routeParams', '$location', 'remoteFactory', 'dataFactory', 'userRemote', 'serviceHelper', 'promotionRemote', 'promotionFactory', 'serviceHelper', 'dialogHelper',

    function($scope, $routeParams, $location, remoteFactory, dataFactory, userRemote, serviceHelper, promotionRemote, promotionFactory, serviceHelper, dialogHelper) {

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
            name: 'voucher',
            name_display: 'Khuyến mãi'
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
                            available_time: '0:00-23:59',
                            available_days: available_days,
                        });
                    }

                    fields.vouchers = JSON.stringify(vouchers);
                    break;
                case 'score':
                    break;
            }

            promotionRemote.create(fields, function(data) {
                if (data.error != undefined)
                    dialogHelper.showError('Quá trình tạo chiến dịch có lỗi: ' + data.error.message);

                listPromotion();

            }, function() {});


            function listPromotion() {
                $scope.statusTypes = [{
                    name: '',
                    name_display: 'Trạng thái'
                }, {
                    name: 'running',
                    name_display: 'Đang chạy'
                }, {
                    name: 'stopped',
                    name_display: 'Đã dừng'
                }, {
                    name: 'waiting',
                    name_display: 'Chờ duyệt'
                }];

                $scope.statusType = $scope.statusTypes[0];

                $scope.changeStatus = function(id) {
                    var status = $scope.promotionListFull[id].status;
                    var nextStatus = '';
                    switch (status) {
                        case 'running':
                            $scope.promotionListFull[id].statusClass = 'btn-flat inverse';
                            $scope.promotionListFull[id].status = 'stopped';
                            $scope.promotionListFull[id].statusName = 'Đã dừng';
                            nextStatus = 'stopped';
                            break;
                        case 'waiting':
                            return;
                        case 'stopped':
                            $scope.promotionListFull[id].statusClass = 'btn-flat success';
                            $scope.promotionListFull[id].status = 'running';
                            $scope.promotionListFull[id].statusName = 'Đang chạy';
                            nextStatus = 'running';
                            break;
                    }

                    promotionRemote.update({
                        promotion_id: $scope.promotionListFull[id].id,
                        status: nextStatus
                    }, function(data) {
                        if (data.error == undefined) {

                        } else {
                            dialogHelper.showError(data.error.message);
                            $scope.promotionListFull[id].status = status;
                            if ($scope.promotionListFull[id].status == 'running') {
                                $scope.promotionListFull[id].statusClass = 'btn-flat success';
                                $scope.promotionListFull[id].statusName = 'Đang chạy';
                            } else {
                                $scope.promotionListFull[id].statusClass = 'btn-flat inverse';
                                $scope.promotionListFull[id].statusName = 'Đã dừng';
                            }
                        }
                    }, function() {});
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

                $scope.sortPromotionListByStatus = function() {
                    var status = $scope.statusType.name;
                    if ($scope.statusType.name == '')
                        $scope.promotionList = $scope.promotionListFull;
                    else
                        $scope.promotionList = [];

                    for (var i = 0; i < $scope.promotionListFull.length; i++) {
                        if ($scope.promotionListFull[i].status == status)
                            $scope.promotionList.push($scope.promotionListFull[i]);
                    }
                }

                var fields = '["id, "type", "name", "status"]';
                promotionRemote.list({
                    brand_id: brandId,
                    fields: fields
                }, function(data) {
                    if (data.error == undefined) {
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
                            data[i].index = i;

                            switch (data[i].status) {
                                case 'running':
                                    data[i].statusClass = 'btn-flat success';
                                    data[i].statusName = 'Đang chạy';
                                    break;
                                case 'waiting':
                                    data[i].statusClass = 'btn-flat gray';
                                    data[i].statusName = 'Chờ duyệt';
                                    break;
                                case 'stopped':
                                    data[i].statusClass = 'btn-flat inverse';
                                    data[i].statusName = 'Đã dừng';
                                    break;
                            }
                            data[i].time = serviceHelper.normalizeTimeWithMinute(new Date(data[i].date_beg)) + " đến " + serviceHelper.normalizeTimeWithMinute(new Date(data[i].date_end));
                        }

                        $scope.promotionList = data;
                        $scope.promotionListFull = data;
                    } else {
                        $scope.promotionList = [];
                        $scope.promotionListFull = [];
                        dialogHelper.showError(data.error.message);
                    }
                }, function() {});
            }
        }

        for (var i = 0; i < 3; i++)
            promotionFactory.setData(i, {
                brand_id: -1
            });
    }

])