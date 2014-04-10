angular.module('user')
    .controller('UserManagerCtrl', ['$scope', '$location', '$routeParams', '$window', '$filter', 'dataFactory', 'remoteFactory', 'filterHelper', 'userRemote', 'bookmarkRemote', 'userManagerFactory', 'dialogHelper',
        function($scope, $location, $routeParams, $window, $filter, dataFactory, remoteFactory, filterHelper, userRemote, bookmarkRemote, userManagerFactory, dialogHelper) {
            /** Global variables **/
            var brandId = $routeParams.brandId,
                oldData = userManagerFactory.getData(brandId);

            /** Scope variables **/
            $scope.metas = remoteFactory.meta_property_types;
            $scope.event = remoteFactory.meta_profile;
            $scope.events = remoteFactory.meta_events;
            $scope.metadata = remoteFactory.meta_lists;

            $scope.checkList = [];
            $scope.checkAll = false;
            $scope.userList = [];
            $scope.hideLoading = false;
            $scope.subfilters = [];

            $scope.totalItems = 0;
            $scope.dataInCurrentPage = [];
            $scope.filteredUsers = [];
            /** Logic **/
            $scope.pageChanged = function(page) {
                if ($scope.searchText == '' || $scope.searchText == undefined || $scope.searchText == null)
                    $scope.dataInCurrentPage = $scope.userList.slice((page - 1) * 10, (page - 1) * 10 + 10);
                else
                    $scope.dataInCurrentPage = $scope.filteredUsers.slice((page - 1) * 10, (page - 1) * 10 + 10);
            };

            $scope.filterUser = function() {
                $scope.filteredUsers = $filter('filter')($scope.userList, $scope.searchText);
                $scope.totalItems = $scope.filteredUsers.length;
                $scope.dataInCurrentPage = $scope.filteredUsers.slice(0, 10);
            }

            dataFactory.updateBrandSideBar(brandId);
            userRemote.filter({
                brand_id: brandId,
                filter: '',
                fields: '["id", "name", "dob", "gender", "city", "last_visit", "phone"]',
                brand_id: brandId,
                page: 0,
                page_size: 10000
            }, function(data) {
                if (data.error == undefined) {
                    $scope.hideLoading = true;
                    if ($scope.userList.length == 0) {
                        $scope.userList = data.data;
                        normalizeUser();
                        $scope.saveInfor();
                    }
                } else
                    dialogHelper.showError(data.error.message);
            }, function() {});


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
                $scope.totalItems = $scope.userList.length;

                for (var i = 0; i < $scope.totalItems; i++) {

                    var user = $scope.userList[i];
                    if (user.phone == '' || user.phone == null)
                        user.phone = '-';

                    if (user.email == null)
                        user.email = " - ";

                    if (user.gender == null)
                        user.gender = " - ";
                    else if (user.gender == 'male')
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

                $scope.dataInCurrentPage = $scope.userList.slice(0, 10);
            }

            $scope.getResult = function() {
                $scope.hideLoading = false;
                $scope.searchText = '';

                userRemote.filter(buildQuery(), function(data) {
                    $scope.checkList = [];
                    $scope.hideLoading = true;
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