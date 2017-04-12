document.addEventListener('DOMContentLoaded', startGame)

//Random Board
var rowLength = 5;
var colLength = 5;
var board = {
  cells:[]
};

//loop through all cells to listen for clicks
function startGame () {
  newBoard();
  for (var i=0; i<board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
};
  lib.initBoard();
  document.addEventListener ('click', checkForWin);
  document.addEventListener ('contextmenu', checkForWin);
};

//Set up the new board
function newBoard() {
  for (var i = 0; i< rowLength; i++) {
    for (var x =0; x< colLength; x++) {
      var newCell = {
        row: i,
        col: x,
        isMine: false,
        isMarked: false,
        hidden: true,
        surroundingMines: 0
      }
      board.cells.push(newCell);
    }
  }
  //randomly plant the bombs around the board
  var mineCount = 0;
  var maxMines = 4;
  while (mineCount < maxMines) {
    var randomCell = Math.floor(Math.random() * 25)
    if (board.cells[randomCell].isMine === false) {
      (board.cells[randomCell].isMine = true)
      mineCount ++
    }
  }
}

//Play sound for winning
function audioClip(type) {
  if (type==='winner') {
    var audio = document.getElementsByTagName('audio')[0];
  }
  audio.play();
  /*else if (type==='lose') {
    var audio = doucment.getElementByTagName('audio')[1];
    audio.play();
  }*/
}


//check for win on board
function checkForWin () {
  var countMarked= 0;
  for (var i=0; i<board.cells.length; i++) {
    //if a cell is not a mine and not hidden, add one to count
    if ((board.cells[i].isMine !== true) && (board.cells[i].hidden !== true)) {
      countMarked ++;
      //if a cell is a mine and has been marked, add one to the count
    } else if (board.cells[i].isMine && board.cells[i].isMarked) {
      countMarked ++;
      //otherwise, add nothing to the count
    } else {
      return;
    }
  }
  //once all cells are marked or not hidden, counts will add to 24 and a win
  if (countMarked = 24) {
    lib.displayMessage("You really are a Fanastic Fox!");
    soundClip('winner');
  }
}

//reset the game
function resetGame(){
  location.reload();
}




//Count for surrounding Mines
function countSurroundingMines (cell) {
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
  var count = 0;
  for (var i=0; i<surroundingCells.length; i++){
    if (surroundingCells[i].isMine == true){
      count ++;
    }
  }
  return count;
}
