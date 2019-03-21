<template>
  <div id="particles"></div>
</template>

<script>
import 'particles.js'
import config from '@/particlesjs-config.json'

const particles = window.particlesJS

export default {
  mounted () {
    this.$nextTick(() => {
      particles('particles', config)
    })
  },

  destroyed () {
    window.pJSDom[0].pJS.fn.vendors.destroypJS()
    window.pJSDom = []
  },
}
</script>
