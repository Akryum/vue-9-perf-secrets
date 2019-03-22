<template>
  <Benchmark title="Deferred features">
    <template #toolbar>
      <VueGroup v-model="page">
        <VueGroupButton :value="false">Simple page</VueGroupButton>
        <VueGroupButton :value="true">Heavy page</VueGroupButton>
      </VueGroup>

      <PlayToggle v-model="play"/>
    </template>

    <template #on>
      <DeferredOn v-if="page" class="defer-page"/>
      <SimplePage v-else class="defer-page"/>
    </template>

    <template #off>
      <DeferredOff v-if="page" class="defer-page"/>
      <SimplePage v-else class="defer-page"/>
    </template>
  </Benchmark>
</template>

<script>
import SimplePage from './SimplePage.vue'
import DeferredOn from './DeferredOn.vue'
import DeferredOff from './DeferredOff.vue'

export default {
  components: {
    SimplePage,
    DeferredOn,
    DeferredOff,
  },

  data () {
    return {
      page: false,
      play: false,
    }
  },

  watch: {
    play (value) {
      if (value) {
        this.togglePage()
      } else {
        clearTimeout(this.$_timer)
      }
    },
  },

  created () {
    this.count = 300
  },

  methods: {
    togglePage () {
      this.page = !this.page
      if (this.play) {
        this.$_timer = setTimeout(this.togglePage, 2000)
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
.defer-page
  height 100%
  display flex
  flex-direction column
  align-items center
  padding 40px
  box-sizing border-box

  >>> h2:not(:last-child)
    margin-bottom 24px
</style>
