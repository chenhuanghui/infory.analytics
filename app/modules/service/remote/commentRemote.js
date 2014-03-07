angular.module('smg.services')
    .factory('commentRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl() + 'comment/';
            return {
                delete: function(fields, success, error) {
                    $http.post(base_url + 'delete', fields).success(success).error(error);
                },
                create: function(fields, success, error) {
                    $http.post(base_url + 'create', fields).success(success).error(error);
                },
                get: function(fields, success, error) {
                    $http.post(base_url + 'get', fields).success(success).error(error);
                }
            }
        }
    ])