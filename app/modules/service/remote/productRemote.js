angular.module('smg.services')
    .factory('productRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl() + 'product/';
            var tail_url = remoteFactory.getTailUrl();
            return {
                update: function(fields, success, error) {
                    $http.post(base_url + 'update' + tail_url, fields).success(success).error(error);
                },
                create: function(fields, success, error) {
                    $http.post(base_url + 'create' + tail_url, fields).success(success).error(error);
                },

            }
        }
    ])