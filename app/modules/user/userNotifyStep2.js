angular.module('user')
    .controller('UserNotifyStep2Ctrl', ['$scope', '$routeParams', '$location', 'remoteFactory', 'dataFactory', 'userNotifyFactory', 'filterHelper', 'userRemote', 'serviceHelper',
        function($scope, $routeParams, $location, remoteFactory, dataFactory, userNotifyFactory, filterHelper, userRemote, serviceHelper) {

            var brandId = $routeParams.brandId;

            dataFactory.getBrand(brandId, function(data) {
                $scope.brand = data;
            }, function() {});


            $scope.metas = remoteFactory.meta_property_types;
            $scope.event = remoteFactory.meta_profile;
            $scope.events = remoteFactory.meta_profile;
            $scope.metadata = remoteFactory.meta_lists;
            $scope.subfilters = [];
            $scope.all = false;
            $scope.userList = userNotifyFactory.getCurrentResultUserFilter();
            $scope.numOfSelectedUsers = 0;
            $scope.isChecked = [];

            function saveInfor() {}

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
                        $scope.isChecked = [];

                        for (var i = 0; i < $scope.userList.length; i++) {

                            var user = $scope.userList[i];
                            user.stt = i;

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

                            $scope.isChecked.push(false);

                        }

                        userNotifyFactory.setCurrentResultUserFilter($scope.userList);
                    }

                }, function() {});
            }

            $scope.updateSelectedUsers = function(isChecked) {
                if (isChecked)
                    $scope.numOfSelectedUsers++;
                else
                    $scope.numOfSelectedUsers--;
            }

            $scope.checkAll = function() {
                var isChecked = $scope.all;

                for (var i = 0; i < $scope.isChecked.length; i++)
                    $scope.isChecked[i] = isChecked;

                if (isChecked)
                    $scope.numOfSelectedUsers = $scope.isChecked.length;
                else
                    $scope.numOfSelectedUsers = 0;
            }

            $scope.goToStep3 = function() {
                $location.path('/user/notify-new/step3/' + brandId);
            }
            $scope.goToStep1 = function() {
                $location.path('/user/notify-new/step1/' + brandId);
            }
        }

    ])