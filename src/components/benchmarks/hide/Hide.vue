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
    this.generate()
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
  margin 24px auto
  max-width (20 * 36px)
  >>> .cell
    float left
    width 32px
    height @width
    margin 2px
    .on, .off
      width 100%
      height @width
      box-sizing border-box
      border-radius 50%
      .heavy
        border none
        box-shadow 0 0 5px black
        opacity .5
        margin 0
        width 100% !important
        height 100% !important
    .on
      background grey
    .off
      background black
</style>
