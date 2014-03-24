angular.module('smg.services')
    .factory('eventRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl() + 'event/';
            var tail_url = remoteFactory.getTailUrl();
            return {
                count: function(fields, success, error) {
                    $http.post(base_url + 'count' + tail_url, fields).success(success).error(error);
                }
            }
        }
    ])