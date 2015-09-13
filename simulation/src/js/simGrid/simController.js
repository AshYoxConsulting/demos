
'use strict';

module.exports = function($scope) {
  $scope.fixedInputData={
    'Capacity':890,
    'MaxLimit':850,
    'StableLimit': 450
  };
  $scope.editing=false;

  $scope.saveState=function(){
    console.log("save to server..");
     console.log($scope.fixedInputData);
     $scope.editing=false;
  }

};
