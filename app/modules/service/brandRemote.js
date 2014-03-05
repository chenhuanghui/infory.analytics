angular.module('smg.services')
    .factory('brandRemote', ['$http', '$upload', 'remoteFactory',
        function($http, $upload, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl();
            return {
                updateCover: function(brandId, cover, success, error) {
                    $http.post(base_url + 'brand/update', {
                        cover: cover,
                        brand_id: brandId
                    }).success(success).error(error);
                },
                update: function(fields, success, error) {
                    $http.post(base_url + 'brand/update', fields).success(success).error(error);
                },
                getList: function(fields, success, error) {
                    $http.post(base_url + 'brand/list', fields).success(success).error(error);
                },
                get: function(fields, success, error) {
                    $http.post(base_url + 'brand/get', fields).success(success).error(error);
                },
                getHome: function(fields, success, error) {
                    $http.post(base_url + 'brand/get_home', fields).success(success).error(error);
                },
                getCostChart: function(fields, success, error) {
                    $http.post(base_url + 'brand/get_cost_chart', fields).success(success).error(error);
                }
            }
        }
    ])