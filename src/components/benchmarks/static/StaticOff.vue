<template>
  <div
    :class="['a', 'b', 'c', 'd', 'e', { even: n % 2 === 0}]"
    :style="{
      marginTop: '4px',
      opacity: n/100,
    }"
  >
    <div
      :class="['x', 'y', 'z', { uneven: n % 2 !== 0}]"
      :style="{
        color: 'green',
        fontSize: 'bold',
        fontFamily: 'monospace',
      }"
    >{{ n }}
    </div>
    <div :class="['e', 'f', 'g', 'h']">{{ 'Hello' }}</div>
  </div>
</template>

<script>
export default {
  props: ['n'],
}
</script>
