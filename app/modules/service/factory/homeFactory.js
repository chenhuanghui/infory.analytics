angular.module('smg.services')
    .factory('homeFactory', ['$http',
        function($http) {
            var homeData = {
                id: -1,
                fields: null,
                event_bookmarks: null,
                event_bookmark: null,
                data_chart: null,
                data: null,
                time_unit_1: null,
                time_unit_2: null,
                time_unit_3: null,
                time_unit_4: null,
                compare_unit: null
            };

            return {
                setHomeData: function(id, fields, event_bookmarks, event_bookmark, data_chart,
                    data, time_unit_1, time_unit_2, time_unit_3, time_unit_4, compare_unit) {

                    homeData.id = id;
                    homeData.fields = fields;
                    homeData.event_bookmarks = event_bookmarks;
                    homeData.event_bookmark = event_bookmark;
                    homeData.data_chart = data_chart;
                    homeData.data = data;
                    homeData.time_unit_1 = time_unit_1;
                    homeData.time_unit_2 = time_unit_2;
                    homeData.time_unit_3 = time_unit_3;
                    homeData.time_unit_4 = time_unit_4;
                    homeData.compare_unit = compare_unit;
                },
                getHomeData: function(id) {
                    if (homeData.id == id)
                        return homeData;
                    else
                        null;
                }
            }
        }
    ])