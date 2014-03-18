angular.module('smg.services')
    .factory('systemRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl() + 'system/';
            return {
                get: function(fields, success, error) {
                    $http.post(base_url + 'get_params', fields).success(success).error(error);
                }
            }
        }
    ])