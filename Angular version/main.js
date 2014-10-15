var TTTApp = angular.module('TTTApp', []);

TTTApp.controller('TTTController', function ($scope) {

  $scope.cellList = [
  {status: "A", goPin: ""}, 
  {status: "B", goPin: ""}, 
  {status: "C", goPin: ""}, 
  {status: "D", goPin: ""}, 
  {status: "E", goPin: ""}, 
  {status: "F", goPin: ""}, 
  {status: "G", goPin: ""}, 
  {status: "H", goPin: ""}, 
  {status: "I", goPin: ""}
  ];

  $scope.winCount = [
  {whoIs: "X", wins: 0},
  {whoIs: "O", wins: 0}
  ];

  ////LOGIC FOR PLAY AGAIN BUTTON VISIBILITY

  $scope.myVar = true;
  $scope.toggle = function() {
      $scope.myVar = !$scope.myVar;
  };

/// LOGIC FOR PLAY AGAIN BUTTON FUNCTIONALITY
$scope.resetAll = function() {
  $scope.movecounter = 0;
  $scope.whoWon = "";
  $scope.cellList = [
  {status: "A", goPin: "", hoverPin: false}, 
  {status: "B", goPin: "", hoverPin: false}, 
  {status: "C", goPin: "", hoverPin: false}, 
  {status: "D", goPin: "", hoverPin: false}, 
  {status: "E", goPin: "", hoverPin: false}, 
  {status: "F", goPin: "", hoverPin: false}, 
  {status: "G", goPin: "", hoverPin: false}, 
  {status: "H", goPin: "", hoverPin: false}, 
  {status: "I", goPin: "", hoverPin: false}
  ];
  $scope.statusHeadline = "";
}


///HOVER LOGIC
  $scope.hoverHandlerIn = function($event){
    if($scope.movecounter % 2==0){
      console.log("mouse in X");
          }

  if($scope.movecounter % 2==1){
      console.log("mouse in O");
          }
  };

    $scope.hoverHandlerOut = function($event){
    if($scope.movecounter % 2==0){
      console.log("mouse out of X");
          }

  if($scope.movecounter % 2==1){
      console.log("mouse out of O");
          }
  };



///Variables for win / click logic
 
  $scope.movecounter = 0 ;
  $scope.statusHeadline = "";
  $scope.whoWon ="";

///CLick logic
  $scope.playerPicks = function(currentCell) {
    if ($scope.movecounter % 2 == 0 && currentCell.goPin == ""){
      currentCell.status = "X" ;
      currentCell.goPin = "X";
      $scope.movecounter = $scope.movecounter + 1 ;
  
    } 
    if ($scope.movecounter % 2 == 1 && currentCell.goPin == ""){
      currentCell.status = "O" ;
      currentCell.goPin = "O";

      $scope.movecounter = $scope.movecounter + 1 ;

    } 
    console.log("Cell is now: " + currentCell.status + $scope.movecounter) ;

    $scope.checkWin();
  } ;


///Win logic
$scope.checkWin = function(cellList) {
  if(($scope.cellList[0].status === $scope.cellList[1].status && $scope.cellList[2].status === $scope.cellList[1].status)|| ($scope.cellList[3].status === $scope.cellList[4].status && $scope.cellList[4].status === $scope.cellList[5].status)|| ($scope.cellList[6].status === $scope.cellList[7].status && $scope.cellList[7].status === $scope.cellList[8].status) || ($scope.cellList[0].status === $scope.cellList[3].status && $scope.cellList[3].status === $scope.cellList[6].status) || ($scope.cellList[1].status === $scope.cellList[4].status && $scope.cellList[4].status === $scope.cellList[7].status) || ($scope.cellList[2].status === $scope.cellList[5].status && $scope.cellList[5].status === $scope.cellList[8].status) || ($scope.cellList[6].status === $scope.cellList[4].status && $scope.cellList[4].status === $scope.cellList[2].status) || ($scope.cellList[0].status === $scope.cellList[4].status && $scope.cellList[4].status === $scope.cellList[8].status)) {
    
      if($scope.movecounter % 2 == 1){
        $scope.statusHeadline = "X WINS!!!";
        $scope.whoWon='X';
        $scope.winCount[0].wins++;
        console.log($scope.winCount[0]);
        $scope.toggle($scope.myVar);
      
      };

      if($scope.movecounter % 2 == 0){
        $scope.statusHeadline = "O WINS!!!";
        $scope.whoWon= 'O';
        $scope.winCount[1].wins++;
        console.log($scope.winCount[1]);
        $scope.toggle($scope.myVar);

      };

    console.log('checkwin working');
  }

  if($scope.movecounter == 9 && $scope.whoWon ==""){
      $scope.statusHeadline = "IT'S A TIE.";
      $scope.toggle($scope.myVar);

      };

};







}) ;