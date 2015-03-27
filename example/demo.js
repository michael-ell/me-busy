angular.module('app', ['me.busy'])
    .controller('a', ['$scope', '$timeout', function($scope, $timeout){
        $scope.header = "I'm doing something...";
        $scope.busy = true;
        $timeout(function(){
            $scope.busy = false;
            $scope.header = "I'm done!"
        }, 5000);
    }])
    .controller('b', ['$scope', '$timeout', function($scope, $timeout){
        $scope.header = "I'm also doing something...";
        $scope.isBusy = true;
        $timeout(function(){
            $scope.isBusy = false;
            $scope.header = "I'm also done!"
        }, 8000);
    }]);
