<template functional>
  <div class="cell">
    <div v-if="props.value" class="on"></div>
    <section v-else class="off"></section>
  </div>
</template>
