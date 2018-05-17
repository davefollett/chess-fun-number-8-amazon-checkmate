<template>
  <div :class="{ border: hasBorder }">
    {{ value }}
  </div>
</template>

<script>
export default {
  name: 'ChessSquare',
  props: {
    value: String,
    hasBorder: {
      default: true,
      type: Boolean
    }
  },
  /*
  computed: {
      hasBorder() {
        return this.$store.getters.isLeaderboardLoading;
      },
      */
}
</script>

<style scoped>
.border {
  border-style: solid;
  border-width: 5px;
}
</style>