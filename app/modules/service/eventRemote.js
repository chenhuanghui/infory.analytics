angular.module('smg.services')
    .factory('eventRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl();
            return {
                count: function(fields, success, error) {
                    $http.post(base_url + 'event/count', fields).success(success).error(error);
                }
            }
        }
    ])