angular.module('smgDirectives')

.directive('chart', function() {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            chartData: "=value"
        },
        transclude: true,
        replace: true,

        link: function(scope, element, attrs) {
            scope.$watch(function() {
                return scope.chartData;
            }, function(value) {
                if (!value) return;
                if (scope.chartData.title == undefined)
                    return;
                scope.chartData.chart.renderTo = element[0];
                scope.chartData.credits = false;
                var chart = new Highcharts.Chart(scope.chartData);
            });
        }
    };

});