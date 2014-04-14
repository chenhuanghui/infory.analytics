angular.module('account')
    .controller('signUpCtrl', ['$scope', '$http', '$location', 'remoteFactory', 'dialogHelper',
        function($scope, $http, $location, remoteFactory, dialogHelper) {
            $scope.IsRightPass = false;
            $scope.password = '';
            $scope.confirmPassword = '';
            $scope.validatedPhoneNumber = false;

            $scope.updatePass = function() {
                if ($scope.password != $scope.confirmPassword)
                    $scope.IsRightPass = false;
                else
                    $scope.IsRightPass = true;
            }

            $scope.signUp = function() {

                $http.post(remoteFactory.domain + 'auth/signup', {
                    name: $scope.name,
                    email: $scope.email,
                    password: $scope.password,
                    company: $scope.company,
                    phone: $scope.tel
                }).success(function(data) {
                    if (data.error == undefined) {
                        dialogHelper.loadDialog('Thông báo', 'Đồng ý', 'Hủy', 'Chúc mừng bạn đã tạo tài khoản thành công. Vui lòng chọn "Đồng ý" để về trang Đăng nhập', function() {
                            $location.path('/login');
                        });
                    } else
                        dialogHelper.showError(data.error.message);
                }).error(function() {});

            }

            $scope.checkPhoneNumber = function() {
                var tel = $scope.tel;

                if (tel.indexOf('84') == 0) {
                    tel = '0' + tel.substr(2, tel.length - 1);
                }

                if (tel.indexOf('+84') == 0) {
                    tel = '0' + tel.substr(3, tel.length - 1);
                }

                if (tel.indexOf('(+84)') == 0) {
                    tel = '0' + tel.substr(5, tel.length - 1);
                }

                if (tel[0] != '0') {
                    $scope.validatedPhoneNumber = false;
                    return;
                }

                for (var i = 0; i < tel.length; i++)
                    if (isNaN(tel[i])) {
                        $scope.validatedPhoneNumber = false;
                        return;
                    }

                if ((tel.length != 10 && tel.substr(0, 2) == '09') || (tel.length != 11 && tel.substr(0, 2) == '01')) {
                    $scope.validatedPhoneNumber = false;
                    return;
                }

                if (tel.substr(0, 2) != '09' && tel.substr(0, 2) != '01' && tel.length != 10) {
                    $scope.validatedPhoneNumber = false;
                    return;
                }

                $scope.validatedPhoneNumber = true;
            }
        }
    ])

.config(function($routeProvider) {
    $routeProvider
        .when('/signup', {
            templateUrl: 'modules/account/template/signup.html',
            controller: 'signUpCtrl'
        })
});