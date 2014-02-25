angular.module('smg.services')
    .factory('accountRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl();
            return {
                login: function(user, success, error) {
                    $http.post('http://dev2.smartguide.vn/dashboard/auth', user).success(success).error(error);
                },
                logout: function(user, success, error) {
                    $http.post(base_url + 'logout', user).success(success).error(error);
                }
            }
        }
    ])