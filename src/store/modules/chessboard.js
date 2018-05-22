const DEFAULT_SQUARE = "O";
const INIT_SQUARE = "-"

const WHITEKING = "K";
const WHITEAMAZON = "A";
const CHECK = "+";
const SAFE = DEFAULT_SQUARE;
const BLANK = "B";
const CHECKMATE = "X";
const STALEMATE = "S";

function initializeBoard(initialState) {
  let board = new Array(8);
  for(let i = 0; i < board.length; i++) {
    board[i] = new Array(initialState,
                         initialState,
                         initialState,
                         initialState,
                         initialState,
                         initialState,
                         initialState,
                         initialState);
  }
  return board;
}

const state = {
    chessboard: initializeBoard(INIT_SQUARE),
    whiteKing: {},
    whiteAmazon: {},
    numberCheckmate: 0,
    numberCheck: 0,
    numberStalemate: 0,
    numberSafe: 0
  }
  
  
  const getters = {
    getSquareValue: (state) => (row, column) => {
      return state.chessboard[row][column];
    },
    getNumberCheckmate: (state) => {
      return state.numberCheckmate;
    },
    getNumberCheck: (state) => {
      return state.numberCheck;
    },
    getNumberStalemate: (state) => {
      return state.numberStalemate;
    },
    getNumberSafe: (state) => {
      return state.numberSafe;
    }
  }
  
  
  const actions = {
    updateBoard({ commit }, payload) {
      commit('UPDATE_BOARD', payload);
    },
  }
  
  
  const mutations = {
    UPDATE_BOARD: (state, payload) => {
      let newBoard = initializeBoard(DEFAULT_SQUARE);

      state.whiteKing = payload.whiteKing;
      state.whiteAmazon = payload.whiteAmazon;

      newBoard[payload.whiteKing.row][payload.whiteKing.column] = WHITEKING;
      newBoard[payload.whiteAmazon.row][payload.whiteAmazon.column] = WHITEAMAZON;

      newBoard = markCheckLocations(newBoard, state.whiteAmazon);
      newBoard = blankKingAdjacent(newBoard, state.whiteKing);
      newBoard = canMoveSafely(newBoard, state.whiteKing, state.whiteAmazon);

      state.numberCheckmate = computeTotal(newBoard, CHECKMATE);
      state.numberCheck = computeTotal(newBoard, CHECK);
      state.numberStalemate = computeTotal(newBoard, STALEMATE);
      state.numberSafe = computeTotal(newBoard, SAFE);

      state.chessboard = newBoard;
    }
  }
  
  function canMoveSafely(board, king, amazon) {

    /*
    for(let row = 0; row < board.length; row++) {
      for(let column = 0; column < board[row].length; column++) {
        //can this position make a safe move
        //console.log({row,column});
        if(board[row][column] === SAFE || board[row][column] === CHECK) {
          
          if(!isAdjacent(board, row, column, SAFE) {
            
          }
      }
    }
*/
    return board;
  }

  /*
  function isAdjacentAmazonWithAdjacentKing(board, king, amazon) {

  }
*/

  function computeTotal(newBoard, value) {
    return newBoard.reduce(function(accumulator, current) {
      return accumulator.concat(current);
    }).reduce(function(accumulator, current) {
      return current === value ? accumulator+1 : accumulator;
    }, 0);
  }

  function getAdjacentLocations(row, column) {
    return [
      {row: row, column: column-1},
      {row: row-1, column: column-1},
      {row: row-1, column: column},
      {row: row-1, column: column+1},
      {row: row, column: column+1},
      {row: row+1, column: column+1},
      {row: row+1, column: column},
      {row: row+1, column: column-1}
    ];
  }

  function isAdjacent(board, row, column, type) {
    let result = false;
    let adjacent = getAdjacentLocations(row, column);

    adjacent.forEach(function(location) {
      let row = location.row;
      let column = location.column;
      if(onTheBoard(row, column) && board[row][column] === type) {
        result = true;
      }
    });
    return result;
  }

  function blankKingAdjacent(board, king){
    let adjacent = getAdjacentLocations(king.row, king.column);

    adjacent.forEach(function(location) {
      let row = location.row;
      let column = location.column;
      if(onTheBoard(row, column) && board[row][column] !== WHITEAMAZON) {
        board[row][column] = BLANK;
      }
    });

    return board;
  }

  function onTheBoard(row, column) {
    let result = false;

    if((row >= 0 && row <=7) && (column >= 0 && column <= 7)) {
      result = true;
    }
    return result;
  }

  function markCheckTillOccupied(board, amazon, row_inc, column_inc ) {
    let row = amazon.row + row_inc;
    let column = amazon.column + column_inc;
    let foundKing = false;
    while(onTheBoard(row, column) && !foundKing) {
      
      if(board[row][column] === SAFE) {
        board[row][column] = CHECK;
      } else if(board[row][column] === WHITEKING) {
        foundKing = true;
      }
      row += row_inc;
      column += column_inc;
    }
    return board;
  }

  function markCheckAsRook(board, amazon) {
    board = markCheckTillOccupied(board, amazon, -1, 0);
    board = markCheckTillOccupied(board, amazon, 1, 0);
    board = markCheckTillOccupied(board, amazon, 0, -1);
    board = markCheckTillOccupied(board, amazon, 0, 1);
    return board;
  }

  function markCheckAsBishop(board, amazon) {
    board = markCheckTillOccupied(board, amazon, -1, -1);
    board = markCheckTillOccupied(board, amazon, 1, 1);
    board = markCheckTillOccupied(board, amazon, -1, 1);
    board = markCheckTillOccupied(board, amazon, 1, -1);
    return board;
  }

  function markSquareInCheck(board, row, column) {
  
    if(onTheBoard(row, column) && board[row][column] === SAFE) {
      board[row][column] = CHECK;
    }

    return board;
  }

  function markCheckAsKnight(board, amazon) {
  
    board = markSquareInCheck(board, amazon.row-1, amazon.column-2);
    board = markSquareInCheck(board, amazon.row-2, amazon.column-1);
    board = markSquareInCheck(board, amazon.row-2, amazon.column+1);
    board = markSquareInCheck(board, amazon.row-1, amazon.column+2);

    board = markSquareInCheck(board, amazon.row+1, amazon.column+2);
    board = markSquareInCheck(board, amazon.row+2, amazon.column+1);
    board = markSquareInCheck(board, amazon.row+2, amazon.column-1);
    board = markSquareInCheck(board, amazon.row+1, amazon.column-2);
    
    return board;
  }

  function markCheckLocations(board, amazon) {

    board = markCheckAsRook(board, amazon);
    board = markCheckAsBishop(board, amazon);
    board = markCheckAsKnight(board, amazon);
    
    return board;
  }

  export default {
    state,
    getters,
    actions,
    mutations
  }