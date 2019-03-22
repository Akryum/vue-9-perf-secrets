<template>
  <Benchmark title="Local variables">
    <template #toolbar>
      <PlayToggle v-model="play"/>
    </template>

    <template #on>
      <div class="grid">
        <LocalVarOn
          v-for="(n, index) of list"
          :key="index"
          :start="n"
          class="cell"
        />
      </div>
    </template>

    <template #off>
      <div class="grid">
        <LocalVarOff
          v-for="(n, index) of list"
          :key="index"
          :start="n"
          class="cell"
        />
      </div>
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
