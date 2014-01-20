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
    };
    //show sub tab
    $scope.showSubTab = function(sub, menu, tab){
        $('#dashboard-menu li').removeClass('active');
        $('#dashboard-menu li .pointer').addClass('hide');
        $('.divTab').addClass('hide');
        $('#dashboard-menu li ul').removeClass('active');
        $(menu+' ul li a').removeClass('active');
        
        $(sub+' a').addClass('active');
        $(menu+' ul').addClass('active');
        $(menu).addClass('active');
        $(menu+' .pointer').removeClass('hide');
        $(tab).removeClass('hide');
    };
}