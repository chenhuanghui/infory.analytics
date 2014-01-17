//angular.module('dashboardSmgApp')
//  .controller('HomeCtrl', function ($scope) {
//    $scope.awesomeThings = [
//      'HTML5 Boilerplate',
//      'AngularJS',
//      'Karma'
//    ];
//  });

function HomeCtrl($scope, $http){
    $scope.brand = {name: 'Trung nguyên'};
    
    //show tab
    $scope.showTab = function(menu, tab){
        $('#dashboard-menu li').removeClass('active');
        $('#dashboard-menu li .pointer').addClass('hide');
        $('.divTab').addClass('hide');
        $(menu).addClass('active');
        $(menu+' .pointer').removeClass('hide');
        $(tab).removeClass('hide');
    }
    //show sub tab
    $scope.showTab = function(sub, menu, tab){
        $('#dashboard-menu li').removeClass('active');
        $('#dashboard-menu li .pointer').addClass('hide');
        $('.divTab').addClass('hide');
        $('#dashboard-menu li ul')
        $(menu).addClass('active');
        $(menu+' .pointer').removeClass('hide');
        $(tab).removeClass('hide');
    }
}