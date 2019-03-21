<template functional>
  <div class="cell">
    <div v-show="props.value" class="on">
      <Heavy :n="10000"/>
    </div>
    <section v-show="!props.value" class="off">
      <Heavy :n="10000"/>
    </section>
  </div>
</template>
