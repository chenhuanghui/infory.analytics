angular.module('user')
    .controller('UserNotifyStep2Ctrl', ['$scope', '$routeParams', '$location', 'remoteFactory', 'dataFactory', 'userNotifyFactory', 'filterHelper', 'userRemote', 'serviceHelper', 'bookmarkRemote', 'queryHelper', 'dialogHelper', 'accountRemote',
        function($scope, $routeParams, $location, remoteFactory, dataFactory, userNotifyFactory, filterHelper, userRemote, serviceHelper, bookmarkRemote, queryHelper, dialogHelper, accountRemote) {

            var brandId = $routeParams.brandId;
            dataFactory.updateBrandSideBar(brandId);

            dataFactory.getBrand(brandId, function(data) {
                $scope.brand = data;
            }, function() {});

            $scope.metas = remoteFactory.meta_property_types;
            $scope.event = remoteFactory.meta_profile;
            $scope.metadata = remoteFactory.meta_lists;
            $scope.subfilters = [];
            $scope.all = false;
            $scope.numOfSelectedUsers = 0;
            $scope.isChecked = [];
            $scope.oldsubfilters = [];
            $scope.isCanGo = true;
            $scope.balance = null;

            var fields = '["balance"]';
            accountRemote.get(fields, function(data) {
                if (data.balance == null)
                    $scope.balance = 0;
                else
                    $scope.balance = data.balance;

                orignalAccount = data;
            }, function() {});

            $scope.sendMethods = [{
                name: 'once',
                name_display: 'Gửi một lần'
            }, {
                name: 'auto',
                name_display: 'Gửi tự động'
            }];

            $scope.sendMethod = $scope.sendMethods[0];

            $scope.goToStep3 = function() {
                saveInfor();
                if ($scope.sendMethod.name == 'once') {
                    if ($scope.numOfSelectedUsers * 10 > $scope.balance) {
                        dialogHelper.showError('Số dư tài khoản của bạn là ' + $scope.balance + ' T-Coin không đủ thực hiện thao tác này');
                        return;
                    } else
                        $location.path('/user/notify-new/step4/' + brandId);

                } else
                    $location.path('/user/notify-new/step3/' + brandId);
            }
            $scope.goToStep1 = function() {
                saveInfor();
                $location.path('/user/notify-new/step1/' + brandId);
            }

            $scope.showUserProfile = function(userId) {
                dataFactory.setUrl($location.path());
                $location.path('/user/' + brandId + '/' + userId);
            }

            var step1Data = userNotifyFactory.getData(0, brandId);
            if (step1Data == null) {
                $scope.goToStep1();
                return;
            }

            var oldData = userNotifyFactory.getData(1, brandId);
            if (oldData != null) {
                $scope.userList = oldData.userList;
                $scope.all = oldData.all;
                $scope.isChecked = oldData.isChecked;
                $scope.numOfSelectedUsers = oldData.numOfSelectedUsers;
                $scope.oldsubfilters = oldData.oldsubfilters;
                $scope.isCanGo = oldData.isCanGo;

                for (var i = 0; i < $scope.sendMethods.length; i++)
                    if ($scope.sendMethods[i].name == oldData.sendMethod.name) {
                        $scope.sendMethod = $scope.sendMethods[i];
                        break;
                    }

            } else {

                // dataFactory.getBookmarks(brandId, function(data) {
                //         data.bookmarks.profiles_bookmarks.unshift({
                //             bookmark_name: 'Chọn bộ lọc đã lưu',
                //             id: -1
                //         });

                //         $scope.profileBookmarks = data.bookmarks.profiles_bookmarks;
                //         $scope.profileBookmark = data.bookmarks.profiles_bookmarks[0];

                //         saveInfor();

                //     },
                //     function() {});
            }

            $scope.updateIsCanGo = function() {
                if ($scope.sendMethod.name == "once" && $scope.numOfSelectedUsers == 0)
                    $scope.isCanGo = false;
                else
                    $scope.isCanGo = true;
            }

            $scope.updateIsCanGo();

            function saveInfor() {
                var query = filterHelper.buildQuery($scope.subfilters);
                var saveSubfilters = [];
                var size = $scope.subfilters.length;

                for (var i = 0; i < size; i++) {
                    saveSubfilters.push($scope.subfilters[i].getValue());
                }

                userNotifyFactory.setData(1, {
                    brand_id: brandId,
                    userList: $scope.userList,
                    oldsubfilters: saveSubfilters,
                    all: $scope.all,
                    numOfSelectedUsers: $scope.numOfSelectedUsers,
                    isChecked: $scope.isChecked,
                    profileBookmark: $scope.profileBookmark,
                    profileBookmarks: $scope.profileBookmarks,
                    sendMethod: $scope.sendMethod,
                    filter: JSON.stringify(query),
                    isCanGo: $scope.isCanGo
                });
            }

            $scope.createProfile = function(name) {
                if (name == '')
                    return;

                var query = filterHelper.buildQuery($scope.subfilters);
                var fields = {
                    filter: JSON.stringify(query),
                    brand_id: brandId,
                    bookmark_name: name
                };

                bookmarkRemote.profileCreate(fields, function(data) {
                    if (data.error == undefined) {
                        // var bookmark = {
                        //     bookmark_name: name,
                        //     id: data.bookmark_id,
                        //     brand_id: brandId,
                        //     event: fields.event,
                        //     filter: fields.filter,
                        //     compare_by: fields.compare_by,
                        //     time_unit: fields.time_unit
                        // }

                        // $scope.eventBookmarks.push(bookmark);
                        // $scope.changeEventBookmark(bookmark.id);

                        // dataFactory.setEventBookmarks(brandId, $scope.eventBookmarks);
                        // homeFactory.addEventBookmark(brandId, fields);
                        // saveInfor();
                    }

                }, function() {});
            }

            $scope.changeProfileBookmark = function(id) {
                for (var i = 0; i < $scope.profileBookmarks.length; i++) {
                    if ($scope.profileBookmarks[i].id == id) {

                        $scope.profileBookmark = $scope.profileBookmarks[i];
                        $scope.profileBookmark.event = $scope.event;
                        $scope.oldsubfilters = queryHelper.decode($scope.profileBookmark);

                        saveInfor();
                        return;
                    }
                }
            }

            $scope.getResult = function() {
                var query = filterHelper.buildQuery($scope.subfilters);

                var fields = {
                    filter: JSON.stringify(query),
                    fields: '["id", "name", "dob", "gender", "city", "last_visit", "phone"]',
                    brand_id: brandId,
                    page: 0,
                    page_size: 10000
                };

                userRemote.filter(fields, function(data) {
                    if (data.error == undefined) {
                        $scope.userList = data.data;
                        $scope.isChecked = [];

                        for (var i = 0; i < $scope.userList.length; i++) {

                            var user = $scope.userList[i];
                            user.stt = i;

                            if (user.phone == '' || user.phone == null)
                                user.phone = '-';

                            if (user.email == null)
                                user.email = " - ";

                            if (user.gender == 'male')
                                user.gender = 'Nam';
                            else
                                user.gender = 'Nữ';

                            if (user.city == null)
                                user.city = " - ";

                            if (user.dob != null)
                                user.dob = new Date().getFullYear() - new Date(user.dob).getFullYear();
                            else
                                user.dob = " - ";

                            $scope.isChecked.push(false);

                        }

                        saveInfor();
                    } else
                        dialogHelper.showError(data.error.message);

                }, function() {});
            }

            $scope.updateSelectedUsers = function(isChecked) {
                if (isChecked)
                    $scope.numOfSelectedUsers++;
                else
                    $scope.numOfSelectedUsers--;

                saveInfor();
            }

            $scope.checkAll = function() {
                var isChecked = $scope.all;

                for (var i = 0; i < $scope.isChecked.length; i++)
                    $scope.isChecked[i] = isChecked;

                if (isChecked)
                    $scope.numOfSelectedUsers = $scope.isChecked.length;
                else
                    $scope.numOfSelectedUsers = 0;

                saveInfor();
            }
        }

    ])