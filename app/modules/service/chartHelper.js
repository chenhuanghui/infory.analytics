'use strict';

angular.module('Smg')
    .factory('chartHelper',
        function() {
            return {
                buildLineChartForFunnel: function(values, columnNames) {
                    var chartData = {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Thống kê ',
                            x: -20 //center
                        },
                        subtitle: {
                            text: 'Source: infory.vn',
                            x: -20
                        },
                        xAxis: {
                            categories: columnNames
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

                    };


                    chartData.series = [{
                        name: 'abc',
                        data: values
                    }];

                    return chartData;
                },
                buildLineChart: function(data, event) {
                    var chartData = {
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

                    };

                    if (data.groups == undefined) {
                        chartData.series = [{
                            name: event,
                            data: data.values
                        }];
                    } else {
                        chartData.series = [];
                        for (var i = 0; i < data.groups.length; i++) {
                            chartData.series.push({
                                name: data.groups[i],
                                data: data.values[i]
                            })
                        }
                    }

                    return chartData;
                },
                buildPieChart: function(data, event) {
                    if (data.groups == undefined)
                        return '';

                    var chartData = {
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false
                        },
                        title: {
                            text: 'Thống kê ' + event
                        },
                        tooltip: {
                            pointFormat: '{<b>{point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: true,
                                    color: '#000000',
                                    connectorColor: '#000000',
                                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                                }
                            }
                        },
                        series: [{
                            name: 'Giá trị',
                            type: 'pie',
                            data: []
                        }]
                    };

                    for (var i = 0; i < data.groups.length; i++) {
                        var sum = 0;
                        for (var j = 0; j < data.values[i].length; j++)
                            sum += data.values[i][j];

                        chartData.series[0].data.push([data.groups[i],
                            sum
                        ]);
                    }

                    return chartData;

                },
                buildColumnChart: function(data, event) {
                    if (data.groups == undefined)
                        return '';

                    var chartData = {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Thống kê ' + event,
                        },
                        subtitle: {
                            text: 'Source: infory.vn',
                        },
                        xAxis: {
                            categories: data.time
                        },
                        yAxis: {
                            min: 0
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        },
                        series: []
                    };

                    for (var i = 0; i < data.groups.length; i++) {
                        chartData.series.push({
                            name: data.groups[i],
                            data: data.values[i]
                        })
                    }

                    return chartData;
                }
            }
        }
);