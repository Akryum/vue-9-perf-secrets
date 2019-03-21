<template>
  <div class="benchmark">
    <div class="toolbar">
      <div class="title">{{ title }}</div>
      <VueGroup v-model="optimizationEnabled">
        <VueGroupButton :value="false">Unoptimized</VueGroupButton>
        <VueGroupButton class="primary" icon-left="done" :value="true">
          {{ optimizedLabel || 'Optimized' }}
        </VueGroupButton>
      </VueGroup>
      <slot name="toolbar"/>
    </div>

    <div class="content">
      <slot v-if="optimizationEnabled" name="on"/>
      <slot v-else name="off"/>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    optimizedLabel: String,
  },

  data () {
    return {
      optimizationEnabled: false,
    }
  },
}
</script>

<style lang="stylus" scoped>
.benchmark
  display flex
  flex-direction column

.toolbar
  flex auto 0 0
  display flex
  align-items center
  padding 15px 30px
  > *:not(:last-child)
    margin-right 12px

.title
  font-size 32px
  font-weight lighter
  flex 1
  white-space nowrap
  overflow hidden
  text-overflow ellipsis

.content
  flex 1
  background black
</style>
