angular.module('smg.services')
    .factory('brandRemote', ['$http', '$upload', 'remoteFactory',
        function($http, $upload, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl() + 'brand/';
            return {
                updateCover: function(brandId, cover, success, error) {
                    $http.post(base_url + 'update', {
                        cover: cover,
                        brand_id: brandId
                    }).success(success).error(error);
                },
                update: function(fields, success, error) {
                    $http.post(base_url + 'update', fields).success(success).error(error);
                },
                getList: function(fields, success, error) {
                    $http.post(base_url + 'list', fields).success(success).error(error);
                },
                get: function(fields, success, error) {
                    $http.post(base_url + 'get', fields).success(success).error(error);
                },
                getHome: function(fields, success, error) {
                    $http.post(base_url + 'get_home', fields).success(success).error(error);
                },
                getDevelopmentChart: function(fields, success, error) {
                    $http.post(base_url + 'get_development_chart', fields).success(success).error(error);
                },
                getCostChart: function(fields, success, error) {
                    $http.post(base_url + 'get_cost_chart', fields).success(success).error(error);
                },
                create: function(fields, success, error) {
                    $http.post(base_url + 'create', fields).success(success).error(error);
                }
            }
        }
    ])