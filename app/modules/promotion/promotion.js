angular.module('promotion')

.controller('PromotionCtrl', ['$scope', '$routeParams', 'remoteFactory', 'dataFactory', 'userRemote', 'serviceHelper', 'promotionRemote',

    function($scope, $routeParams, remoteFactory, dataFactory, userRemote, serviceHelper, promotionRemote) {

        var brandId = $routeParams.brandId;
        dataFactory.getBrand(brandId, function(data) {
            $scope.brand = data;
        }, function() {});

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