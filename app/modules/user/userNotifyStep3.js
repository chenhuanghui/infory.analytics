angular.module('user')
    .controller('UserNotifyStep3Ctrl', ['$scope', '$routeParams', '$location', 'remoteFactory', 'dataFactory', 'userNotifyFactory', 'filterHelper', 'userRemote', 'serviceHelper',
        function($scope, $routeParams, $location, remoteFactory, dataFactory, userNotifyFactory, filterHelper, userRemote, serviceHelper) {

            var brandId = $routeParams.brandId;
            var path = $location.path().substring(0, 23);
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

.config(function($routeProvider) {
    var access = routingConfig.accessLevels;

    $routeProvider
        .when('/user', {
            templateUrl: 'modules/user/template/user_list.html',
            controller: 'UserCtrl',
            access: access.user
        })
        .when('/user/new', {
            templateUrl: 'modules/user/template/new_user.html',
            controller: 'UserCtrl',
            access: access.user
        })
        .when('/user/manager/:brandId', {
            templateUrl: 'modules/user/template/user_manager.html',
            controller: 'UserManagerCtrl',
            access: access.user
        })
        .when('/user/notify-new/step1/:brandId', {
            templateUrl: 'modules/user/template/user_notify_new_step_1.html',
            controller: 'UserNotifyStep1Ctrl',
            access: access.user
        })
        .when('/user/notify-new/step2/:brandId', {
            templateUrl: 'modules/user/template/user_notify_new_step_2.html',
            controller: 'UserNotifyStep2Ctrl',
            access: access.user
        })
        .when('/user/notify-new/step3/:brandId', {
            templateUrl: 'modules/user/template/user_notify_new_step_3.html',
            controller: 'UserNotifyStep3Ctrl',
            access: access.user
        })
        .when('/user/notify-new/step4/:brandId', {
            templateUrl: 'modules/user/template/user_notify_new_step_4.html',
            controller: 'UserNotifyStep4Ctrl',
            access: access.user
        })
});