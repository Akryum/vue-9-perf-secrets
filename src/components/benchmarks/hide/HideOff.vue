<template functional>
  <div class="cell">
    <div v-if="props.value" class="on">
      <Heavy :n="10000"/>
    </div>
    <section v-else class="off">
      <Heavy :n="10000"/>
    </section>
  </div>
</template>
