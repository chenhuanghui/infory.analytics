angular.module('user')

.controller('UserCtrl', ['$scope', '$routeParams', 'remoteFactory', 'dataFactory', 'userRemote',

    function($scope, $routeParams, remoteFactory, dataFactory, userRemote) {
        $scope.activeTab = "user";
        $scope.cssLink = "user-profile.css";
        var user_pre = dataFactory.getUsernameAvatar();

        $scope.username = user_pre.username;
        $scope.avatar = user_pre.avatar;
        $scope.brandId = $routeParams.brandId;
        $scope.userId = $routeParams.userId;

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

.controller('UserManagerCtrl', ['$scope', '$routeParams', 'dataFactory', 'remoteFactory', 'filterHelper', 'userRemote',
    function($scope, $routeParams, dataFactory, remoteFactory, filterHelper, userRemote) {
        var brandId = $routeParams.brandId;

        $scope.metas = remoteFactory.meta_property_types;
        $scope.event = remoteFactory.meta_profile;
        $scope.events = remoteFactory.meta_events;
        $scope.metadata = remoteFactory.meta_lists;

        $scope.subfilters = null;
        $scope.userList = dataFactory.getCurrentResultUserFilter();

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

                    dataFactory.setCurrentResultUserFilter($scope.userList);
                }

            }, function() {});
        }

    }
])

.controller('UserNotifyCtrl', ['$scope', '$routeParams', '$location', 'remoteFactory', 'dataFactory', 'userNotifyFactory',
    function($scope, $routeParams, $location, remoteFactory, dataFactory, userNotifyFactory) {

        var brandId = $routeParams.brandId;
        var path = $location.path().substring(0, 23);
        dataFactory.getBrand(brandId, function(data) {
            $scope.brand = data;
        }, function() {});

        switch (path) {
            case '/user/notify-new/step1/':
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
                break;

            case '/user/notify-new/step2/':
                $scope.goToStep3 = function() {
                    $location.path('/user/notify-new/step3/' + brandId);
                }
                $scope.goToStep1 = function() {
                    $location.path('/user/notify-new/step1/' + brandId);
                }
                break;

            case '/user/notify-new/step3/':
                $scope.goToStep4 = function() {
                    $location.path('/user/notify-new/step2/' + brandId);
                }
                $scope.goToStep2 = function() {
                    $location.path('/user/notify-new/step2/' + brandId);
                }
                break;

            case '/user/notify-new/step4/':
                break;
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
        $scope.metas = remoteFactory.meta_property_types;
        $scope.events = remoteFactory.meta_events;
        $scope.metadata = remoteFactory.meta_lists;
        $scope.subfilters = [];


        $scope.data = {
            dateDropDownInput: moment("2013-01-22T00:00:00.000").toDate(),
            dateDisplay: "22-01-2013 00:00"
        };

        $scope.onTimeSet = function(newDate, oldDate) {
            var d = newDate.getDate();
            var m = newDate.getMonth() + 1;
            var y = newDate.getFullYear();
            var h = newDate.getHours();
            var min = newDate.getMinutes();

            $scope.data.dateDisplay = '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y + '   ' +
                (h <= 9 ? '0' + h : h) + ' : ' + (min <= 9 ? '0' + min : min);
        }
    }


])

.config(function($routeProvider) {
    var access = routingConfig.accessLevels;

    $routeProvider
        .when('/user', {
            templateUrl: 'modules/user/user_list.html',
            controller: 'UserCtrl',
            access: access.user
        })
        .when('/user/new', {
            templateUrl: 'modules/user/new_user.html',
            controller: 'UserCtrl',
            access: access.user
        })
        .when('/user/manager/:brandId', {
            templateUrl: 'modules/user/user_manager.html',
            controller: 'UserManagerCtrl',
            access: access.user
        })
        .when('/user/notify-new/step1/:brandId', {
            templateUrl: 'modules/user/user_notify_new_step_1.html',
            controller: 'UserNotifyCtrl',
            access: access.user
        })
        .when('/user/notify-new/step2/:brandId', {
            templateUrl: 'modules/user/user_notify_new_step_2.html',
            controller: 'UserNotifyCtrl',
            access: access.user
        })
        .when('/user/notify-new/step3/:brandId', {
            templateUrl: 'modules/user/user_notify_new_step_3.html',
            controller: 'UserNotifyCtrl',
            access: access.user
        })
        .when('/user/notify-new/step4/:brandId', {
            templateUrl: 'modules/user/user_notify_new_step_4.html',
            controller: 'UserNotifyCtrl',
            access: access.user
        })
});