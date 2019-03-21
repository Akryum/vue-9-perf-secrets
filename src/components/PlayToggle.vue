<template>
  <VueButton v-if="value" class="danger play-toggle" icon-left="stop" @click="$emit('input', false)">Stop</VueButton>
  <VueButton v-else class="accent play-toggle" icon-left="play_arrow" @click="$emit('input', true)">Play</VueButton>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },
}
</script>

<style lang="stylus" scoped>
.play-toggle
  width 100px
</style>
