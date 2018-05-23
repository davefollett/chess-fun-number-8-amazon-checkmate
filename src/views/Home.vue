<template>
  <div class="home">
    <h2> Codewars Solution Tester: <a href="https://www.codewars.com/kata/chess-fun-number-8-amazon-checkmate" target="_blank">Chess Fun #8: Amazon Checkmate</a></h2>
    <ChessBoard></ChessBoard>
  </div>
</template>

<script>
// @ is an alias to /src
import ChessBoard from '@/components/ChessBoard.vue'

export default {
  name: 'home',
  components: {
    ChessBoard
  }
}
</script>
