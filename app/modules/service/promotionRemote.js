angular.module('smg.services')
    .factory('promotionRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl + 'promotion/'
            return {
                list: function(fields, success, error) {
                    $http.post(base_url + 'list', fields).success(success).error(error);
                },
            }
        }
    ])