<template>
  <div
    class="heavy"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
    }"
  >
    <pre>{{ heavy() }}</pre>
  </div>
</template>

<script>
export default {
  props: {
    n: {
      default: 1000000,
    },
  },

  computed: {
    size () {
      return 20 + this.n / 9999999 * 40
    },
  },

  methods: {
    heavy () {
      const n = this.n
      let result = 0
      for (let i = 0; i < n; i++) {
        result += Math.tan(Math.sqrt(Math.cos(Math.sin(Math.random() * 100))))
      }
      return result
    },
  },
}
</script>

<style lang="stylus" scoped>
.heavy
  background lighten(#6806c1, 30%)
  border black 5px solid
  border-radius 50%
  >>>
    pre
      margin 0
      opacity 0
</style>
