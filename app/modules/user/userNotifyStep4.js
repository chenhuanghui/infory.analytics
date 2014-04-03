angular.module('user')
    .controller('UserNotifyStep4Ctrl', ['$scope', '$routeParams', '$location', 'remoteFactory', 'dataFactory', 'userNotifyFactory', 'filterHelper', 'userRemote', 'messageRemote', 'dialogHelper', 'serviceHelper',
        function($scope, $routeParams, $location, remoteFactory, dataFactory, userNotifyFactory, filterHelper, userRemote, messageRemote, dialogHelper, serviceHelper) {

            var brandId = $routeParams.brandId;
            dataFactory.updateBrandSideBar(brandId);

            $scope.messageList = [];
            $scope.hideLoading = false;

            dataFactory.getBrand(brandId, function(data) {
                $scope.brand = data;
            }, function() {});

            var step3Data = userNotifyFactory.getData(2, brandId);

            $scope.goToStep1 = function() {
                $location.path('/user/notify-new/step1/' + brandId);
            }

            $scope.goToStep3 = function() {
                $location.path('/user/notify-new/step3/' + brandId);
            }

            var step2Data = userNotifyFactory.getData(1, brandId);
            var step1Data = userNotifyFactory.getData(0, brandId);

            for (var i = 0; i < 3; i++)
                userNotifyFactory.setData(i, {
                    brand_id: -1
                });


            if (step1Data == null || (step3Data == null && step2Data == null) || (step3Data == null && step2Data != null && step2Data.sendMethod.name == 'auto')) {
                listNotification();
                return;
            }

            var fields = {
                brand_id: brandId,
                name: step1Data.name,
                type: step1Data.notifyType.name,
                send_method: step2Data.sendMethod.name,
                target_user_filter: step2Data.filter
            }

            if (step3Data != null)
                fields.time_begin = step3Data.data.dateDisplay;
            else
                fields.time_begin = serviceHelper.normalizeTime(new Date());

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
                    listNotification();
                } else
                    dialogHelper.showError(data.error.message);
            }, function() {})

            function listNotification() {

                $scope.statusTypes = [{
                    name: '',
                    name_display: 'Trạng thái'
                }, {
                    name: 'running',
                    name_display: 'Đang chạy'
                }, {
                    name: 'stopped',
                    name_display: 'Đã dừng'
                }, {
                    name: 'waiting',
                    name_display: 'Chờ duyệt'
                }];

                var properties = {
                    brand_id: brandId,
                    fields: '["id", "name", "type", "send_method", "time_begin", "status"]'
                }

                $scope.sortNotificationListByStatus = function() {
                    var status = $scope.statusType.name;
                    if ($scope.statusType.name == '')
                        $scope.messageList = $scope.messageListFull;
                    else
                        $scope.messageList = [];

                    for (var i = 0; i < $scope.messageListFull.length; i++) {
                        if ($scope.messageListFull[i].status == status)
                            $scope.messageList.push($scope.messageListFull[i]);
                    }
                }

                $scope.changeStatus = function(id) {
                    var status = $scope.messageListFull[id].status;
                    var nextStatus = '';
                    switch (status) {
                        case 'running':
                            $scope.messageListFull[id].statusClass = 'btn-flat inverse';
                            $scope.messageListFull[id].status = 'stopped';
                            $scope.messageListFull[id].statusName = 'Đã dừng';
                            nextStatus = 'stopped';
                            break;
                        case 'waiting':
                            return;
                        case 'stopped':
                            $scope.messageListFull[id].statusClass = 'btn-flat success';
                            $scope.messageListFull[id].status = 'running';
                            $scope.messageListFull[id].statusName = 'Đang chạy';
                            nextStatus = 'running';
                            break;
                    }

                    messageRemote.update({
                        message_id: $scope.messageListFull[id].id,
                        status: nextStatus
                    }, function(data) {
                        if (data.error == undefined) {

                        } else {
                            dialogHelper.showError(data.error.message);
                            $scope.messageListFull[id].status = status;
                            if ($scope.messageListFull[id].status == 'running') {
                                $scope.messageListFull[id].statusClass = 'btn-flat success';
                                $scope.messageListFull[id].statusName = 'Đang chạy';
                            } else {
                                $scope.messageListFull[id].statusClass = 'btn-flat inverse';
                                $scope.messageListFull[id].statusName = 'Đã dừng';
                            }
                        }
                    }, function() {});
                }

                $scope.hideLoading = false;
                messageRemote.list(properties, function(data) {
                    if (data.error == undefined) {
                        $scope.hideLoading = true;
                        $scope.messageListFull = data;
                        for (var i = 0; i < $scope.messageListFull.length; i++) {
                            if (i % 2 == 0)
                                $scope.messageListFull[i].sttClass = 'even';
                            else
                                $scope.messageListFull[i].sttClass = 'odd';

                            $scope.messageListFull[i].index = i;

                            switch ($scope.messageListFull[i].status) {
                                case 'running':
                                    $scope.messageListFull[i].statusClass = 'btn-flat success';
                                    $scope.messageListFull[i].statusName = 'Đang chạy';
                                    break;
                                case 'stopped':
                                    $scope.messageListFull[i].statusClass = 'btn-flat gray';
                                    $scope.messageListFull[i].statusName = 'Tạm dừng';
                                    break;
                                case 'finished':
                                    $scope.messageListFull[i].statusClass = 'btn-flat gray';
                                    $scope.messageListFull[i].statusName = 'Kết thúc';
                                    break;
                            }

                            switch ($scope.messageListFull[i].send_method) {
                                case 'once':
                                    $scope.messageListFull[i].methodName = 'Gửi một lần';
                                    break;
                                case 'auto':
                                    $scope.messageListFull[i].methodName = 'Gửi tự động';
                                    break;
                            }

                            switch ($scope.messageListFull[i].type) {
                                case 'sms':
                                    $scope.messageListFull[i].typeName = 'Gửi sms';
                                    break;
                                case 'email':
                                    $scope.messageListFull[i].typeName = 'Gửi email';
                                    break;
                                case 'in-app':
                                    $scope.messageListFull[i].typeName = 'Gửi notification';
                                    break;
                            }

                            $scope.messageList = $scope.messageListFull;
                        }
                    } else
                        dialogHelper.showError(data.error.message);
                }, function() {});
            }
        }
    ])