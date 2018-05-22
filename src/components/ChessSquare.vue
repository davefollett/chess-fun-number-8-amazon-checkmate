<template>
  <div class="border">
    {{ value }}
  </div>
</template>

<script>
export default {
  name: 'ChessSquare',
  props: {
    row: Number,
    column: Number,
  },
  computed: {
    value() {
      return this.$store.getters.getSquareValue(this.row, this.column);
    },
  }
}
</script>

<style scoped>

.border {
  border-style: solid;
  border-width: 5px;
  text-align: center;
}
</style>