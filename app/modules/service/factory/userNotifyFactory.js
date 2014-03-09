angular.module('smg.services')
    .factory('userNotifyFactory', ['$http',
        function($http) {
            var data = [null, null, null, null];
            var userList = [];

            return {
                setData: function(id, newData) {
                    data[id] = newData;
                },
                getData: function(id) {
                    return data[id];
                },
                setCurrentResultUserFilter: function(list) {
                    userList = list;
                },
                getCurrentResultUserFilter: function() {
                    return userList;
                }
            }
        }
    ])