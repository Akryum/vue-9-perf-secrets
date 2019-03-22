<template>
  <div class="benchmark">
    <div class="toolbar">
      <div class="title">
        <div class="title-text">{{ title }}</div>
        <slot name="title"/>
      </div>

      <VueGroup v-model="optimizationEnabled">
        <VueGroupButton
          :value="false"
          :icon-left="!optimizationEnabled ? 'done' : null"
          class="warning"
        >
          Unoptimized
        </VueGroupButton>
        <VueGroupButton
          :value="true"
          :icon-left="optimizationEnabled ? 'done' : null"
          class="primary"
        >
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
  padding 15px 30px
  > *:not(:last-child)
    margin-right 12px

.toolbar,
.title
  display flex
  align-items center

.title
  flex 1
  > *:not(:last-child)
    margin-right 32px

.title-text
  font-size 32px
  font-weight lighter
  white-space nowrap
  overflow hidden
  text-overflow ellipsis

.content
  flex 1
  background black
  overflow hidden
</style>
