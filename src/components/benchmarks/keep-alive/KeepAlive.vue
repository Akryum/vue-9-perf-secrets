<template>
  <Benchmark title="DOM-Reusing Router View" class="keep-alive">
    <template #toolbar>
      <VueGroup v-model="page">
        <VueGroupButton :value="false">Simple page</VueGroupButton>
        <VueGroupButton :value="true">Heavy page</VueGroupButton>
      </VueGroup>

      <PlayToggle v-model="play"/>
    </template>

    <template #on>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </template>

    <template #off>
      <router-view/>
    </template>
  </Benchmark>
</template>

<script>

export default {
  data () {
    return {
      play: false,
    }
  },

  computed: {
    page: {
      get () {
        return this.$route.name === 'bench-keep-alive-heavy'
      },
      set (value) {
        if (value) {
          this.$router.push({ name: 'bench-keep-alive-heavy' })
        } else {
          this.$router.push({ name: 'bench-keep-alive' })
        }
      },
    },
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
.keep-alive
  .router-multi-view
    height 100%

  >>>
    .simple-page,
    .deferred-off
      height 100%
      display flex
      flex-direction column
      align-items center
      padding 40px
      box-sizing border-box

      h2:not(:last-child)
        margin-bottom 24px
</style>
