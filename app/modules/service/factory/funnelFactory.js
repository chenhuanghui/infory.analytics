angular.module('smg.services')
    .factory('funnelFactory', ['$http',
        function($http) {
            var dataStep1 = null;
            return {
                getDataStep1: function() {
                    return dataStep1;
                },
                setDataStep1: function(data) {
                    dataStep1 = data;
                }
            }
        }
    ])