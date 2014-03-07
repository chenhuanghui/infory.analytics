angular.module('promotion')

.controller('PromotionCtrl', ['$scope', '$routeParams', '$location', 'remoteFactory', 'dataFactory', 'userRemote', 'serviceHelper', 'promotionRemote', 'promotionFactory',

    function($scope, $routeParams, $location, remoteFactory, dataFactory, userRemote, serviceHelper, promotionRemote, promotionFactory) {

        var brandId = $routeParams.brandId;
        var path = $location.path().substring(0, 22);

        $scope.selectedShops = [];
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

        $scope.name = "";
        $scope.time = '22-10-2013 00:00 đến 22-02-2014 00:00';
        $scope.data = [{
            dateDropDownInput: moment("2013-10-22T00:00:00.000").toDate(),
            dateDisplay: "22-10-2013 00:00",
        }, {
            dateDropDownInput: moment("2014-02-22T00:00:00.000").toDate(),
            dateDisplay: "22-02-2014 00:00",
        }];

        switch (path) {
            case '/brand/promotion/step1':

                var promotionType = promotionFactory.getDataStep1();

                if (promotionType != null) {
                    for (var i = 0; i < $scope.promotionTypes.length; i++)
                        if (promotionType.promotionType.name == $scope.promotionTypes[i].name)
                            $scope.promotionType = $scope.promotionTypes[i];
                } else
                    $scope.promotionType = $scope.promotionTypes[0];

                $scope.goToStep2 = function() {
                    promotionFactory.setDataStep1({
                        promotionType: $scope.promotionType
                    });
                    $location.path('/brand/promotion/step2/' + brandId);
                }

                break;

            case '/brand/promotion/step2':
                var promotionType = promotionFactory.getDataStep1();

                if (promotionType == null) {
                    $location.path('/brand/promotion/step1/' + brandId);
                    return;
                }

                var data = promotionFactory.getDataStep2();
                if (data != null) {
                    $scope.name = data.name;
                    $scope.data[0] = data.date_beg;
                    $scope.data[1] = data.date_end;
                    $scope.selectedShops = data.selectedShops;
                }

                $scope.promotionType = promotionType.promotionType;
                $scope.checkAllShops = false;

                $scope.updateSelectedShops = function() {
                    var num = 0;
                    for (var i = 0; i < $scope.brand.shops.length; i++) {
                        if ($scope.selectedShops[i] == true)
                            num++;
                        $scope.numOfSelectedShops = num;
                    }
                }

                $scope.updateSelectedShops();

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

                $scope.checkAll = function() {
                    for (var i = 0; i < $scope.brand.shops.length; i++)
                        $scope.selectedShops[i] = $scope.checkAllShops;

                    if ($scope.checkAllShops == true)
                        $scope.numOfSelectedShops = $scope.selectedShops.length;
                    else
                        $scope.numOfSelectedShops = 0;
                }

                $scope.goToStep3 = function() {
                    promotionFactory.setDataStep2({
                        promotionType: $scope.promotionType,
                        selectedShops: $scope.selectedShops,
                        shop: $scope.brand.shops,
                        name: $scope.name,
                        date_beg: $scope.data[0],
                        date_end: $scope.data[1],
                    });

                    $location.path('/brand/promotion/step3/' + brandId);
                }

                $scope.goToStep1 = function() {
                    $location.path('/brand/promotion/step1/' + brandId);
                }
                break;

            case '/brand/promotion/step3':
                // var step2Data = promotionFactory.getDataStep2();
                // if (step2Data == null) {
                //     $location.path('/brand/promotion/step2/' + brandId);
                //     return;
                // }

                $scope.promotionType = $scope.promotionTypes[2];
                $scope.presentDescriptions = [];

                $scope.removePresent = function(id) {
                    for (var i = $scope.presentDescriptions.length - 1; i >= 0; i--) {
                        if ($scope.presentDescriptions[i].id == id) {
                            $scope.presentDescriptions.splice(i, 1);
                            return;
                        }
                    }
                }

                $scope.addPresent = function() {
                    $scope.presentDescriptions.push({
                        id: $scope.presentDescriptions.length,
                        description: '',
                        amount: 0,
                        noLimitedChecked: false,
                        target: '',
                        monChecked: false,
                        tueChecked: false,
                        wedChecked: false,
                        thuChecked: false,
                        friChecked: false,
                        satChecked: false,
                        sunChecked: false,
                        allChecked: false
                    });
                }

                $scope.addPresent();

                $scope.allCheck = function(id) {
                    $scope.presentDescriptions[id].monChecked = true;
                    $scope.presentDescriptions[id].tueChecked = true;
                    $scope.presentDescriptions[id].tueChecked = true;
                    $scope.presentDescriptions[id].wedChecked = true;
                    $scope.presentDescriptions[id].thuChecked = true;
                    $scope.presentDescriptions[id].friChecked = true;
                    $scope.presentDescriptions[id].satChecked = true;
                    $scope.presentDescriptions[id].sunChecked = true;
                }

                $scope.goToStep2 = function() {
                    $location.path('/brand/promotion/step2/' + brandId);
                }

                $scope.goToStep4 = function() {
                    promotionFactory.setDataStep3({
                        presentDescriptions: $scope.presentDescriptions,
                    });
                    $location.path('/brand/promotion/step4/' + brandId);
                }

                break;
            case '/brand/promotion/step4':
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

                break;
        }
    }
])
    .config(function($routeProvider) {
        var access = routingConfig.accessLevels;

        $routeProvider
            .when('/brand/promotion/step1/:brandId', {
                templateUrl: 'modules/brand/promotion/promotion_new_step_1.html',
                controller: 'PromotionCtrl',
                access: access.user
            })
            .when('/brand/promotion/step2/:brandId', {
                templateUrl: 'modules/brand/promotion/promotion_new_step_2.html',
                controller: 'PromotionCtrl',
                access: access.user
            })
            .when('/brand/promotion/step3/:brandId', {
                templateUrl: 'modules/brand/promotion/promotion_new_step_3.html',
                controller: 'PromotionCtrl',
                access: access.user
            })
            .when('/brand/promotion/step4/:brandId', {
                templateUrl: 'modules/brand/promotion/promotion_new_step_4.html',
                controller: 'PromotionCtrl',
                access: access.user
            })
    });