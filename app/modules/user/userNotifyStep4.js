angular.module('user')
    .controller('UserNotifyStep4Ctrl', ['$scope', '$routeParams', '$location', 'remoteFactory', 'dataFactory', 'userNotifyFactory', 'filterHelper', 'userRemote', 'messageRemote',
        function($scope, $routeParams, $location, remoteFactory, dataFactory, userNotifyFactory, filterHelper, userRemote, messageRemote) {

            var brandId = $routeParams.brandId;
            dataFactory.updateBrandSideBar(brandId);

            $scope.messageList = [];

            dataFactory.getBrand(brandId, function(data) {
                $scope.brand = data;
            }, function() {});

            var step3Data = userNotifyFactory.getData(2, brandId);
            $scope.goToStep3 = function() {
                $location.path('/user/notify-new/step3/' + brandId);
            }

            if (step3Data == null) {
                $scope.goToStep3();
                return;
            }

            $scope.statusTypes = [{
                name: 'running',
                name_display: 'Đang chạy'
            }, {
                name: 'stopped',
                name_display: 'Tạm dừng'
            }, {
                name: 'finished',
                name_display: 'Kết thúc'
            }]

            var step2Data = userNotifyFactory.getData(1, brandId);
            var step1Data = userNotifyFactory.getData(0, brandId);

            var fields = {
                brand_id: brandId,
                name: step1Data.name,
                type: step1Data.notifyType.name,
                time_begin: step3Data.data.dateDisplay,
                send_method: step2Data.sendMethod.name,
                target_user_filter: step2Data.filter
            }

            switch (step1Data.notifyType.name) {
                case 'sms':
                    fields.content = step1Data.sms_content;
                    break;
                case 'email':
                    fields.content = step1Data.email_content;
                    fields.sender = step1Data.email_sender;
                    fields.title = step1Data.email_title;
                    break;
                case 'in-app':
                    fields.content = step1Data.in_app_content;
                    break;
            }

            if (fields.send_method == 'once') {
                var checkList = step2Data.isChecked;
                var userList = step2Data.userList;
                var target_users = [];

                for (var i = 0; i < checkList.length; i++)
                    if (checkList[i] == true)
                        target_users.push(userList[i].id);

                fields.target_users = JSON.stringify(target_users);
            }

            messageRemote.create(fields, function(data) {
                if (data.error == undefined) {
                    var properties = {
                        brand_id: brandId,
                        fields: '["name", "type", "send_method", "time_begin", "status"]'
                    }

                    messageRemote.list(properties, function(data) {
                        if (data.error == undefined) {
                            $scope.messageList = data;
                            for (var i = 0; i < $scope.messageList.length; i++) {
                                if (i % 2 == 0)
                                    $scope.messageList[i].sttClass = 'even';
                                else
                                    $scope.messageList[i].sttClass = 'odd';

                                switch ($scope.messageList[i].status) {
                                    case 'running':
                                        $scope.messageList[i].statusClass = 'btn-flat success';
                                        $scope.messageList[i].statusName = 'Đang chạy';
                                        break;
                                    case 'stopped':
                                        $scope.messageList[i].statusClass = 'btn-flat gray';
                                        $scope.messageList[i].statusName = 'Tạm dừng';
                                        break;
                                    case 'finished':
                                        $scope.messageList[i].statusClass = 'btn-flat gray';
                                        $scope.messageList[i].statusName = 'Kết thúc';
                                        break;
                                }

                                switch ($scope.messageList[i].send_method) {
                                    case 'once':
                                        $scope.messageList[i].methodName = 'Gửi một lần';
                                        break;
                                    case 'auto':
                                        $scope.messageList[i].methodName = 'Gửi tự động';
                                        break;
                                }

                                switch ($scope.messageList[i].type) {
                                    case 'sms':
                                        $scope.messageList[i].typeName = 'Gửi sms';
                                        break;
                                    case 'email':
                                        $scope.messageList[i].typeName = 'Gửi email';
                                        break;
                                    case 'in-app':
                                        $scope.messageList[i].typeName = 'Gửi notification';
                                        break;
                                }
                            }
                        }
                    }, function() {});
                }
            }, function() {})
        }
    ])