angular.module('smg.services')
    .factory('funnelRemote', ['$http', '$upload', 'remoteFactory',
        function($http, $upload, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl() + 'funnel/';
            var tail_url = remoteFactory.getTailUrl();
            return {
                get: function(fields, success, error) {
                    $http.post(base_url + 'get' + tail_url, fields).success(success).error(error);
                },
            }
        }
    ])