angular.module('smg.services')
    .factory('brandRemote', ['$http', '$upload', 'remoteFactory',
        function($http, $upload, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl() + 'brand/';
            var tail_url = remoteFactory.getTailUrl();
            return {
                update: function(fields, success, error) {
                    $http.post(base_url + 'update' + tail_url, fields).success(success).error(error);
                },
                getList: function(fields, success, error) {
                    $http.post(base_url + 'list' + tail_url, fields).success(success).error(error);
                },
                get: function(fields, success, error) {
                    $http.post(base_url + 'get' + tail_url, fields).success(success).error(error);
                },
                getHome: function(fields, success, error) {
                    $http.post(base_url + 'get_home' + tail_url, fields).success(success).error(error);
                },
                getDevelopmentChart: function(fields, success, error) {
                    $http.post(base_url + 'get_development_chart' + tail_url, fields).success(success).error(error);
                },
                getCostChart: function(fields, success, error) {
                    $http.post(base_url + 'get_cost_chart' + tail_url, fields).success(success).error(error);
                },
                create: function(fields, success, error) {
                    $http.post(base_url + 'create' + tail_url, fields).success(success).error(error);
                },
                removeImage: function(fields, success, error) {
                    $http.post(base_url + 'remove_image' + tail_url, fields).success(success).error(error);
                },
            }
        }
    ])