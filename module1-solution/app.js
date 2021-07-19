(function (){
'use strict'

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController ($scope){
  $scope.inputOrder = "";
  $scope.message = "";

  $scope.displayResult = function () {
    var result =
    lunchCheck($scope.inputOrder); //get displayResult

    $scope.message = result;

  };

  function lunchCheck(string){
    var message = $scope.message;
    var items = $scope.inputOrder;

    if (items == 0 )
      message = "Please enter data first"

    else if(items.split(",").length < 4)
      message = "Enjoy!"

    else
      message = "Too Much!"

    return message;
  };

};

})();
