<template>
  <div>
  <div class="grid">
    <div v-for="(columnName,index) in columnLegend" :key="`top-${index}`">
      <chess-square-legend :value="columnName"></chess-square-legend>
    </div>
    <div v-for="n in 80" :key="n">
      <chess-square-legend v-if="n % 10 === 1 || n % 10 === 0" :value="rowLegend[n]"></chess-square-legend>
      <chess-square v-else :row="getRow(n)" :column="getColumn(n)"></chess-square>
    </div>
    <div v-for="(columnName,index) in columnLegend" :key="`bottom-${index}`">
      <chess-square-legend :value="columnName"></chess-square-legend>
    </div>
  </div>
  <label for="white-king">White King</label>
  <input type="text" id="white-king" v-model="whiteKing" placeholder="edit me"/>
  <label for="white-amazon">White Amazon</label>
  <input type="text" id="white-amazon" v-model="whiteAmazon" placeholder="edit me"/>
  <button @click="updateBoard">Submit</button>
  <ul>
    <li>{{numberCheckmate}} Checkmate</li>
    <li>{{numberCheck}} Check</li>
    <li>{{numberStalemate}} Stalemate</li>
    <li>{{numberSafe}} Safe</li>
  </ul>
  </div>
</template>


<script>

import ChessSquare from '@/components/ChessSquare.vue'
import ChessSquareLegend from '@/components/ChessSquareLegend.vue'

export default {
  name: 'ChessBoard',
  components: {
    ChessSquare,
    ChessSquareLegend
  },
  data () {
    return {
      whiteKing: "d3",
      whiteAmazon: "e4",
      columnLegend: [" ", "a", "b", "c", "d", "e", "f", "g", "h", " "],
      rowLegend: {
        1: "8",
        10: "8",
        11: "7",
        20: "7",
        21: "6",
        30: "6",
        31: "5",
        40: "5",
        41: "4",
        50: "4",
        51: "3",
        60: "3",
        61: "2",
        70: "2",
        71: "1",
        80: "1",
      },
    }
  },
  computed: {
    numberCheckmate() {
      return this.$store.getters.getNumberCheckmate;
    },
    numberCheck() {
      return this.$store.getters.getNumberCheck;
    },
    numberStalemate() {
      return this.$store.getters.getNumberStalemate;
    },
    numberSafe() {
      return this.$store.getters.getNumberSafe;
    },
  },
  methods: {
    getRow(cellNumber) {
      return Math.floor(cellNumber / 10);
    },
    getColumn(cellNumber) {
      return (cellNumber % 10) -2;
    },
    updateBoard() {
      this.$store.dispatch('updateBoard', {
        whiteKing: this.whiteKing,
        whiteAmazon: this.whiteAmazon
      });
    }
  },
}
</script>

<style scoped>

.grid {
    display: grid;
    /*grid-template-columns: repeat(10, 1fr);*/
    grid-template-columns: repeat(10, 75px);
    grid-gap: 2px;
    align-items: center;
}

</style>