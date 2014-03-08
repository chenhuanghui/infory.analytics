angular.module('promotion')

.controller('PromotionCtrl', ['$scope', '$routeParams', '$location', 'remoteFactory', 'dataFactory', 'userRemote', 'serviceHelper', 'promotionRemote', 'promotionFactory', 'serviceHelper',

    function($scope, $routeParams, $location, remoteFactory, dataFactory, userRemote, serviceHelper, promotionRemote, promotionFactory, serviceHelper) {

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
                        shops: $scope.brand.shops,
                        name: $scope.name,
                        date_beg: $scope.data[0],
                        date_end: $scope.data[1],
                    });

                    $location.path('/brand/promotion/step3/' + brandId);
                }

                $scope.goToStep1 = function() {
                    promotionFactory.setDataStep2({
                        promotionType: $scope.promotionType,
                        selectedShops: $scope.selectedShops,
                        shops: $scope.brand.shops,
                        name: $scope.name,
                        date_beg: $scope.data[0],
                        date_end: $scope.data[1],
                    });
                    $location.path('/brand/promotion/step1/' + brandId);
                }
                break;

            case '/brand/promotion/step3':
                var step2Data = promotionFactory.getDataStep2();
                if (step2Data == null) {
                    $location.path('/brand/promotion/step2/' + brandId);
                    return;
                }

                $scope.isCanGoNext = false;

                var step3Data = promotionFactory.getDataStep3();
                $scope.promotionType = step2Data.promotionType;

                switch ($scope.promotionType.name) {
                    case 'voucher':
                        $scope.presentDescriptions = [];
                        $scope.indexInArray = [];
                        for (var i = 1; i < 1000; i++) {
                            $scope.indexInArray[i] = -1;
                        }

                        if (step3Data != null && step3Data.presentDescriptions != undefined) {
                            $scope.isCanGoNext = step3Data.isCanGoNext;
                            $scope.promotionType = step3Data.promotionType,
                            $scope.presentDescriptions = step3Data.presentDescriptions,
                            $scope.indexInArray = step3Data.indexInArray,
                            $scope.autoNum = autoNum

                            updateSTT();
                        }

                        $scope.removePresent = function(id) {
                            for (var i = $scope.presentDescriptions.length - 1; i >= 0; i--) {
                                if ($scope.presentDescriptions[i].id == id) {
                                    $scope.presentDescriptions.splice(i, 1);
                                    break;
                                }
                            }
                            updateSTT();
                        }

                        function updateSTT() {
                            for (var i = 0; i < $scope.presentDescriptions.length; i++) {
                                $scope.presentDescriptions[i].stt = i;
                                $scope.indexInArray[$scope.presentDescriptions[i].id] = i;
                            }
                        }

                        var autoNum = 0;
                        $scope.addPresent = function() {
                            $scope.presentDescriptions.push({
                                id: autoNum++,
                                stt: autoNum,
                                description: '',
                                amount: 1,
                                noLimitedChecked: false,
                                target: '',
                                monChecked: true,
                                tueChecked: false,
                                wedChecked: false,
                                thuChecked: false,
                                friChecked: false,
                                satChecked: false,
                                sunChecked: false,
                                allChecked: false,
                                validation: [true, false, false, true, false],
                                isOK: false,
                            });
                            updateSTT();
                            isCanGo();
                        }

                        if (step3Data == null || (step3Data != null && step3Data.presentDescriptions == undefined))
                            $scope.addPresent();

                        $scope.allCheck = function(id) {

                            var isChecked = $scope.presentDescriptions[$scope.indexInArray[id]].allChecked;

                            $scope.presentDescriptions[$scope.indexInArray[id]].monChecked = isChecked;
                            $scope.presentDescriptions[$scope.indexInArray[id]].tueChecked = isChecked;
                            $scope.presentDescriptions[$scope.indexInArray[id]].wedChecked = isChecked;
                            $scope.presentDescriptions[$scope.indexInArray[id]].thuChecked = isChecked;
                            $scope.presentDescriptions[$scope.indexInArray[id]].friChecked = isChecked;
                            $scope.presentDescriptions[$scope.indexInArray[id]].satChecked = isChecked;
                            $scope.presentDescriptions[$scope.indexInArray[id]].sunChecked = isChecked;

                            $scope.updateValidation(id, 4);

                        }

                        $scope.updateValidation = function(id, idChange) {
                            var index = $scope.indexInArray[id];
                            var formData = $scope.presentDescriptions[index];

                            switch (idChange) {
                                case 0:
                                    if (formData.description == undefined || formData.description == '')
                                        $scope.presentDescriptions[index].validation[0] = true;
                                    else
                                        $scope.presentDescriptions[index].validation[0] = false;
                                    break;
                                case 2:
                                    if (isNaN(formData.amount))
                                        $scope.presentDescriptions[index].validation[2] = true;
                                    else
                                        $scope.presentDescriptions[index].validation[2] = false;

                                    if (isNaN(formData.amount) == false && formData.amount == 0)
                                        $scope.presentDescriptions[index].validation[2] = true;
                                    break;
                                case 3:
                                    if (formData.target == undefined || formData.target == '')
                                        $scope.presentDescriptions[index].validation[3] = true;
                                    else
                                        $scope.presentDescriptions[index].validation[3] = false;
                                    break;
                                case 4:
                                    if (isOnDayIsChecked($scope.presentDescriptions[index]))
                                        $scope.presentDescriptions[index].validation[4] = false;
                                    else
                                        $scope.presentDescriptions[index].validation[4] = true;
                                    break;

                            }

                            if (isAGoodForm($scope.presentDescriptions[index].validation))
                                $scope.presentDescriptions[index].isOK = true;
                            else
                                $scope.presentDescriptions[index].isOK = false;
                            isCanGo();
                        }

                        function isCanGo() {
                            for (var i = 0; i < $scope.presentDescriptions.length; i++) {
                                if ($scope.presentDescriptions[i].isOK == false) {
                                    $scope.isCanGoNext = false;
                                    return;
                                }
                            }

                            $scope.isCanGoNext = true;
                        }

                        function isAGoodForm(validationArray) {
                            for (var i = 0; i < validationArray.length; i++) {
                                if (validationArray[i] == true)
                                    return false;
                            }

                            return true;
                        }

                        function isOnDayIsChecked(checkedArray) {
                            if (checkedArray.monChecked == true)
                                return true;
                            if (checkedArray.tueChecked == true)
                                return true;
                            if (checkedArray.wedChecked == true)
                                return true;
                            if (checkedArray.thuChecked == true)
                                return true;
                            if (checkedArray.friChecked == true)
                                return true;
                            if (checkedArray.satChecked == true)
                                return true;
                            if (checkedArray.sunChecked == true)
                                return true;
                            return false;
                        }

                        $scope.goToStep2 = function() {
                            saveInforTypeOne();
                            $location.path('/brand/promotion/step2/' + brandId);
                        }

                        $scope.goToStep4 = function() {
                            saveInforTypeOne();
                            $location.path('/brand/promotion/step4/' + brandId);
                        }

                        function saveInforTypeOne() {
                            promotionFactory.setDataStep3({
                                presentDescriptions: $scope.presentDescriptions,
                                isCanGoNext: $scope.isCanGoNext,
                                promotionType: $scope.promotionType,
                                indexInArray: $scope.indexInArray,
                                autoNum: $scope.autoNum
                            });
                        }
                        break;

                    case 'news':
                        $scope.validation = [true, false, true];
                        $scope.isCanGo = false;

                        if (step3Data != null && step3Data.validation != undefined) {
                            $scope.validation = step3Data.validation;
                            $scope.isCanGo = step3Data.isCanGo;
                            $scope.promotionType = step3Data.promotionType;
                            $scope.content = step3Data.content;
                            $scope.title = step3Data.title;
                        }

                        $scope.updateValidationNews = function(id) {
                            switch (id) {
                                case 0:
                                    if ($scope.title == undefined || $scope.title == '')
                                        $scope.validation[0] = true;
                                    else
                                        $scope.validation[0] = false;
                                    break;
                                case 1:
                                    break;
                                case 2:
                                    if ($scope.content == undefined || $scope.content == '')
                                        $scope.validation[2] = true;
                                    else
                                        $scope.validation[2] = false;
                                    break;
                            }

                            if (!$scope.validation[2] && !$scope.validation[0])
                                $scope.isCanGo = true;
                            else
                                $scope.isCanGo = false;
                        }

                        function saveInforTypeTwo() {
                            promotionFactory.setDataStep3({
                                validation: $scope.validation,
                                isCanGoNext: $scope.isCanGoNext,
                                promotionType: $scope.promotionType,
                                content: $scope.content,
                                title: $scope.title
                            });
                        }

                        $scope.goToStep4 = function() {
                            saveInforTypeTwo();
                            $location.path('/brand/promotion/step4/' + brandId);
                        }

                        $scope.goToStep2 = function() {
                            saveInforTypeTwo();
                            $location.path('/brand/promotion/step2/' + brandId);
                        }
                        break;
                }
                break;
            case '/brand/promotion/step4':

                var dataStep3 = promotionFactory.getDataStep3();
                var dataStep2 = promotionFactory.getDataStep2();
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
                    // date_beg: serviceHelper.normalizeTime(dataStep2.date_beg),
                    // date_end: serviceHelper.normalizeTime(dataStep2.date_end),
                    type: dataStep3.promotionType.name,
                }

                if (dataStep3 == null) {
                    $location.path('/brand/promotion/step3/' + brandId);
                    return;
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