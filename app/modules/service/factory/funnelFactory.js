angular.module('smg.services')
    .factory('funnelFactory', ['$http',
        function($http) {
            var data = [null, null];

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