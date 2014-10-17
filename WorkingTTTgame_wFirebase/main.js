var TicTacToeApp = angular.module('TicTacToeApp', ["firebase"]);

TicTacToeApp.controller('TTTController', function ($scope,$firebase) {

// Connects local to DB

	$scope.remoteGameContainer =
	$firebase(new Firebase("https://elitictactoe.firebaseio.com/databaseGameContainer")) ;

// TIC TAC TOE BOARD ARRAY - cellList is ng-repeated through to create the board in the view. The initial attribute values are used throughout this js to control styling and win logic. status is used to evaluate win logic. tStatus and goPin are tied into the hover state toggle and the ng-class directive that controls the tiles styling and clicked status. holdStatus is used in the click logic to determine if cell can be clicked.

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

// GLOBAL VARIABLES - myVar is used by the hide gameover container logic. statusHeadline is the headline that says the result of the game. It's empty at first. whoWon is set by the checkWin function if a player has won. It's also used at the end of the checkWin function to tell the headline status what to print in the gameover container. 

 	$scope.myVar = true;
	$scope.statusHeadline ="";
	$scope.movecounter = 0;
	$scope.whoWon ="";
	$scope.whoWonV="";

// WIN COUNT ARRAY - This array stores the win count.

	$scope.winCount = [
	{whoIs: "X", wins: 0},
	{whoIs: "O", wins: 0}
	];

// This container object is what gets synced:
	
	$scope.gameContainer = {
	FBcellList: $scope.cellList,
	FBmovecounter: $scope.movecounter,
	FBwinCount: $scope.winCount,
	FBwhoWon: $scope.whoWon,
	FBwhoWon: $scope.whoWonV,
	FBmyVar: $scope.myVar,
	FBstatusHeadline: $scope.statusHeadline,
	} ;

// This is the binding logic
   
	$scope.remoteGameContainer.$bind($scope, "gameContainer") ;

// This watches for changes in DB and updates them locally.

	$scope.$watch('gameContainer', function() {
	console.log('gameContainer changed!') ;
	}) ;

// SHOW / HIDE GAME OVER / PLAY AGAIN - Logic for "gameOverContainer" and "play again button" visibility. This works using ng-hide in the html. When FBmyVar is true, container and button are hidden. This function makes it false and thus makes them visible.
 
	$scope.toggle = function() {
		$scope.gameContainer.FBmyVar = !$scope.gameContainer.FBmyVar;
	};

// RESET ALL / PLAY AGAIN - Logic for play again button. This resetAll function resets all the relevant variables to their initial state and thus blanks out the board.

	$scope.resetAll = function() {
	$scope.gameContainer.FBmovecounter = 0;
	$scope.gameContainer.FBwhoWon = "";
	$scope.gameContainer.FBcellList = [
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
	console.log('All clear 2');
	}


// CLICK LOGIC - playerPicks() is called via ng-click in the html. The logic is tied to a particular cell. It evaluates the movecounter and decides whose turn it is based on an even/odd check. There are two overarching 'if' statements. One for X's turn, one for O's. The if statements also confirms that there are fewer than 10 (i.e no more than 9) total moves. Theres also logic that determines if currentCell has already been clicked. It does this by evaluating the currentCell.holdStatus value. If its set to " ", then the cell hasn't been clicked. currentCell.tStatus 'G' || 'H' is tied to the hover state for the next turn. Each time this function runs, it sets all the tStatus values of FBcellList to 'G' if O's turn is next and 'H' if X's turn is next. currentCell.goPin = 'D' (and 'E' in the next if stmt) set's the tile to clicked and is tied through the ng-class directive in the html. The currentCell.holdStatus = 'X' (or 'O' in next if stmt) indicates that the tile is an 'X' or 'O'. The for loop at the end of the if stmt goes through FBcellList and toggles tStatus's so that the unclicked tiles have the hover state of the next player. At the end of this function I call checkWin to determine if theres been a winner.

	$scope.playerPicks = function(currentCell) {
	    if ($scope.gameContainer.FBmovecounter < 10 && $scope.gameContainer.FBmovecounter % 2 == 0 && (currentCell.tStatus == 'G' || currentCell.tStatus == 'H' )&& currentCell.holdStatus == ''){
		    	currentCell.goPin = 'D';
				$scope.gameContainer.FBmovecounter ++;
				currentCell.holdStatus = 'X';
				currentCell.status = 'X';
				for (i=0; i< 9; i++){
			        $scope.gameContainer.FBcellList[i].tStatus = 'H';
			    	currentCell.tStatus = "X";
		        }
		}

	    if ($scope.gameContainer.FBmovecounter < 10 && $scope.gameContainer.FBmovecounter % 2 == 1 && (currentCell.tStatus == 'G' || currentCell.tStatus == 'H' )&& currentCell.holdStatus == ''){
		    	currentCell.goPin = 'E';
				$scope.gameContainer.FBmovecounter ++;
				currentCell.holdStatus = 'O';
				currentCell.status = 'O';
				for (i=0; i< 9; i++){
			        $scope.gameContainer.FBcellList[i].tStatus = 'G';
			    	currentCell.tStatus = "O";
				}
		}
	    console.log($scope.gameContainer.FBmovecounter);
	    $scope.checkWin();
	} 


// WIN LOGIC - checkWin evaluates FBcellList[0-8].status against the eight possible winning combos in tic tac toe. It's set up as an "or" stmt full of 'and' stmts. Thus if any 1 of the "or" stmts evaluates to true, the logic after the if stmt fires.


	$scope.checkWin = function(FBcellList) {
	  if(($scope.gameContainer.FBcellList[0].status === $scope.gameContainer.FBcellList[1].status && $scope.gameContainer.FBcellList[2].status === $scope.gameContainer.FBcellList[1].status)|| ($scope.gameContainer.FBcellList[3].status === $scope.gameContainer.FBcellList[4].status && $scope.gameContainer.FBcellList[4].status === $scope.gameContainer.FBcellList[5].status)|| ($scope.gameContainer.FBcellList[6].status === $scope.gameContainer.FBcellList[7].status && $scope.gameContainer.FBcellList[7].status === $scope.gameContainer.FBcellList[8].status) || ($scope.gameContainer.FBcellList[0].status === $scope.gameContainer.FBcellList[3].status && $scope.gameContainer.FBcellList[3].status === $scope.gameContainer.FBcellList[6].status) || ($scope.gameContainer.FBcellList[1].status === $scope.gameContainer.FBcellList[4].status && $scope.gameContainer.FBcellList[4].status === $scope.gameContainer.FBcellList[7].status) || ($scope.gameContainer.FBcellList[2].status === $scope.gameContainer.FBcellList[5].status && $scope.gameContainer.FBcellList[5].status === $scope.gameContainer.FBcellList[8].status) || ($scope.gameContainer.FBcellList[6].status === $scope.gameContainer.FBcellList[4].status && $scope.gameContainer.FBcellList[4].status === $scope.gameContainer.FBcellList[2].status) || ($scope.gameContainer.FBcellList[0].status === $scope.gameContainer.FBcellList[4].status && $scope.gameContainer.FBcellList[4].status === $scope.gameContainer.FBcellList[8].status)) {
    
//XWINS - This is logic telling the function what to do if a winner has deen detected. The movecounter is used to decide which player has won. It directs the FBstatusHeadline to print the win headline. It sets the whoWon variable. And it toggles FBmyVar which fires the gameover container.

	      if($scope.gameContainer.FBmovecounter % 2 == 1){
	        $scope.gameContainer.FBstatusHeadline = "X WINS!!!";
	        $scope.gameContainer.FBwhoWon='X';
	        $scope.gameContainer.FBwhoWonV='X';
	        $scope.gameContainer.FBwinCount[0].wins++;
	        console.log($scope.gameContainer.FBwinCount[0]);
	        $scope.toggle($scope.gameContainer.FBmyVar);    
	      };

//OWINS - This is logic telling the function what to do if a winner has deen detected. The movecounter is used to decide which player has won. It directs the FBstatusHeadline to print the win headline. It sets the whoWon variable. And it toggles FBmyVar which fires the gameover container.

	      if($scope.gameContainer.FBmovecounter % 2 == 0){
	        $scope.gameContainer.FBstatusHeadline = "O WINS!!!";
	        $scope.gameContainer.FBwhoWon= 'O';
	        $scope.gameContainer.FBwhoWonV= 'O';
	        $scope.gameContainer.FBwinCount[1].wins++;
	        console.log($scope.gameContainer.FBwinCount[1]);
	        $scope.toggle($scope.gameContainer.FBmyVar);

	      };

	    console.log('checkwin working');
  	}

//ITS A TIE - This is logic telling the function what to do if it's a ties: no winner has been detected and counter reaches 9. It directs the FBstatusHeadline to print the "It's a tie" headline. And it toggles FBmyVar which fires the gameover container.


	  if($scope.gameContainer.FBmovecounter == 9 && $scope.gameContainer.FBwhoWon ==""){
	      $scope.gameContainer.FBstatusHeadline = "IT'S A TIE.";
	      $scope.gameContainer.FBwhoWonV= 'T';
	      $scope.toggle($scope.gameContainer.FBmyVar);
	  };
	};
});