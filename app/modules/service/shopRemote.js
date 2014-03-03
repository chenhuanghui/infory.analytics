angular.module('smg.services')
    .factory('shopRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl();
            return {
                // SHOP
                get: function(fields, success, error) {
                    $http.post(base_url + 'shop/get', fields).success(success).error(error);
                }
            }
        }
    ])