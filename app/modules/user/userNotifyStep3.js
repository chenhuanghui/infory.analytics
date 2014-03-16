angular.module('user')
    .controller('UserNotifyStep3Ctrl', ['$scope', '$routeParams', '$location', 'remoteFactory', 'dataFactory', 'userNotifyFactory', 'filterHelper', 'userRemote', 'serviceHelper',
        function($scope, $routeParams, $location, remoteFactory, dataFactory, userNotifyFactory, filterHelper, userRemote, serviceHelper) {

            var brandId = $routeParams.brandId;
            var intervalDate = serviceHelper.getIntervalDate();

            dataFactory.updateBrandSideBar(brandId);
            dataFactory.getBrand(brandId, function(data) {
                $scope.brand = data;
            }, function() {});

            $scope.data = {
                dateDropDownInput: intervalDate.date_beg,
                dateDisplay: serviceHelper.normalizeTime(intervalDate.date_beg),
            };

            $scope.colorpicker = {
                red: 50,
                options: {
                    orientation: 'horizontal',
                    min: 0,
                    max: 255,
                    range: 'min'
                }
            };

            $scope.goToStep4 = function() {
                saveInfor();
                $location.path('/user/notify-new/step4/' + brandId);
            }
            $scope.goToStep2 = function() {
                saveInfor();
                $location.path('/user/notify-new/step2/' + brandId);
            }

            var step2Data = userNotifyFactory.getData(1, brandId);
            if (step2Data == null) {
                $scope.goToStep2();
                return;
            }
            var oldData = userNotifyFactory.getData(2, brandId);
            if (oldData != null) {
                $scope.data = oldData.data;
            }

            function saveInfor() {
                userNotifyFactory.setData(2, {
                    brand_id: brandId,
                    data: $scope.data
                });
            }

            $scope.onTimeSet = function(newDate, oldDate) {
                $scope.data.dateDisplay = serviceHelper.normalizeTimeWithMinute(newDate);
            }


        }
    ])