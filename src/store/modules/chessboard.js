import Board from '@/lib/board';

  const state = {
    chessboard: new Board(),
  }
  
  const getters = {
    getSquareValue: (state) => (row, column) => {
      return state.chessboard.at(row,column);
    },
    getNumberCheckmate: (state) => {
      return state.chessboard.numberCheckmate;
    },
    getNumberCheck: (state) => {
      return state.chessboard.numberCheck;
    },
    getNumberStalemate: (state) => {
      return state.chessboard.numberStalemate;
    },
    getNumberSafe: (state) => {
      return state.chessboard.numberSafe;
    }
  }
  
  const actions = {
    updateBoard({ commit }, payload) {
      commit('UPDATE_BOARD', payload);
    },
  }
  
  const mutations = {
    UPDATE_BOARD: (state, payload) => {

      let board = new Board();
                    
      board.execute(payload.whiteKing,
                    payload.whiteAmazon);

      state.chessboard = board;
    }
  }

  export default {
    state,
    getters,
    actions,
    mutations
  }

/*
  class CodewarsTests(unittest.TestCase):

    def test_problem_description_example(self):
        self.assertEqual(apb.amazon_check_mate("d3", "e4"), [5, 21, 0, 29])

    def test_case_1(self):
        self.assertEqual(apb.amazon_check_mate("a1", "g5"), [0, 29, 1, 29])

    def test_case_2(self):
        self.assertEqual(apb.amazon_check_mate("a3", "e4"), [1, 32, 1, 23])

    def test_case_3(self):
        self.assertEqual(apb.amazon_check_mate("f3", "f2"), [6, 11, 0, 38])

    def test_case_4(self):
        self.assertEqual(apb.amazon_check_mate("b7", "a8"), [0, 10, 0, 45])

    def test_case_5(self):
        self.assertEqual(apb.amazon_check_mate("f7", "d3"), [4, 28, 1, 21])

    def test_case_6(self):
        self.assertEqual(apb.amazon_check_mate("g2", "c3"), [9, 21, 0, 24])

    def test_case_7(self):
        self.assertEqual(apb.amazon_check_mate("f3", "c1"), [4, 18, 0, 32])

    def test_case_8(self):
        self.assertEqual(apb.amazon_check_mate("d4", "h8"), [0, 18, 0, 36])
        */