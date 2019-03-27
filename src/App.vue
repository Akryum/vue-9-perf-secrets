<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" exact>Home</router-link>
      <!-- Omitted, not enough performance gains in this example -->
      <!-- Need to find/write a better benchmark for this -->
      <!-- <router-link :to="{ name: 'bench-static' }">Static</router-link> -->
      <router-link :to="{ name: 'bench-functional' }">Functional components</router-link>
      <router-link :to="{ name: 'bench-child' }">Child splitting</router-link>
      <router-link :to="{ name: 'bench-local-var' }">Local var</router-link>
      <router-link :to="{ name: 'bench-hide' }">Reused Dom</router-link>
      <router-link :to="{ name: 'bench-keep-alive' }">Keep alive</router-link>
      <router-link :to="{ name: 'bench-deferred' }">Deferred features</router-link>
      <router-link :to="{ name: 'bench-fetch-items' }">Vuex demo</router-link>
    </div>
    <router-view class="route"/>
  </div>
</template>

<style lang="stylus">
html,
body,
#app
  height: 100%

#app
  display flex
  flex-direction column

#nav
  padding 15px 30px
  flex auto 0 0
  background #2c3e50
  a
    margin-right 24px
    &.router-link-active
      color white

.route
  flex 1
</style>
