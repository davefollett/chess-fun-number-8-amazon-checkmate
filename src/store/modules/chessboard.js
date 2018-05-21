const DEFAULT_SQUARE = "O";
const INIT_SQUARE = "-"

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
    chessboard: initializeBoard(INIT_SQUARE)
  }
  
  
  const getters = {
    getSquareValue: (state) => (row, column) => {
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
      let newBoard = initializeBoard(DEFAULT_SQUARE);
      newBoard[0][0] = "X";



      
      state.chessboard = newBoard;
    }
  }
  
  export default {
    state,
    getters,
    actions,
    mutations
  }