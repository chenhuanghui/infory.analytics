angular.module('user')
    .controller('UserNotifyStep1Ctrl', ['$scope', '$routeParams', '$location', 'remoteFactory', 'dataFactory', 'userNotifyFactory', 'filterHelper', 'userRemote',
        function($scope, $routeParams, $location, remoteFactory, dataFactory, userNotifyFactory, filterHelper, userRemote) {

            var brandId = $routeParams.brandId;
            var path = $location.path().substring(0, 23);
            dataFactory.getBrand(brandId, function(data) {
                $scope.brand = data;
            }, function() {});


            var oldData = userNotifyFactory.getDataStep1();

            $scope.notifyTypes = [{
                id: 0,
                name: 'sms',
                name_display: 'Gửi qua SMS'

            }, {
                id: 1,
                name: 'email',
                name_display: 'Gửi qua email'
            }, {
                id: 2,
                name: 'in-app',
                name_display: 'Gửi qua ứng dụng'
            }];

            $scope.isCanGo = false;
            $scope.validation = [
                [true, true],
                [true, true, true],
                [true]
            ];

            $scope.isOk = [false, false, false];

            if (oldData != null) {
                $scope.isCanGo = oldData.isCanGo;
                $scope.validation = oldData.validation;
                $scope.notifyType = oldData.notifyType;
                $scope.isOk = oldData.isOk;
                $scope.sms_sender = oldData.sms_sender;
                $scope.sms_content = oldData.sms_content;
                $scope.email_title = oldData.email_title;
                $scope.email_content = oldData.email_content;
                $scope.email_sender = oldData.email_sender;
                $scope.in_app_content = oldData.in_app_content;
            } else
                $scope.notifyType = $scope.notifyTypes[0];

            $scope.updateValidation = function(id, idChange) {
                switch (id) {
                    case 0:
                        switch (idChange) {
                            case 0:
                                $scope.validation[id][idChange] = checkString($scope.sms_sender);
                                break;
                            case 1:
                                $scope.validation[id][idChange] = checkString($scope.sms_content);
                                break;
                        }
                        break;
                    case 1:
                        switch (idChange) {
                            case 0:
                                $scope.validation[id][idChange] = checkString($scope.email_title);
                                break;
                            case 1:
                                $scope.validation[id][idChange] = checkString($scope.email_sender);
                                break;
                            case 2:
                                $scope.validation[id][idChange] = checkString($scope.email_content);
                                break;
                        }
                        break;
                    case 2:
                        $scope.validation[id][idChange] = checkString($scope.in_app_content);
                        break;
                }

                $scope.isOk[id] = isOk(id);
                $scope.updateGoNext();

            }

            $scope.$watch('notifyType', function() {
                if ($scope.notifyType != null)
                    $scope.updateGoNext();
            });

            $scope.updateGoNext = function() {
                for (var i = 0; i < $scope.isOk.length; i++)
                    if ($scope.isOk[i] == true && $scope.notifyType.id == i) {
                        $scope.isCanGo = true;
                        return;
                    }
                $scope.isCanGo = false;
            }

            function checkString(string) {
                if (string == undefined || string == '')
                    return true;
                else
                    return false;
            }

            function isOk(id) {
                for (var i = 0; i < $scope.validation[id].length; i++) {
                    if ($scope.validation[id][i] == true)
                        return false;
                }
                return true;
            }

            $scope.goToStep2 = function() {
                userNotifyFactory.setDataStep1({
                    isCanGo: $scope.isCanGo,
                    isOk: $scope.isOk,
                    validation: $scope.validation,
                    notifyType: $scope.notifyType,
                    sms_sender: $scope.sms_sender,
                    sms_content: $scope.sms_content,
                    email_title: $scope.email_title,
                    email_content: $scope.email_content,
                    email_sender: $scope.email_sender,
                    in_app_content: $scope.in_app_content,
                });
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