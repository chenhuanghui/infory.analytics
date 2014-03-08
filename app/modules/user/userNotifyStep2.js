angular.module('user')
    .controller('UserNotifyStep2Ctrl', ['$scope', '$routeParams', '$location', 'remoteFactory', 'dataFactory', 'userNotifyFactory', 'filterHelper', 'userRemote', 'serviceHelper',
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


            $scope.metas = remoteFactory.meta_property_types;
            $scope.event = remoteFactory.meta_profile;
            $scope.events = remoteFactory.meta_profile;
            $scope.metadata = remoteFactory.meta_lists;
            $scope.subfilters = [];

            $scope.userList = userNotifyFactory.getCurrentResultUserFilter();

            $scope.getResult = function() {
                var query = filterHelper.buildQuery($scope.subfilters);

                var fields = {
                    filter: JSON.stringify(query),
                    fields: '["name", "dob", "gender", "city", "last_visit"]',
                    brand_id: brandId,
                    page: 0,
                    page_size: 10000
                };

                userRemote.filter(fields, function(data) {
                    if (data.error == undefined) {
                        $scope.userList = data.data;

                        for (var i = 0; i < $scope.userList.length; i++) {

                            var user = $scope.userList[i];
                            if (user.email == null)
                                user.email = "Không xác định";

                            if (user.gender == 'male')
                                user.gender = 'Nam';
                            else
                                user.gender = 'Nữ';

                            if (user.city == null)
                                user.city = "Không xác định";

                            if (user.dob != null)
                                user.dob = new Date(user.dob).getFullYear();
                            else
                                user.dob = "Không xác định";
                        }

                        userNotifyFactory.setCurrentResultUserFilter($scope.userList);
                    }

                }, function() {});
            }

            $scope.goToStep3 = function() {
                $location.path('/user/notify-new/step3/' + brandId);
            }
            $scope.goToStep1 = function() {
                $location.path('/user/notify-new/step1/' + brandId);
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