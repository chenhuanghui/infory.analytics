angular.module('lister')

.controller('ListerCtrl', ['$scope', '$http', '$location', '$routeParams', '$filter', 'remoteFactory', 'dataFactory', 'Auth', 'brandRemote', 'chartHelper', 'serviceHelper', 'eventRemote', 'compareHelper', 'homeFactory', 'dialogHelper', 'listerFactory',
    function($scope, $http, $location, $routeParams, $filter, remoteFactory, dataFactory, Auth, brandRemote, chartHelper, serviceHelper, eventRemote, compareHelper, homeFactory, dialogHelper, listerFactory) {
        $scope.hideLoading = false;
        $scope.brands = [];
        $scope.itemsPerPage = 10;
        $scope.maxSize = 10;
        $scope.entireData = [];

        var oldData = listerFactory.getData();
        if (oldData == null) {
            brandRemote.getListInternal({
                fields: '["name", "id", "cover", "type_business", "website", "fanpage", "description", "id", "owner_phone", "owner_address", "logo"]',
                page: 0
            }, function(data) {
                if (data.error == undefined) {
                    $scope.brands = data.result;
                    $scope.totalItems = data.num_of_page * $scope.itemsPerPage;

                    for (var i = 0; i < data.num_of_page; i++) {
                        $scope.entireData.push([]);
                    }

                    $scope.entireData[0] = data.result;

                    resetPagination(1);
                    $scope.hideLoading = true;
                } else {
                    dialogHelper.showError(data.error.message);
                }
            }, function() {});
        } else {
            $scope.entireData = oldData.entireData;
            $scope.brands = oldData.brands;
            $scope.totalItems = oldData.totalItems;
            $scope.currentPage = oldData.currentPage;
            $scope.hideLoading = true;
            resetPagination($scope.currentPage);
        }

        function saveInfor() {
            listerFactory.setData({
                entireData: $scope.entireData,
                brands: $scope.brands,
                totalItems: $scope.totalItems,
                hideLoading: $scope.hideLoading,
                currentPage: $scope.currentPage,
                dataInCurrentPage: $scope.dataInCurrentPage
            });
        }

        $scope.pageChanged = function(page) {
            if ($scope.entireData[page - 1].length == 0) {
                $scope.currentPage = page;
                brandRemote.getListInternal({
                    fields: '["name", "id", "cover", "type_business", "website", "fanpage", "description", "id", "owner_phone", "owner_address", "logo"]',
                    page: page - 1
                }, function(data) {
                    if (data.error == undefined) {
                        $scope.brands = data.result;
                        $scope.entireData[page - 1] = data.result;
                        resetPagination(page);
                    } else {
                        dialogHelper.showError(data.error.message);
                    }
                }, function() {});
            } else {
                $scope.brands = $scope.entireData[page - 1];
                resetPagination(page);
            }
        };

        function resetPagination(page) {
            saveInfor();
            $scope.currentPage = page;
            $scope.dataInCurrentPage = $scope.brands;
        }

        $scope.moveToBrand = function(id) {
            $location.path('/brand/infor/' + id);
        }
    }
])

.config(function($routeProvider) {
    var access = routingConfig.accessLevels;

    $routeProvider
        .when('/list', {
            templateUrl: 'modules/lister/template/lister.html',
            controller: 'ListerCtrl',
            access: access.admin
        })
});