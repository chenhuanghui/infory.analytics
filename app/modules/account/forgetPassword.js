angular.module('account')
    .controller('forgetPasswordCtrl', ['$scope', '$http', '$location', 'remoteFactory', 'dialogHelper',
        function($scope, $http, $location, remoteFactory, dialogHelper) {
            $scope.forgetPassword = function() {
                dialogHelper.loadDialog('Thông báo', 'Đồng ý', 'Hủy', 'Mật khẩu mới đã được gửi đến địa chỉ email: ' + $scope.email + ' . Vui lòng chọn "Đồng ý" để về trang Đăng nhập', function() {
                    $location.path('/login');
                });

                $scope.email = '';
            }
        }
    ])

.config(function($routeProvider) {
    $routeProvider
        .when('/forget_password', {
            templateUrl: 'modules/account/template/forget_password.html',
            controller: 'forgetPasswordCtrl'
        })
});