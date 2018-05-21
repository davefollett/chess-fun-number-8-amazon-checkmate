<template>
  <div>
  <div class="grid">
    <div v-for="(columnName,index) in columnLegend" :key="`top-${index}`">
      <ChessSquare :value="columnName" :hasBorder="false"></ChessSquare>
    </div>
    <div v-for="n in 80" :key="n">
      <ChessSquare v-if="n % 10 === 1 || n % 10 === 0" :hasBorder="false" ></ChessSquare>
      <ChessSquare v-else :row="getRow(n)" :column="getColumn(n)"></ChessSquare>
    </div>
    <div v-for="(columnName,index) in columnLegend" :key="`bottom-${index}`">
      <ChessSquare :value="columnName" :hasBorder="false"></ChessSquare>
    </div>
  </div>
  <button @click="test">TEST</button>
  </div>
</template>


<script>
//<ChessSquare v-if="n % 10 === 1 || n % 10 === 0" :value="rowLegend[n]" :hasBorder="false" ></ChessSquare>
//<ChessSquare v-else :value="`${getRow(n)},${getColumn(n)}`"></ChessSquare>
//<ChessSquare v-else :value="getSquareValue(getRow(n), getColumn(n))"></ChessSquare>
import ChessSquare from '@/components/ChessSquare.vue'

export default {
  name: 'ChessBoard',
  components: {
    ChessSquare
  },
  data () {
    return {
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
      }
    }
  },
  methods: {
    getRow(cellNumber) {
      return Math.floor(cellNumber / 10);
    },
    getColumn(cellNumber) {
      return (cellNumber % 10) -2;
    },
    getSquareValue: function(row, column) {
      //console.log({row,column});
      //console.log(this.$store);
      return this.$store.getters.getSquareValue(row, column);
    },
    test() {
      
      this.$store.dispatch('test');
    }
  },
  /*
  computed: {
    getSquareValue: function(row, column) {
      console.log({row,column});
      //console.log(this.$store);
      return "W";//this.$store.chessboard.getters.getSquareValue(row, column);
    },
  }
  */
}
</script>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-gap: 2px;
    align-items: center;
}

</style>