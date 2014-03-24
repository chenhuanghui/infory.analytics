angular.module('smg.services')
    .factory('messageRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl() + 'message/';
            var tail_url = remoteFactory.getTailUrl();
            return {
                create: function(fields, success, error) {
                    $http.post(base_url + 'create' + tail_url, fields).success(success).error(error);
                },
                list: function(fields, success, error) {
                    $http.post(base_url + 'list' + tail_url, fields).success(success).error(error);
                },
                update: function(fields, success, error) {
                    $http.post(base_url + 'update' + tail_url, fields).success(success).error(error);
                }
            }
        }
    ])