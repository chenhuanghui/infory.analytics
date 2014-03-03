'use strict';

angular.module('Smg')
    .factory('chartHelper',
        function() {
            return {
                buildLineChart: function(data, event) {
                    return {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: 'Thống kê ' + event,
                            x: -20 //center
                        },
                        subtitle: {
                            text: 'Source: infory.vn',
                            x: -20
                        },
                        xAxis: {
                            categories: data.time
                        },
                        yAxis: {
                            title: {
                                text: 'Số lượng người dùng'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        tooltip: {
                            valueSuffix: 'người dùng'
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle',
                            borderWidth: 0
                        },
                        series: [{
                            name: event,
                            data: data.values
                        }]
                    };
                }
            }
        }
);