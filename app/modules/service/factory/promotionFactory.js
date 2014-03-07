angular.module('smg.services')
    .factory('promotionFactory', ['$http',
        function($http) {
            var dataStep1 = null;
            var dataStep2 = null;
            var dataStep3 = null;
            var dataStep4 = null;
            return {
                getDataStep1: function() {
                    return dataStep1;
                },
                setDataStep1: function(data) {
                    dataStep1 = data;
                },
                getDataStep2: function() {
                    return dataStep2;
                },
                setDataStep2: function(data) {
                    dataStep2 = data;
                },
                getDataStep3: function() {
                    return dataStep3;
                },
                setDataStep3: function(data) {
                    dataStep3 = data;
                },
                getDataStep4: function() {
                    return dataStep4;
                },
                setDataStep4: function(data) {
                    dataStep4 = data;
                },

            }
        }
    ])