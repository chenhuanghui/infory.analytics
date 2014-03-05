angular.module('smg.services')
    .factory('promotionRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl();
            return {
                list: function(fields, success, error) {
                    $http.post(base_url + 'user/get_profile', fields).success(success).error(error);
                },
            }
        }
    ])