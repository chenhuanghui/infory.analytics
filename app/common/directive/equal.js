angular.module('smgDirectives')
    .directive('nxEqual', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                scope.$watch(attrs.nxEqual, function(value) {
                    ctrl.$setValidity('nxEqual', value === ctrl.$viewValue);
                });
                ctrl.$parsers.push(function(value) {
                    ctrl.$setValidity('nxEqual', value === scope.$eval(attrs.nxEqual));
                });
            }
        };
    });

function Ctrl($scope) {}