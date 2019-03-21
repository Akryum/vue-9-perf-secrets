<template>
  <Benchmark title="Static optimizations">
    <template #toolbar>
      <PlayToggle v-model="play"/>
    </template>

    <template #on>
      <StaticOn
        v-for="(n, index) of list"
        :key="index"
        :n="n"
      />
    </template>

    <template #off>
      <StaticOff
        v-for="(n, index) of list"
        :key="index"
        :n="n"
      />
    </template>
  </Benchmark>
</template>

<script>
import StaticOn from './StaticOn.vue'
import StaticOff from './StaticOff.vue'

export default {
  components: {
    StaticOn,
    StaticOff,
  },

  data () {
    return {
      play: false,
      list: [],
    }
  },

  watch: {
    play (value) {
      if (value) this.generate()
    },
  },

  created () {
    this.count = 400
  },

  methods: {
    generate () {
      const data = []
      for (let i = 0; i < this.count; i++) {
        data.push(Math.random() * 300)
      }
      this.list = data
      this.play && requestAnimationFrame(this.generate)
    },
  },
}
</script>
