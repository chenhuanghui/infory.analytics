angular.module('Smg')
    .factory('serviceHelper',
        function() {
            return {
                normalizeTime: function(newDate) {
                    var d = newDate.getDate();
                    var m = newDate.getMonth() + 1;
                    var y = newDate.getFullYear();
                    return '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
                },
                normalizeTimeWithMinute: function(newDate) {
                    var d = newDate.getDate();
                    var m = newDate.getMonth() + 1;
                    var y = newDate.getFullYear();
                    var h = newDate.getHours();
                    var min = newDate.getMinutes();
                    return '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y + '   ' + (h <= 9 ? '0' + h : h) + ':' + (min <= 9 ? '0' + min : min);
                }
            }
        }
);