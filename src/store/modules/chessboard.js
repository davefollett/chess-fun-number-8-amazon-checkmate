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
    getWhiteKing: (state) => {
      return state.whiteKing;
    },
    getWhiteAmazon: (state) => {
      return state.whiteAmazon;
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

      state.numberCheckmate = computeTotal(newBoard, CHECKMATE);
      state.numberCheck = computeTotal(newBoard, CHECK);
      state.numberStalemate = computeTotal(newBoard, STALEMATE);
      state.numberSafe = computeTotal(newBoard, SAFE);
      console.log(state.numberCheck);

      state.chessboard = newBoard;
    }
  }
  
  function computeTotal(newBoard, value) {
    return newBoard.reduce(function(accumulator, current) {
      return accumulator.concat(current);
    }).reduce(function(accumulator, current) {
      return current === value ? accumulator+1 : accumulator;
    }, 0);
  }


  function blankKingAdjacent(board, king){
    let adjacent = [
      {row: king.row, column: king.column-1},
      {row: king.row-1, column: king.column-1},
      {row: king.row-1, column: king.column},
      {row: king.row-1, column: king.column+1},
      {row: king.row, column: king.column+1},
      {row: king.row+1, column: king.column+1},
      {row: king.row+1, column: king.column},
      {row: king.row+1, column: king.column-1}
    ];

    adjacent.forEach(function(location) {
      let row = location.row;
      let column = location.column;
      if(onTheBoard(row, column) && board[row][column] !== WHITEAMAZON) {
        board[row][column] = BLANK;
      }
    })

    return board;
  }

  function onTheBoard(row, column) {
    let result = false;

    if((row >= 0 && row <=7) && (column >= 0 && column <= 7)) {
      result = true;
    }
    return result;
  }

  function markCheckUpLeft(board, amazon) {
    let row = amazon.row-1;
    let column = amazon.column-1;
    let foundKing = false;
    while(onTheBoard(row, column) && !foundKing) {
      
      if(board[row][column] === SAFE) {
        board[row][column] = CHECK;
      } else if(board[row][column] === WHITEKING) {
        foundKing = true;
      }
      row--;
      column--;
    }
    return board;
  }

  function markCheckUpRight(board, amazon) {
    let row = amazon.row-1;
    let column = amazon.column+1;
    let foundKing = false;
    while(onTheBoard(row, column) && !foundKing) {
      
      if(board[row][column] === SAFE) {
        board[row][column] = CHECK;
      } else if(board[row][column] === WHITEKING) {
        foundKing = true;
      }
      row--;
      column++;
    }
    return board;
  }

  function markCheckDownLeft(board, amazon) {
    let row = amazon.row+1;
    let column = amazon.column-1;
    let foundKing = false;
    while(onTheBoard(row, column) && !foundKing) {
      
      if(board[row][column] === SAFE) {
        board[row][column] = CHECK;
      } else if(board[row][column] === WHITEKING) {
        foundKing = true;
      }
      row++;
      column--;
    }
    return board;
  }

  function markCheckDownRight(board, amazon) {
    let row = amazon.row+1;
    let column = amazon.column+1;
    let foundKing = false;
    while(onTheBoard(row, column) && !foundKing) {
      
      if(board[row][column] === SAFE) {
        board[row][column] = CHECK;
      } else if(board[row][column] === WHITEKING) {
        foundKing = true;
      }
      row++;
      column++;
    }
    return board;
  }

  function markCheckUp(board, amazon) {
    let row = amazon.row-1;
    let column = amazon.column;
    let foundKing = false;
    while(onTheBoard(row, column) && !foundKing) {
      
      if(board[row][column] === SAFE) {
        board[row][column] = CHECK;
      } else if(board[row][column] === WHITEKING) {
        foundKing = true;
      }
      row--;
    }
    return board;
  }

  function markCheckDown(board, amazon) {
    let row = amazon.row+1;
    let column = amazon.column;
    let foundKing = false;
    while(onTheBoard(row, column) && !foundKing) {
      
      if(board[row][column] === SAFE) {
        board[row][column] = CHECK;
      } else if(board[row][column] === WHITEKING) {
        foundKing = true;
      }
      row++;
    }
    return board;
  }

  function markCheckLeft(board, amazon) {
    let row = amazon.row;
    let column = amazon.column-1;
    let foundKing = false;
    while(onTheBoard(row, column) && !foundKing) {
      
      if(board[row][column] === SAFE) {
        board[row][column] = CHECK;
      } else if(board[row][column] === WHITEKING) {
        foundKing = true;
      }
      column--;
    }
    return board;
  }

  function markCheckRight(board, amazon) {
    let row = amazon.row;
    let column = amazon.column+1;
    let foundKing = false;
    while(onTheBoard(row, column) && !foundKing) {
      
      if(board[row][column] === SAFE) {
        board[row][column] = CHECK;
      } else if(board[row][column] === WHITEKING) {
        foundKing = true;
      }
      column++;
    }
    return board;
  }


  function markCheckAsKnight(board, row, column) {
  
    if(onTheBoard(row, column) && board[row][column] === SAFE) {
      board[row][column] = CHECK;
    }

    return board;
  }

  function markCheckLocations(board, amazon) {
    // Mark the column and row of the amazon as CHECK
    board = markCheckUp(board, amazon);
    board = markCheckDown(board, amazon);
    board = markCheckLeft(board, amazon);
    board = markCheckRight(board, amazon);
    
    // Mark the diag of the amazon as CHECK
    board = markCheckUpLeft(board, amazon);
    board = markCheckUpRight(board, amazon);
    board = markCheckDownLeft(board, amazon);
    board = markCheckDownRight(board, amazon);
    
    board = markCheckAsKnight(board, amazon.row-1, amazon.column-2);
    board = markCheckAsKnight(board, amazon.row-2, amazon.column-1);
    board = markCheckAsKnight(board, amazon.row-2, amazon.column+1);
    board = markCheckAsKnight(board, amazon.row-1, amazon.column+2);

    board = markCheckAsKnight(board, amazon.row+1, amazon.column+2);
    board = markCheckAsKnight(board, amazon.row+2, amazon.column+1);
    board = markCheckAsKnight(board, amazon.row+2, amazon.column-1);
    board = markCheckAsKnight(board, amazon.row+1, amazon.column-2);

    return board;
  }



  export default {
    state,
    getters,
    actions,
    mutations
  }