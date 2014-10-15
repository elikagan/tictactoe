var MouseOverTestApp = angular.module('MouseOverTestApp', []);

MouseOverTestApp.controller('MOTAController', function ($scope) {


	$scope.cellList = [
	  {status: "G", goPin: "B", holdStatus: ''}, 
	  {status: "G", goPin: "B", holdStatus: ''}, 
	  {status: "G", goPin: "B", holdStatus: ''}, 
	  {status: "G", goPin: "B", holdStatus: ''}, 
	  {status: "G", goPin: "B", holdStatus: ''}, 
	  {status: "G", goPin: "B", holdStatus: ''}, 
	  {status: "G", goPin: "B", holdStatus: ''}, 
	  {status: "G", goPin: "B", holdStatus: ''}, 
	  {status: "G", goPin: "B", holdStatus: ''}
	  ];


	$scope.movecounter = 0;


	$scope.playerPicks = function(currentCell) {
	    if ($scope.movecounter < 10 && $scope.movecounter % 2 == 0 && (currentCell.status == 'G' || currentCell.status == 'H' )&& currentCell.holdStatus == ''){
		    	currentCell.goPin = 'D';
				$scope.movecounter ++;
				currentCell.holdStatus = 'X';
				for (i=0; i< 9; i++){
			        $scope.cellList[i].status = 'H';
			    	currentCell.status = "X";
		        }
		}



	    if ($scope.movecounter < 10 && $scope.movecounter % 2 == 1 && (currentCell.status == 'G' || currentCell.status == 'H' )&& currentCell.holdStatus == ''){
		    	currentCell.goPin = 'E';
				$scope.movecounter ++;
				currentCell.holdStatus = 'O';
				for (i=0; i< 9; i++){
			        $scope.cellList[i].status = 'G';
			    	currentCell.status = "O";
				}
		}

	    console.log($scope.movecounter);
	} 






});