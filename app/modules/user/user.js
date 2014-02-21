angular.module('user')

.controller('userCtrl', ['$scope', '$routeParams', 'remoteFactory', 'dataFactory',

    function($scope, $routeParams, remoteFactory, dataFactory) {
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
                    var hour = time.getHours();

                    var time_str = dayOfWeek + ' ' + (date <= 9 ? '0' + date : date) + '-' + (month <= 9 ? '0' + month : month) + '-' + year;

                    userProfile.timeline[i].time_str = time_str;
                    userProfile.timeline[i].hour = hour + ' giờ';
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

                var test = k;

            },
            function() {});
    }
])

.config(function($routeProvider) {
    $routeProvider
        .when('/user', {
            templateUrl: 'modules/user/user_list.html',
            controller: 'userCtrl'
        })
        .when('/user/new', {
            templateUrl: 'modules/user/new_user.html',
            controller: 'userCtrl'
        })
        .when('/user/manager', {
            templateUrl: 'modules/user/user_manager.html',
            controller: 'userCtrl'
        })
        .when('/user/notify-new', {
            templateUrl: 'modules/user/user_notify_new.html',
            controller: 'userCtrl'
        })
        .when('/user/:brandId/:userId', {
            templateUrl: 'modules/user/user_profile.html',
            controller: 'userCtrl'
        })
});