angular.module('smg.services')
    .factory('commentRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl();
            return {
                delete: function(fields, success, error) {
                    $http.post(base_url + 'comment/delete', fields).success(success).error(error);
                },
                create: function(fields, success, error) {
                    $http.post(base_url + 'comment/create', fields).success(success).error(error);
                },
                get: function(fields, success, error) {
                    $http.post(base_url + 'comment/get', fields).success(success).error(error);
                }
            }
        }
    ])