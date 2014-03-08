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