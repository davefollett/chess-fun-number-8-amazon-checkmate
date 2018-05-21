const DEFAULT_SQUARE = "O";


function initializeBoard() {
  let board = new Array(8);
  for(let i = 0; i < board.length; i++) {
    board[i] = new Array(DEFAULT_SQUARE,
                         DEFAULT_SQUARE,
                         DEFAULT_SQUARE,
                         DEFAULT_SQUARE,
                         DEFAULT_SQUARE,
                         DEFAULT_SQUARE,
                         DEFAULT_SQUARE,
                         DEFAULT_SQUARE);
  }
  return board;
}



const state = {
    chessboard: initializeBoard()
  }
  
  
  const getters = {
    getSquareValue: (state) => (row, column) => {
      console.log(state.chessboard);
      return state.chessboard[row][column];
    }
  }
  
  
  const actions = {
    test({ commit }) {
      
      commit('CHANGE_SQUARE');
  },
  }
  
  
  const mutations = {
    CHANGE_SQUARE: (state) => {
      let newArray = state.chessboard.map(function(arr) {
        return arr.slice();
      });
      newArray[0][0] = "X";
      state.chessboard = newArray;//[0][0] = "X";
    }
  }
  
  export default {
    state,
    getters,
    actions,
    mutations
  }