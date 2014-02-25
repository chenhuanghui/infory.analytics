angular.module('smg.services')
    .factory('brandRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl();
            return {
                updateBrandName: function(brandId, name, success, error) {
                    $http.post(base_url + 'brand/update', {
                        name: name,
                        brand_id: brandId,
                    }).success(success).error(error);
                },
                getBrandList: function(fields, success, error) {
                    $http.post(base_url + 'brand/list', {
                        fields: fields
                    }).success(success).error(error);
                },
                getBrand: function(fields, id, success, error) {
                    $http.post(base_url + 'brand/get', {
                        fields: fields,
                        id: id,
                    }).success(success).error(error);
                }
            }
        }
    ])