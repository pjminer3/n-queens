/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // creates base blank board object
  var realBoard = new Board({n: n});

  //internal recursive function to add rooks to board
  function addRook(board, numRooks, usedRows, usedCols) { /*firstIndex, secondIndex, thirdIndex*/
    // creates board-array representation to view pieces, along with setting used rows/columns if none are passed in
    var boardRows = board.rows()
    var usedRows = usedRows || [];
    var usedCols = usedCols || [];

    // base case: if we don't need to add any more rooks, return out of recursion
    if (numRooks === 0) { return; }

    // loop through all rows; column index = i
    for (var i = 0; i < boardRows.length; i++) {
      // loop through all columns; column index = j
      for (var j = 0; j < boardRows.length; j++) {
        // check to see if the pointed to space is available, if so, add rook to it and call again with 1 less rook to place
        if (boardRows[i][j] === 0 && !usedRows.includes(i) && !usedCols.includes(j)) {
          board.togglePiece(i, j);
          usedRows.push(i);
          usedCols.push(j);
          return addRook(board, numRooks - 1, usedRows, usedCols);
        }
      }
    }

    return;
  }

  addRook(realBoard, n);
  
  console.log(realBoard.rows());
  var solution = realBoard.rows(); //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});  // n = 3

  function placeRook(rowIdx){
    // base case triggered only when correct solution in last row
    if (rowIdx === n) {
      solutionCount++;
      return;
    }

    // iterating over column index
    for (var i = 0; i < n; i++) {
      board.togglePiece(rowIdx, i);
      // check row and column to see if it fails tests
      if (!board.hasAnyRooksConflicts()) {
        placeRook(rowIdx + 1);
      }
      // toggle piece back
      board.togglePiece(rowIdx, i);
    } 
  }

  placeRook(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;
  var board = new Board({n: n});  

  function placeQueen(rowIdx){
    // base case triggered only when correct solution in last row
    if (rowIdx === n) {
      solution = board.rows();
      return;
    }

    // iterating over column index
    for (var i = 0; i < n; i++) {
      board.togglePiece(rowIdx, i);
      // check row and column to see if it fails tests
      if (!board.hasAnyQueensConflicts()) {
        return placeQueen(rowIdx + 1);
      }
      // toggle piece back
      board.togglePiece(rowIdx, i);
    } 
    solution = 0;
  }

  placeQueen(0);



  // var solution;

  // if (solutionArr.length === 0) {
  //   solution = 0;
  // } else {
  //   solution = solutionArr[0];
  // }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});  

  function placeQueen(rowIdx){
    // base case triggered only when correct solution in last row
    if (rowIdx === n) {
      solutionCount++;
      if (n === 4) {
        console.log(board.rows());
      }
      return;
    }

    // iterating over column index
    for (var i = 0; i < n; i++) {
      board.togglePiece(rowIdx, i);
      // check row and column to see if it fails tests
      if (!board.hasAnyQueensConflicts()) {
        placeQueen(rowIdx + 1);
      }
      // toggle piece back
      board.togglePiece(rowIdx, i);
    } 
  }

  placeQueen(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
