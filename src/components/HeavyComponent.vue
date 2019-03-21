<template>
  <div
    class="heavy"
    :style="{
      fontSize: `${20 + n / 9999999 * 20}px`,
    }"
  >
    <pre>{{ heavy() }} <span>(n: {{ n }})</span></pre>
  </div>
</template>

<script>
export default {
  props: {
    n: {
      default: 1000000,
    },
  },
  methods: {
    heavy () {
      const n = this.n
      let result = 0
      for (let i = 0; i < n; i++) {
        result += Math.sqrt(Math.cos(Math.sin(Math.random() * 100)))
      }
      return result
    },
  },
}
</script>

<style lang="stylus" scoped>
.heavy
  >>>
    pre
      margin 0
    span
      opacity .75
</style>
