<template>
  <Benchmark :title="`${itemCount} items`" optimized-label="RecycleScroller">
    <template #toolbar>
      <VueSwitch v-model="scrollVisible">
        View list
      </VueSwitch>
      <VueSwitch v-model="displayLoading">
        Loading animation
      </VueSwitch>
      <VueSwitch v-model="split">
        Time-slicing
      </VueSwitch>
      <VueInput
        type="number"
        v-model.number="splitCount"
        placeholder="Split count"
        title="Split count"
        class="split-count"
      />
      <VueSwitch v-model="optimize">
        Partial reactivity
      </VueSwitch>
      <VueInput
        type="number"
        v-model.number="count"
        placeholder="Item count"
        title="Item count"
        class="split-count"
      />
      <VueButton
        icon-left="sync"
        @click="generateItems(count)"
      >
        Generate items
      </VueButton>
      <VueButton
        class="accent"
        icon-left="cloud_download"
        @click="onClick()"
      >
        Fetch items
      </VueButton>
    </template>

    <VueLoadingIndicator
      v-if="loading && displayLoading"
      class="overlay fixed primary big"
    >
      Loading...
    </VueLoadingIndicator>

    <Particles v-if="!scrollVisible" class="particles"/>

    <template #on>
      <recycle-scroller
        v-if="!loading && scrollVisible"
        class="items"
        :items="items"
        :item-size="24"
      >
        <template v-slot="{ item }">
          <FetchItemViewNormal
            :item="item"
            @vote="voteItem(item)"
          />
        </template>
      </recycle-scroller>
    </template>

    <template #off>
      <div
        v-if="!loading && scrollVisible"
        class="items no-v"
      >
        <FetchItemViewFunctional
          v-for="item of items"
          :key="item.id"
          :item="item"
          @vote="voteItem(item)"
        />
      </div>
    </template>
  </Benchmark>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import FetchItemViewFunctional from './FetchItemViewFunctional.vue'
import FetchItemViewNormal from './FetchItemViewNormal.vue'
import Particles from './Particles.vue'

export default {
  components: {
    FetchItemViewFunctional,
    FetchItemViewNormal,
    Particles,
  },

  data () {
    return {
      count: 1000,
      splitCount: 1000,
      split: false,
      optimize: false,
      scrollVisible: false,
      vscroll: false,
      displayLoading: false,
    }
  },

  computed: {
    ...mapState([
      'loading',
      'items',
    ]),
    ...mapGetters([
      'itemCount',
    ]),
  },

  methods: {
    ...mapMutations([
      'voteItem',
    ]),
    ...mapActions([
      'generateItems',
      'fetchItems',
    ]),

    onClick () {
      this.fetchItems({
        count: this.count,
        split: this.split,
        splitCount: this.splitCount,
        optimize: this.optimize,
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
.split-count
  width 100px
  min-width 0

.items
  height calc(100vh - 119px)

  &.no-v
    overflow-x hidden
    overflow-y auto

.particles
  height 100%

.vue-ui-loading-indicator.overlay.fixed
  background rgba(black, .3)
</style>
