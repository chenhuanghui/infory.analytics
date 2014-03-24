angular.module('smg.services')
    .factory('promotionRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl() + 'promotion/';
            var tail_url = remoteFactory.getTailUrl();
            return {
                list: function(fields, success, error) {
                    $http.post(base_url + 'list' + tail_url, fields).success(success).error(error);
                },
                create: function(fields, success, error) {
                    $http.post(base_url + 'create' + tail_url, fields).success(success).error(error);
                },
                update: function(fields, success, error) {
                    $http.post(base_url + 'update' + tail_url, fields).success(success).error(error);
                },
            }
        }
    ])