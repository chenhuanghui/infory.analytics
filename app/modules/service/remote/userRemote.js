angular.module('smg.services')
    .factory('userRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl() + 'user/';
            var tail_url = remoteFactory.getTailUrl();
            return {
                get: function(fields, success, error) {
                    $http.post(base_url + 'get_profile' + tail_url, fields).success(success).error(error);
                },
                filter: function(fields, success, error) {
                    $http.post(base_url + 'filter' + tail_url, fields).success(success).error(error);
                }
            }
        }
    ])