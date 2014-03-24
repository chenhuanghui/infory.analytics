angular.module('smg.services')
    .factory('bookmarkRemote', ['$http', 'remoteFactory',
        function($http, remoteFactory) {
            var base_url = remoteFactory.getBaseUrl() + 'bookmark/';
            var tail_url = remoteFactory.getTailUrl();
            return {
                funnelCreate: function(fields, success, error) {
                    $http.post(base_url + 'funnel/create' + tail_url, fields).success(success).error(error);
                },
                eventCreate: function(fields, success, error) {
                    $http.post(base_url + 'event/create' + tail_url, fields).success(success).error(error);
                },
                eventUpdate: function(fields, success, error) {
                    $http.post(base_url + 'event/update' + tail_url, fields).success(success).error(error);
                },
                profileCreate: function(fields, success, error) {
                    $http.post(base_url + 'profiles/create' + tail_url, fields).success(success).error(error);
                },

            }
        }
    ])