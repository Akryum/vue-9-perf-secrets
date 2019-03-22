<template>
  <div :style="{ opacity: start / 300 }">{{ result }}</div>
</template>

<script>
export default {
  props: ['start'],
  computed: {
    base () {
      return 42
    },
    result () {
      let result = this.start
      for (let i = 0; i < 1000; i++) {
        result += Math.sqrt(Math.cos(Math.sin(this.base))) + this.base * this.base + this.base + this.base * 2 + this.base * 3
      }
      return result
    },
  },
}
</script>
