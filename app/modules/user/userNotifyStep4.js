angular.module('user')
    .controller('UserNotifyStep4Ctrl', ['$scope', '$routeParams', '$location', 'remoteFactory', 'dataFactory', 'userNotifyFactory', 'filterHelper', 'userRemote',
        function($scope, $routeParams, $location, remoteFactory, dataFactory, userNotifyFactory, filterHelper, userRemote) {

            var brandId = $routeParams.brandId;

            dataFactory.getBrand(brandId, function(data) {
                $scope.brand = data;
            }, function() {});

            $scope.goToStep3 = function() {
                $location.path('/user/notify-new/step3/' + brandId);
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
        }


    ])