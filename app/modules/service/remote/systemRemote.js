angular.module('smg.services')
    .factory('systemRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl() + 'system/';
            return {
                getParams: function(fields, success, error) {
                    $http.post(base_url + 'get_params' + remoteFactory.getTailUrl(), fields).success(success).error(error);
                }
            }
        }
    ])