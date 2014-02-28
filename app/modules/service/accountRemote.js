angular.module('smg.services')
    .factory('accountRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl();
            return {
                login: function(fields, success, error) {
                    $http.post('http://dev2.smartguide.vn/dashboard/auth', fields).success(success).error(error);
                },
                logout: function(fields, success, error) {
                    $http.post(base_url + 'logout', fields).success(success).error(error);
                }
            }
        }
    ])