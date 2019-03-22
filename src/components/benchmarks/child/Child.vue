<template>
  <Benchmark title="Child component splitting">
    <template #toolbar>
      <PlayToggle v-model="play"/>
    </template>

    <template #on>
      <div class="grid">
        <ChildOn
          v-for="(n, index) of list"
          :key="index"
          :number="n"
          class="cell"
        />
      </div>
    </template>

    <template #off>
      <div class="grid">
        <ChildOff
          v-for="(n, index) of list"
          :key="index"
          :number="n"
          class="cell"
        />
      </div>
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

<style lang="stylus" scoped>
.grid
  margin 24px auto
  max-width (20 * 36px)

.cell
  float left
  width 32px
  height @width
  margin 2px
  color transparent
  background #42b983
  border-radius 50%
</style>
