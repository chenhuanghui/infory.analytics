angular.module('smg.services')
    .factory('commentRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl() + 'comment/';
            var tail_url = remoteFactory.getTailUrl();
            return {
                delete: function(fields, success, error) {
                    $http.post(base_url + 'delete' + tail_url, fields).success(success).error(error);
                },
                create: function(fields, success, error) {
                    $http.post(base_url + 'create' + tail_url, fields).success(success).error(error);
                },
                get: function(fields, success, error) {
                    $http.post(base_url + 'get' + tail_url, fields).success(success).error(error);
                }
            }
        }
    ])