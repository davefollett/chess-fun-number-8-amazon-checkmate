<template>
  <div :class="[background, 'center']">
    <img :src="require(`@/assets/${imagePath}`)" height="48" width="48">
  </div>
</template>

<script>
export default {
  name: 'ChessSquare',
  props: {
    row: Number,
    column: Number,
  },
  data () {
    return {
      imageLoopup: {
        "A": "amazon.png",
        "K": "king.png",
        "S": "stalemate-blue.png",
        "+": "check-orange.png",
        "X": "checkmate-red.png",
        "B": "blank.png",
        "-": "blank.png",
        "O": "safe-green.png"
      },
    }
  },
  computed: {
    imagePath() {
      return this.imageLoopup[this.$store.getters.getSquareValue(this.row, this.column)];
    },
    background() {
      let result = "even-color";
      if((this.row + this.column) % 2 === 0) {
        result = "odd-color";
      }
      return result;
    }
  }
}
</script>

<style scoped>

.even-color {
  /*background-color: tan;*/
  background-color: #b6876b;
}

.odd-color {
  /*background-color:peru;*/
  /*background-color: #f4dfc1;*/
  background-color: tan;
}
.center {
  text-align: center;
}

.border {
  border-style: solid;
  border-width: 5px;
  text-align: center;
}
</style>