<template>
  <div class="grid">
    <div v-for="columnName in columnLegend" :key="`top-${columnName}`">
      <ChessSquare :value="columnName" :hasBorder="false"></ChessSquare>
    </div>
    <div v-for="n in 80" :key="n">
      <ChessSquare :value="n.toString()"></ChessSquare>
    </div>
    <div v-for="columnName in columnLegend" :key="`bottom-${columnName}`">
      <ChessSquare :value="columnName" :hasBorder="false"></ChessSquare>
    </div>
  </div>
</template>

<script>
import ChessSquare from '@/components/ChessSquare.vue'

export default {
  name: 'ChessBoard',
  components: {
    ChessSquare
  },
  data () {
    return {
      columnLegend: [" ", "a", "b", "c", "d", "e", "f", "g", "h", " "]
    }
  }
}
</script>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-gap: 2px;
}
</style>