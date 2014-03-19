angular.module('account')
    .controller('AccountCtrl', ['$scope', '$http', '$location', '$routeParams', 'dataFactory', 'Auth', 'accountRemote', '$modal', 'remoteFactory',
        function($scope, $http, $location, $routeParams, dataFactory, Auth, accountRemote, $modal, remoteFactory) {
            /*modal*/

            var base_url = remoteFactory.getBaseUrl();

            $scope.showBill = function() {
                var modalInstance = $modal.open({
                    templateUrl: 'modules/account/template/bill.html',
                    controller: $scope.ModalInstanceCtrl
                });
            };

            $scope.ModalInstanceCtrl = function($scope, $modalInstance) {
                $scope.cancel = function() {
                    $modalInstance.dismiss('cancel');
                };
            };

            var fileAvatar = null;

            $scope.$watch('_username', function() {
                dataFactory.updateAccountNameHeader($scope._username);
            });

            $scope._username = Auth.user.name;

            $scope.activeTab = "inbox";
            $scope.activeTab = "personal";

            $scope.cancel = function() {
                window.history.back();
            };

            $scope.showSuccessNotify = false;
            var orignalAccount = null;
            if ($location.path() == '/personal') {
                var fields = '["name"], ["avatar"], ["balance"], ["company"], ["email"]';
                accountRemote.get(fields, function(data) {
                    $scope.account = data;
                    $scope.account.password = "111111";
                    $scope.account.confirmPassword = "111111";
                    $scope._username = data.name;
                    if ($scope.account.balance == null)
                        $scope.account.balance = 0;
                    orignalAccount = data;
                }, function() {});
            }

            $scope.update = function() {
                var fields = {
                    name: $scope.account.name,
                    email: $scope.account.email,
                    company: $scope.account.company,
                    password: $scope.account.password
                };

                if (fileAvatar != null) {
                    var fd = new FormData();
                    fd.append('name', $scope.account.name);
                    fd.append('avatar', fileAvatar);
                    fd.append('company', $scope.account.company);
                    fd.append('password', $scope.account.password);
                    fd.append('email', $scope.account.email);

                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', base_url + 'account/update', true);
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4) {
                            var respone = JSON.parse(xhr.responseText);
                            if (respone.error != undefined) {} else
                                dialogHelper.showError(data.error.message);
                        }
                    }
                    xhr.send(fd);
                } else {
                    accountRemote.update(fields, function(data) {
                        if (data.error == undefined) {
                            orignalAccount = $scope.account;
                            $scope.showSuccessNotify = true;
                        } else {
                            $scope.account = orignalAccount;
                        }
                    }, function() {
                        $scope.account = orignalAccount;
                    })
                }
            }
        }
    ])

.config(function($routeProvider) {
    var access = routingConfig.accessLevels;

    $routeProvider
        .when('/inbox', {
            templateUrl: 'modules/account/template/inbox.html',
            controller: 'AccountCtrl',
            access: access.user
        })
        .when('/money', {
            templateUrl: 'modules/account/template/money.html',
            controller: 'AccountCtrl',
            access: access.user
        })
        .when('/personal', {
            templateUrl: 'modules/account/template/personal.html',
            controller: 'AccountCtrl',
            access: access.user
        })
});