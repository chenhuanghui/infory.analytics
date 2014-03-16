angular.module('user')

.controller('UserCtrl', ['$scope', '$location', '$routeParams', 'remoteFactory', 'dataFactory', 'userRemote',

    function($scope, $location, $routeParams, remoteFactory, dataFactory, userRemote) {
        $scope.activeTab = "user";
        $scope.cssLink = "user-profile.css";
        var user_pre = dataFactory.getUsernameAvatar();

        $scope.username = user_pre.username;
        $scope.avatar = user_pre.avatar;
        $scope.brandId = $routeParams.brandId;
        dataFactory.updateBrandSideBar($scope.brandId);
        $scope.userId = $routeParams.userId;

        $scope.oldUrl = dataFactory.getUrl();
        $scope.goBack = function() {
            if ($scope.oldUrl != '') {
                $location.path($scope.oldUrl);
            }
        }

        dataFactory.getUserProfile($scope.brandId, $scope.userId, function(userProfile) {
                $scope.userProfile = userProfile;
                $scope.username = userProfile.name;
                $scope.avatar = userProfile.avatar;

                // REVIEW API - timeline group by day - it's not client job

                for (var i = 0; i < userProfile.timeline.length; i++) {
                    var time = new Date(userProfile.timeline[i].time);
                    var dayOfWeek = time.getDay();
                    switch (dayOfWeek) {
                        case 0:
                            dayOfWeek = 'Chủ nhật';
                            break;
                        case 1:
                            dayOfWeek = 'Thứ 2';
                            break;
                        case 2:
                            dayOfWeek = 'Thứ 3';
                            break;
                        case 3:
                            dayOfWeek = 'Thứ 4';
                            break;
                        case 4:
                            dayOfWeek = 'Thứ 5';
                            break;
                        case 5:
                            dayOfWeek = 'Thứ 6';
                            break;
                        case 6:
                            dayOfWeek = 'Thứ 7';
                            break;
                    };

                    var date = time.getDate();
                    var month = time.getMonth() + 1;
                    var year = time.getFullYear();
                    var minute = time.getMinutes();
                    var hour = time.getHours();

                    var time_str = dayOfWeek + ' ' + (date <= 9 ? '0' + date : date) + '-' + (month <= 9 ? '0' + month : month) + '-' + year;

                    userProfile.timeline[i].time_str = time_str;
                    userProfile.timeline[i].hour = (hour <= 9 ? '0' + hour : hour) + ' : ' + (minute <= 9 ? '0' + minute : minute);
                }

                $scope.activities = _
                    .chain(userProfile.timeline)
                    .groupBy('time_str')
                    .map(function(value, key) {
                        return {
                            time_str: key,
                            hour: _.pluck(value, 'hour'),
                            name: _.pluck(value, 'name')
                        }
                    })
                    .value();



                for (var i = 0; i < $scope.activities.length; i++) {
                    $scope.activities[i].infor = [];
                    for (var j = 0; j < $scope.activities[i].name.length; j++) {
                        $scope.activities[i].infor.push({
                            hour: $scope.activities[i].hour[j],
                            name: $scope.activities[i].name[j]
                        });
                    }
                }

                if (userProfile.email == null)
                    userProfile.email = "Không xác định";

                if (userProfile.gender == 'male')
                    userProfile.gender = 'Nam';
                else
                    userProfile.gender = 'Nữ';

                if (userProfile.city == null)
                    userProfile.city = "Không xác định";

                if (userProfile.facebook[0] != 'h')
                    userProfile.facebook = 'http://facebook.com/' + userProfile.facebook;

                if (userProfile.dob != null)
                    userProfile.age = new Date().getFullYear() - new Date(userProfile.dob).getFullYear();
                else
                    userProfile.age = "Không xác định";

            },
            function() {});
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
        .when('/user/manager/:brandId', {
            templateUrl: 'modules/user/template/user_manager.html',
            controller: 'UserManagerCtrl',
            access: access.user
        })
        .when('/user/new', {
            templateUrl: 'modules/user/template/new_user.html',
            controller: 'UserCtrl',
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
        .when('/user/:brandId/:userId', {
            templateUrl: 'modules/user/template/user_profile.html',
            controller: 'UserCtrl',
            access: access.user
        })
});