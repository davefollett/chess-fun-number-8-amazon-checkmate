const DEFAULT_SQUARE = "O";
const INIT_SQUARE = "-"

const WHITEKING = "K";
const WHITEAMAZON = "A";


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
    updateBoard({ commit }, payload) {
      commit('UPDATE_BOARD', payload);
    },
  }
  
  
  const mutations = {
    UPDATE_BOARD: (state, payload) => {
      let newBoard = initializeBoard(DEFAULT_SQUARE);

      newBoard[payload.whiteKing.row][payload.whiteKing.column] = WHITEKING;
      newBoard[payload.whiteAmazon.row][payload.whiteAmazon.column] = WHITEAMAZON;

      state.chessboard = newBoard;
    }
  }
  
  export default {
    state,
    getters,
    actions,
    mutations
  }