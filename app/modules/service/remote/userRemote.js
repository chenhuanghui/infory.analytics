angular.module('smg.services')
    .factory('userRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl() + 'user/';
            return {
                get: function(fields, success, error) {
                    $http.post(base_url + 'get_profile', fields).success(success).error(error);
                },
                filter: function(fields, success, error) {
                    $http.post(base_url + 'filter', fields).success(success).error(error);
                }
            }
        }
    ])