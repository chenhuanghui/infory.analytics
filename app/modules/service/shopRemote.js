angular.module('smg.services')
    .factory('shopRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl();
            return {
                // SHOP
                get: function(id, fields, success, error) {
                    $http.post(base_url + 'shop/get', {
                        fields: fields,
                        shop_id: id,
                    }).success(success).error(error);
                }
            }
        }
    ])