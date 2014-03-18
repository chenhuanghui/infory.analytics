angular.module('smg.services')
    .factory('remoteFactory', ['$http', 'cookie', 'metaData',
        function($http, cookie, metaData) {
            var base_url = "http://dev2.smartguide.vn/dashboard/api/v1/";
            var tail_url = '?access_token=' + cookie.getCookie('access_token');

            return {
                getTailUrl: function() {
                    return tail_url;
                },
                getBaseUrl: function() {
                    return base_url;
                },

                meta_property_types: metaData.meta_property_types,

                meta_lists: metaData.meta_lists,

                meta_profile: metaData.meta_profile,

                meta_events: metaData.meta_events,

                cities: metaData.cities
            };
        }
    ]);