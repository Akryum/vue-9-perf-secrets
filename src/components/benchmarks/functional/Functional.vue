<template>
  <Benchmark title="Functional components">
    <template #toolbar>
      <PlayToggle v-model="play"/>
    </template>

    <template #on>
      <div class="grid">
        <!-- We force re-creating the component using `key` -->
        <FunctionalOn
          v-for="n of list"
          :key="uid++"
          :value="n"
        />
      </div>
    </template>

    <template #off>
      <div class="grid">
        <!-- We force re-creating the component using `key` -->
        <FunctionalOff
          v-for="n of list"
          :key="uid++"
          :value="n"
        />
      </div>
    </template>
  </Benchmark>
</template>

<script>
import FunctionalOn from './FunctionalOn.vue'
import FunctionalOff from './FunctionalOff.vue'

export default {
  components: {
    FunctionalOn,
    FunctionalOff,
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
    this.count = 800

    // Force re-creating the components with a unique id
    this.uid = 0

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
  max-width (32 * 28px)
  >>> .cell
    float left
    width 24px
    height @width
    margin 2px
    .on, .off
      width 100%
      height @width
      color transparent
      border-radius 50%
    .on
      background #2c3e50
    .off
      background #4f6f7f
</style>
