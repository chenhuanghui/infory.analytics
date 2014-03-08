angular.module('smg.services')
    .factory('bookmarkRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl() + 'bookmark/';
            return {
                funnelCreate: function(fields, success, error) {
                    $http.post(base_url + 'funnel/create', fields).success(success).error(error);
                },
                eventCreate: function(fields, success, error) {
                    $http.post(base_url + 'event/create', fields).success(success).error(error);
                },

            }
        }
    ])