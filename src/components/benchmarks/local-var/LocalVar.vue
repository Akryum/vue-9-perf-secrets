<template>
  <Benchmark title="Local variables">
    <template #toolbar>
      <PlayToggle v-model="play"/>
    </template>

    <template #on>
      <LocalVarOn
        v-for="(n, index) of list"
        :key="index"
        :start="n"
      />
    </template>

    <template #off>
      <LocalVarOff
        v-for="(n, index) of list"
        :key="index"
        :start="n"
      />
    </template>
  </Benchmark>
</template>

<script>
import LocalVarOn from './LocalVarOn.vue'
import LocalVarOff from './LocalVarOff.vue'

export default {
  components: {
    LocalVarOn,
    LocalVarOff,
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
    this.count = 300
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
