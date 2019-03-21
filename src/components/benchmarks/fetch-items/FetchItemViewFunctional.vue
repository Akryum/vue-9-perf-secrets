<template functional>
  <div class="item">
    <div class="col avatar">
      <img class="avatar-img" :src="props.item.data.avatar" alt="avatar">
    </div>
    <div class="col username">{{ props.item.data.username }}</div>
    <div class="col email">{{ props.item.data.email }}</div>
    <div class="col phone">{{ props.item.data.phone }}</div>
    <div class="col website">{{ props.item.data.website }}</div>
    <div class="col vote">
      <button @click="listeners.vote">+{{ props.item.vote }}</button>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.item
  height 24px
  display flex
  align-items center

  .col
    flex 100% 1 1
    width 0
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    margin-right 6px

    &.avatar
      flex auto 0 0
      width @height

    &.vote
      flex auto 0 0
      width 42px

      >>> button
        width @width

  .avatar-img
    max-height @height
</style>
