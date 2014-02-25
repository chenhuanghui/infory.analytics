angular.module('smg.services')
    .factory('userRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl();
            return {
                getUserProfile: function(fields, brandId, userId, success, error) {
                    $http.post(base_url + 'user/get_profile', {
                        fields: fields,
                        brand_id: brandId,
                        user_id: userId
                    }).success(success).error(error);
                }
            }
        }
    ])