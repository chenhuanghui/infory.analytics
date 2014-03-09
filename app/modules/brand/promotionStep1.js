angular.module('promotion')

.controller('PromotionStep1Ctrl', ['$scope', '$routeParams', '$location', 'remoteFactory', 'dataFactory', 'userRemote', 'serviceHelper', 'promotionRemote', 'promotionFactory', 'serviceHelper',

    function($scope, $routeParams, $location, remoteFactory, dataFactory, userRemote, serviceHelper, promotionRemote, promotionFactory, serviceHelper) {

        var brandId = $routeParams.brandId;
        var path = $location.path().substring(0, 22);
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



        var promotionType = promotionFactory.getData(0);

        if (promotionType != null) {
            for (var i = 0; i < $scope.promotionTypes.length; i++)
                if (promotionType.promotionType.name == $scope.promotionTypes[i].name)
                    $scope.promotionType = $scope.promotionTypes[i];
        } else
            $scope.promotionType = $scope.promotionTypes[0];

        $scope.goToStep2 = function() {
            promotionFactory.setData(0, {
                promotionType: $scope.promotionType
            });
            $location.path('/brand/promotion/step2/' + brandId);
        }
    }
])