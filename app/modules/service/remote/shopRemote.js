angular.module('smg.services')
    .factory('shopRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl() + 'shop/';
            var tail_url = remoteFactory.getTailUrl();
            return {
                get: function(fields, success, error) {
                    $http.post(base_url + 'get' + tail_url, fields).success(success).error(error);
                },
                update: function(fields, success, error) {
                    $http.post(base_url + 'update' + tail_url, fields).success(success).error(error);
                },
                create: function(fields, success, error) {
                    $http.post(base_url + 'create' + tail_url, fields).success(success).error(error);
                },
                delete: function(fields, success, error) {
                    $http.post(base_url + 'delete' + tail_url, fields).success(success).error(error);
                },
                removeUserImage: function(fields, success, error) {
                    $http.post(base_url + 'userimage/delete' + tail_url, fields).success(success).error(error);
                },
                getQRCode: function(fields, success, error) {
                    $http.post(base_url + 'get_qrcode' + tail_url, fields).success(success).error(error);
                }
            }
        }
    ])