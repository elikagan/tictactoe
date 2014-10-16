var MouseOverTestApp = angular.module('MouseOverTestApp', []);

MouseOverTestApp.controller('MOTAController', function ($scope) {


	$scope.cellList = [
	  {status: "A", tStatus: "G", goPin: "B", holdStatus: ''}, 
	  {status: "B", tStatus: "G", goPin: "B", holdStatus: ''}, 
	  {status: "C", tStatus: "G", goPin: "B", holdStatus: ''}, 
	  {status: "D", tStatus: "G", goPin: "B", holdStatus: ''}, 
	  {status: "E", tStatus: "G", goPin: "B", holdStatus: ''}, 
	  {status: "F", tStatus: "G", goPin: "B", holdStatus: ''}, 
	  {status: "G", tStatus: "G", goPin: "B", holdStatus: ''}, 
	  {status: "H", tStatus: "G", goPin: "B", holdStatus: ''}, 
	  {status: "I", tStatus: "G", goPin: "B", holdStatus: ''}
	  ];

	$scope.statusHeadline ="";
	$scope.movecounter = 0;
	$scope.whoWon ="";

  $scope.winCount = [
  {whoIs: "X", wins: 0},
  {whoIs: "O", wins: 0}
  ];

	$scope.playerPicks = function(currentCell) {
	    if ($scope.movecounter < 10 && $scope.movecounter % 2 == 0 && (currentCell.tStatus == 'G' || currentCell.tStatus == 'H' )&& currentCell.holdStatus == ''){
		    	currentCell.goPin = 'D';
				$scope.movecounter ++;
				currentCell.holdStatus = 'X';
				currentCell.status = 'X';
				for (i=0; i< 9; i++){
			        $scope.cellList[i].tStatus = 'H';
			    	currentCell.tStatus = "X";
		        }

		}



	    if ($scope.movecounter < 10 && $scope.movecounter % 2 == 1 && (currentCell.tStatus == 'G' || currentCell.tStatus == 'H' )&& currentCell.holdStatus == ''){
		    	currentCell.goPin = 'E';
				$scope.movecounter ++;
				currentCell.holdStatus = 'O';
				currentCell.status = 'O';
				for (i=0; i< 9; i++){
			        $scope.cellList[i].tStatus = 'G';
			    	currentCell.tStatus = "O";
				}
		}

	    console.log($scope.movecounter);
	    $scope.checkWin();
	} 


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





});