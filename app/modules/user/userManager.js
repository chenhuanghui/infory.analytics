angular.module('user')
    .controller('UserManagerCtrl', ['$scope', '$location', '$routeParams', '$window', 'dataFactory', 'remoteFactory', 'filterHelper', 'userRemote', 'bookmarkRemote', 'userManagerFactory', 'dialogHelper',
        function($scope, $location, $routeParams, $window, dataFactory, remoteFactory, filterHelper, userRemote, bookmarkRemote, userManagerFactory, dialogHelper) {
            var brandId = $routeParams.brandId;
            dataFactory.updateBrandSideBar(brandId);
            $scope.metas = remoteFactory.meta_property_types;
            $scope.event = remoteFactory.meta_profile;
            $scope.events = remoteFactory.meta_events;
            $scope.metadata = remoteFactory.meta_lists;

            $scope.checkList = [];
            $scope.checkAll = false;
            $scope.userList = [];

            userRemote.filter({
                brand_id: brandId,
                filter: '',
                fields: '["id", "name", "dob", "gender", "city", "last_visit", "phone"]',
                brand_id: brandId,
                page: 0,
                page_size: 10000
            }, function(data) {
                if (data.error == undefined) {
                    if ($scope.userList.length == 0) {
                        $scope.userList = data.data;
                        normalizeUser();
                        $scope.saveInfor();
                    }
                } else
                    dialogHelper.showError(data.error.message);
            }, function() {});

            var oldData = userManagerFactory.getData(brandId);
            if (oldData != null) {
                $scope.userList = oldData.userList;
                $scope.checkList = oldData.checkList;
                $scope.checkAll = oldData.checkAll;
                $scope.oldsubfilters = oldData.oldsubfilters;
            } else
                $scope.oldsubfilters = [];

            $scope.checkAllUser = function() {
                var isChecked = $scope.checkAll;
                for (var i = 0; i < $scope.checkList.length; i++)
                    $scope.checkList[i] = isChecked;
            }

            $scope.saveInfor = function() {
                var saveSubfilters = [];
                var size = $scope.subfilters.length;

                for (var i = 0; i < size; i++) {
                    saveSubfilters.push($scope.subfilters[i].getValue());
                }

                userManagerFactory.setData({
                    brand_id: brandId,
                    checkList: $scope.checkList,
                    userList: $scope.userList,
                    checkAll: $scope.checkAll,
                    oldsubfilters: saveSubfilters
                })
            }

            $scope.bookmark = function() {
                var query = buildQuery();
                var fields = {
                    bookmark_name: 'user profile',
                    brand_id: brandId,
                    filter: query.filter
                }

                bookmarkRemote.profileCreate(fields, function(data) {
                    if (data.error == undefined)
                        dialogHelper.showError('Lưu profile người dùng thành công');
                    else
                        dialogHelper.showError(data.error.message);
                }, function() {});
            }

            function buildQuery() {
                var query = filterHelper.buildQuery($scope.subfilters);

                var fields = {
                    filter: JSON.stringify(query),
                    fields: '["id", "name", "dob", "gender", "city", "last_visit", "phone"]',
                    brand_id: brandId,
                    page: 0,
                    page_size: 10000
                };
                return fields;
            }

            $scope.showUserProfile = function(userId) {
                dataFactory.setUrl($location.path());
                $location.path('/user/' + brandId + '/' + userId);
                //$window.open('/user/' + brandId + '/' + userId);
            }

            function normalizeUser() {
                for (var i = 0; i < $scope.userList.length; i++) {

                    var user = $scope.userList[i];
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

                    user.stt = i;
                    $scope.checkList.push(false);
                }
            }

            $scope.getResult = function() {
                userRemote.filter(buildQuery(), function(data) {
                    $scope.checkList = [];
                    if (data.error == undefined) {
                        $scope.userList = data.data;
                        normalizeUser();
                        $scope.saveInfor();
                    } else
                        dialogHelper.showError(data.error.message);

                }, function() {});
            }

        }
    ])