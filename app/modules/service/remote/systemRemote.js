angular.module('smg.services')
    .factory('systemRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl() + 'system/';
            var tail_url = remoteFactory.getTailUrl();
            return {
                get: function(fields, success, error) {
                    $http.post(base_url + 'get_params' + tail_url, fields).success(success).error(error);
                }
            }
        }
    ])