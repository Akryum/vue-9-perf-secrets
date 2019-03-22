<template>
  <div :style="{ opacity: number / 300 }">
    <ChildComp/>
  </div>
</template>

<script>
export default {
  components: {
    ChildComp: {
      methods: {
        heavy () {
          const n = 100000
          let result = 0
          for (let i = 0; i < n; i++) {
            result += Math.sqrt(Math.cos(Math.sin(42)))
          }
          return result
        },
      },
      render (h) {
        return h('div', this.heavy())
      },
    },
  },
  props: ['number'],
}
</script>
