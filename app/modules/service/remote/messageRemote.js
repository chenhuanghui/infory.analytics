angular.module('smg.services')
    .factory('messageRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl() + 'message/';
            return {
                create: function(fields, success, error) {
                    $http.post(base_url + 'create', fields).success(success).error(error);
                },
                list: function(fields, success, error) {
                    $http.post(base_url + 'list', fields).success(success).error(error);
                }
            }
        }
    ])