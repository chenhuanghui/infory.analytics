angular.module('user')
    .controller('UserManagerCtrl', ['$scope', '$routeParams', 'dataFactory', 'remoteFactory', 'filterHelper', 'userRemote', 'bookmarkRemote', 'userManagerFactory',
        function($scope, $routeParams, dataFactory, remoteFactory, filterHelper, userRemote, bookmarkRemote, userManagerFactory) {
            var brandId = $routeParams.brandId;

            $scope.metas = remoteFactory.meta_property_types;
            $scope.event = remoteFactory.meta_profile;
            $scope.events = remoteFactory.meta_events;
            $scope.metadata = remoteFactory.meta_lists;


            $scope.checkList = [];
            $scope.checkAll = false;

            var oldData = userManagerFactory.getData(brandId);
            if (oldData != null) {
                $scope.userList = oldData.userList;
                $scope.checkList = oldData.checkList;
                $scope.checkAll = oldData.checkAll;
                $scope.subfilters = oldData.subfilters;
            } else
                $scope.subfilters = [];

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
                    subfilters: saveSubfilters
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
                    //console.log(data);
                }, function() {});
            }

            function buildQuery() {
                var query = filterHelper.buildQuery($scope.subfilters);

                var fields = {
                    filter: JSON.stringify(query),
                    fields: '["name", "dob", "gender", "city", "last_visit"]',
                    brand_id: brandId,
                    page: 0,
                    page_size: 10000
                };
                return fields;
            }

            $scope.getResult = function() {
                userRemote.filter(buildQuery(), function(data) {

                    $scope.checkList = [];
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

                            user.stt = i;
                            $scope.checkList.push(false);
                        }

                        $scope.saveInfor();
                    }

                }, function() {});
            }

        }
    ])