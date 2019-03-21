<template>
  <Benchmark title="Reuse DOM with v-show">
    <template #toolbar>
      <PlayToggle v-model="play"/>
    </template>

    <template #on>
      <div class="grid">
        <HideOn
          v-for="(n, index) of list"
          :key="index"
          :value="n"
        />
      </div>
    </template>

    <template #off>
      <div class="grid">
        <HideOff
          v-for="(n, index) of list"
          :key="index"
          :value="n"
        />
      </div>
    </template>
  </Benchmark>
</template>

<script>
import HideOn from './HideOn.vue'
import HideOff from './HideOff.vue'

export default {
  components: {
    HideOn,
    HideOff,
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
    this.count = 200
  },

  methods: {
    generate () {
      const data = []
      for (let i = 0; i < this.count; i++) {
        data.push(Math.random() < 0.5)
      }
      this.list = data
      this.play && requestAnimationFrame(this.generate)
    },
  },
}
</script>

<style lang="stylus" scoped>
.grid
  overflow hidden
  margin 24px auto
  max-width (10 * 24px)
  >>> .cell
    float left
    width 24px
    height @width
    .on, .off
      width 100%
      height @width
      color transparent
    .on
      background #2c3e50
    .off
      background #4f6f7f
</style>
