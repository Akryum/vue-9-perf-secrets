<template>
  <div
    class="a b c d e"
    :class="{ even: n % 2 === 0}"
    style="margin-top: 4px;"
    :style="{
      opacity: n/100,
    }"
  >
    <div
      class="x y z"
      :class="{ uneven: n % 2 !== 0}"
      style="color: green; font-weight: bold; font-family: monospace;"
    >{{ n }}
    </div>
    <div class="e f g h">Hello</div>
  </div>
</template>

<script>
export default {
  props: ['n'],
}
</script>
