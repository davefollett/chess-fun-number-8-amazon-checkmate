<template>
  <div class="center">
    {{ value }}
  </div>
</template>

<script>
export default {
  name: 'ChessSquareLegend',
  props: {
    value: String,
  }
}
</script>

<style scoped>
.center {
  text-align: center;
}
</style>