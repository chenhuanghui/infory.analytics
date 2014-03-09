angular.module('promotion')

.controller('PromotionStep2Ctrl', ['$scope', '$routeParams', '$location', 'remoteFactory', 'dataFactory', 'userRemote', 'serviceHelper', 'promotionRemote', 'promotionFactory', 'serviceHelper',

    function($scope, $routeParams, $location, remoteFactory, dataFactory, userRemote, serviceHelper, promotionRemote, promotionFactory, serviceHelper) {

        var brandId = $routeParams.brandId;

        $scope.selectedShops = [];
        dataFactory.getBrand(brandId, function(data) {
            $scope.brand = data;
            for (var i = 0; i < $scope.brand.shops.length; i++) {
                $scope.brand.shops[i].selectedId = i;
                $scope.selectedShops.push(i == 0);
            }

        }, function() {});

        var intervalDate = serviceHelper.getIntervalDate();
        $scope.name = "";
        $scope.data = [{
            dateDropDownInput: intervalDate.date_beg,
            dateDisplay: serviceHelper.normalizeTime(intervalDate.date_beg),
        }, {
            dateDropDownInput: intervalDate.date_end,
            dateDisplay: serviceHelper.normalizeTime(intervalDate.date_end)
        }];

        updateTime();


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

        $scope.updateSelectedShops = function(isChecked) {
            if (isChecked == true)
                $scope.numOfSelectedShops++;
            else
                $scope.numOfSelectedShops--;
        }


        $scope.numOfSelectedShops = 0;
        for (var i = 0; i < $scope.selectedShops.length; i++) {
            if ($scope.selectedShops[i] == true)
                $scope.numOfSelectedShops++;
        }

        function updateTime() {
            $scope.time = $scope.data[0].dateDisplay + " đến " + $scope.data[1].dateDisplay;
        }

        $scope.onTimeSetOne = function(newDate, oldDate) {
            $scope.data[0].dateDisplay = serviceHelper.normalizeTime(newDate);
            updateTime();
        }

        $scope.onTimeSetTwo = function(newDate, oldDate) {
            $scope.data[1].dateDisplay = serviceHelper.normalizeTime(newDate);
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
    }
])