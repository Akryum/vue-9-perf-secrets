<template>
  <div>
    <div>Message: {{ message }}</div>
    <ChildComp :n="n"/>
  </div>
</template>

<script>
export default {
  components: {
    ChildComp: {
      props: ['n'],
      methods: {
        heavy () {
          const n = this.n
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
  props: ['message', 'n'],
}
</script>
