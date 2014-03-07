angular.module('smg.services')
    .factory('accountRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl();
            var tail_url = remoteFactory.getTailUrl();
            return {
                login: function(fields, success, error) {
                    $http.post('http://dev2.smartguide.vn/dashboard/auth', fields).success(success).error(error);
                },
                logout: function(fields, success, error) {
                    $http.post(base_url + 'logout', fields).success(success).error(error);
                },
                get: function(fields, success, error) {
                    $http.post(base_url + 'account/get' + tail_url, fields).success(success).error(error);
                },
                update: function(fields, success, error) {
                    $http.post(base_url + 'account/update' + tail_url, fields).success(success).error(error);
                },
            }
        }
    ])