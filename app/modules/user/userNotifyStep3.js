angular.module('user')
    .controller('UserNotifyStep3Ctrl', ['$scope', '$routeParams', '$location', 'remoteFactory', 'dataFactory', 'userNotifyFactory', 'filterHelper', 'userRemote', 'serviceHelper',
        function($scope, $routeParams, $location, remoteFactory, dataFactory, userNotifyFactory, filterHelper, userRemote, serviceHelper) {

            var brandId = $routeParams.brandId;

            dataFactory.getBrand(brandId, function(data) {
                $scope.brand = data;
            }, function() {});

            var intervalDate = serviceHelper.getIntervalDate();
            $scope.data = {
                dateDropDownInput: intervalDate.date_beg,
                dateDisplay: serviceHelper.normalizeTime(intervalDate.date_beg),
            };

            $scope.onTimeSet = function(newDate, oldDate) {
                $scope.data.dateDisplay = serviceHelper.normalizeTimeWithMinute(newDate);
            }

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
                $location.path('/user/notify-new/step4/' + brandId);
            }
            $scope.goToStep2 = function() {
                $location.path('/user/notify-new/step2/' + brandId);
            }
        }
    ])