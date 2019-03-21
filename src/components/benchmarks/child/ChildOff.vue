<template>
  <div>
    <div>Message: {{ message }}</div>
    <div>{{ heavy() }}</div>
  </div>
</template>

<script>
export default {
  props: ['message', 'n'],
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
}
</script>
