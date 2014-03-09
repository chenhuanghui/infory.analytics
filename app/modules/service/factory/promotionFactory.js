angular.module('smg.services')
    .factory('promotionFactory', ['$http',
        function($http) {
            var data = [null, null, null, null];

            return {
                setData: function(id, newData) {
                    data[id] = newData;
                },
                getData: function(id) {
                    return data[id];
                },
            }
        }
    ])