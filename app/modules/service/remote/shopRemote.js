angular.module('smg.services')
    .factory('shopRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl() + 'shop/';
            return {
                get: function(fields, success, error) {
                    $http.post(base_url + 'get', fields).success(success).error(error);
                },
                update: function(fields, success, error) {
                    $http.post(base_url + 'update', fields).success(success).error(error);
                },
                create: function(fields, success, error) {
                    $http.post(base_url + 'create', fields).success(success).error(error);
                },
                delete: function(fields, success, error) {
                    $http.post(base_url + 'delete', fields).success(success).error(error);
                },
                removeImage: function(fields, success, error) {
                    $http.post(base_url + 'remove_image', fields).success(success).error(error);
                },
            }
        }
    ])