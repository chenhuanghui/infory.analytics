angular.module('smg.services')
    .factory('promotionRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl() + 'promotion/';
            return {
                list: function(fields, success, error) {
                    $http.post(base_url + 'list', fields).success(success).error(error);
                },
                create: function(fields, success, error) {
                    $http.post(base_url + 'create', fields).success(success).error(error);
                },
                update: function(fields, success, error) {
                    $http.post(base_url + 'update', fields).success(success).error(error);
                },
            }
        }
    ])