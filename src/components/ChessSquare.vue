<template>
  <div :class="{ border: hasBorder }">
    {{ value }}
  </div>
</template>

<script>
export default {
  name: 'ChessSquare',
  props: {
    //value: String,
    row: Number,
    column: Number,
    hasBorder: {
      default: true,
      type: Boolean
    }
  },
  computed: {
    value() {
      if(!this.hasBorder) return "x";
      return this.$store.getters.getSquareValue(this.row, this.column);
    },
  }
}
</script>

<style scoped>
.border {
  border-style: solid;
  border-width: 5px;
}
</style>