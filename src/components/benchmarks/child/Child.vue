<template>
  <Benchmark title="Child component splitting">
    <template #toolbar>
      <PlayToggle v-model="play"/>
    </template>

    <template #on>
      <ChildOn
        v-for="(n, index) of list"
        :key="index"
        :message="n"
        :n="100000"
      />
    </template>

    <template #off>
      <ChildOff
        v-for="(n, index) of list"
        :key="index"
        :message="n"
        :n="100000"
      />
    </template>
  </Benchmark>
</template>

<script>
import ChildOn from './ChildOn.vue'
import ChildOff from './ChildOff.vue'

export default {
  components: {
    ChildOn,
    ChildOff,
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
    this.generate()
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
