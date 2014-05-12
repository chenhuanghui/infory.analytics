angular.module('lister')

.controller('ListerCtrl', ['$scope', '$http', '$location', '$routeParams', '$filter', 'remoteFactory', 'dataFactory', 'Auth', 'brandRemote', 'chartHelper', 'serviceHelper', 'eventRemote', 'compareHelper', 'homeFactory', 'dialogHelper',
    function($scope, $http, $location, $routeParams, $filter, remoteFactory, dataFactory, Auth, brandRemote, chartHelper, serviceHelper, eventRemote, compareHelper, homeFactory, dialogHelper) {
        $scope.hideLoading = false;
        $scope.brands = [];
        $scope.itemsPerPage = 10;
        $scope.maxSize = 10;

        dataFactory.getBrands(function(brands) {
            $scope.hideLoading = true;
            $scope.brands = brands;
            resetPagination($scope.brands, 1);

        }, function() {});

        $scope.pageChanged = function(page) {
            $scope.currentPage = page;
            if ($scope.searchText == '' || $scope.searchText == undefined || $scope.searchText == null)
                $scope.dataInCurrentPage = $scope.brands.slice((page - 1) * $scope.itemsPerPage, (page - 1) * $scope.itemsPerPage + $scope.itemsPerPage);
            else
                $scope.dataInCurrentPage = $scope.filteredBrands.slice((page - 1) * $scope.itemsPerPage, (page - 1) * $scope.itemsPerPage + $scope.itemsPerPage);
        };

        function resetPagination(array, page) {
            $scope.currentPage = page;
            $scope.totalItems = array.length;
            $scope.dataInCurrentPage = array.slice((page - 1) * $scope.itemsPerPage, (page - 1) * $scope.itemsPerPage + $scope.itemsPerPage);
        }

        $scope.filterBrands = function() {
            if ($scope.searchText != '') {
                $scope.filteredBrands = $filter('filter')($scope.brands, $scope.searchText);
                resetPagination($scope.filteredBrands, 1);
            } else {
                resetPagination($scope.brands, 1);
            }
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
            access: access.user
        })
});