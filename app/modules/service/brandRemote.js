angular.module('smg.services')
    .factory('brandRemote', ['$http', '$upload', 'remoteFactory',
        function($http, $upload, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl();
            return {
                updateCover: function(brandId, cover, success, error) {
                    $http.post(base_url + 'brand/update', {
                        cover: cover,
                        brand_id: brandId
                    }).success(success).error(error);
                },
                updateName: function(brandId, name, success, error) {
                    $http.post(base_url + 'brand/update', {
                        name: name,
                        brand_id: brandId,
                    }).success(success).error(error);
                },
                getList: function(fields, success, error) {
                    $http.post(base_url + 'brand/list', {
                        fields: fields
                    }).success(success).error(error);
                },
                get: function(fields, id, success, error) {
                    $http.post(base_url + 'brand/get', {
                        fields: fields,
                        id: id,
                    }).success(success).error(error);
                }
            }
        }
    ])