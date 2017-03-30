document.addEventListener('DOMContentLoaded', startGame)

//Board`object defined
var board = {
    cells: [
              { row:0,
                col:0,
                isMine:true,
                hidden:true,
                isMarked:false,
                surroundingMines:0},
              { row:0,
                col:1,
                isMine:false,
                hidden:true,
                isMarked:false,
                surroundingMines:0},
              { row:0,
                col:2,
                isMine:false,
                hidden:true,
                isMarked:false,
                surroundingMines:0},
              { row:1,
                col:0,
                isMine:false,
                hidden:true,
                isMarked:false,
                surroundingMines:0},
              { row:1,
                col:1,
                isMine:false,
                hidden:true,
                isMarked:false,
                surroundingMines:0},
              { row:1,
                col:2,
                isMine:false,
                hidden:true,
                isMarked:false,
                surroundingMines:0},
              { row:2,
                col:0,
                isMine:false,
                hidden:true,
                isMarked:false,
                surroundingMines:0},
              { row:2,
                col:1,
                isMine:false,
                hidden:true,
                isMarked:false,
                surroundingMines:0},
              { row:2,
                col:2,
                isMine:false,
                hidden:true,
                isMarked:false,
                surroundingMines:0}
            ]

};

//loop through all cells to listen for clicks
function startGame () {
  lib.initBoard();
  for (var i=0; i<board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
};
  document.addEventListener ('click', checkForWin);
  document.addEventListener ('contextmenu', checkForWin);
};


//check for win on board
function checkForWin () {
  var countMarked= 0;
  for (var i=0; i<board.cells.length; i++) {
    //if a cell is not a mine and not hidden, add one to count
    if ((board.cells[i].isMine !== true) && (board.cells.[i].hidden !== true)) {
      countMarked ++;
      //if a cell is a mine and has been marked, add one to the count
    } else if (board.cells[i].isMine && board.cells[i].isMarked) {
      countMarked ++;
      //otherwise, add nothing to the count
    } else {
      return;
    }
  }
  //once all cells are marked or not hidden, counts will add to 8 and a win
  if (countMarked = 8) {
    lib.displayMessage("Crushed it!");
  }
}



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
