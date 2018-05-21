import Vue from 'vue'
import Vuex from 'vuex'
import chessboard from './modules/chessboard';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    chessboard,
  }
})
