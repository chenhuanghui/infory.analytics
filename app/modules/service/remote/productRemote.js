angular.module('smg.services')
    .factory('productRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl() + 'product/';
            return {
                update: function(fields, success, error) {
                    $http.post(base_url + 'update', fields).success(success).error(error);
                },
                create: function(fields, success, error) {
                    $http.post(base_url + 'create', fields).success(success).error(error);
                },

            }
        }
    ])