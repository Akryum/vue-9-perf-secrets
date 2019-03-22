<template>
  <Benchmark title="Vuex demo" optimized-label="RecycleScroller">
    <template #title>
      <div><VueIcon icon="sync" class="medium"/> Generated items: <b>{{ generatedCount }}</b></div>
      <div><VueIcon icon="play_for_work" class="medium"/> Commited items: <b>{{ itemCount }}</b></div>
    </template>

    <template #toolbar>
      <VueDropdown placement="bottom-end">
        <VueButton
          slot="trigger"
          icon-left="settings"
          class="icon-button"
        />

        <div>
          <div class="dropdown-content vue-ui-grid col-2 default-gap">
            <div class="vue-ui-grid col-1 default-gap">
              <VueSwitch v-model="scrollVisible" class="extend-left">
                View list
              </VueSwitch>
              <VueSwitch v-model="displayLoading" class="extend-left">
                Loading animation
              </VueSwitch>
              <VueFormField
                title="Item count"
              >
                <VueInput
                  type="number"
                  v-model.number="count"
                  placeholder="Item count"
                  title="Item count"
                  class="split-count"
                />
              </VueFormField>
              <VueButton
                icon-left="sync"
                @click="onClickGenerate()"
              >
                Generate items
              </VueButton>
            </div>
            <div class="vue-ui-grid col-1 default-gap">
              <VueSwitch v-model="split" class="extend-left">
                Time-slicing
              </VueSwitch>
              <VueFormField
                title="Split count"
              >
                <VueInput
                  type="number"
                  v-model.number="splitCount"
                  placeholder="Split count"
                  title="Split count"
                  class="split-count"
                />
              </VueFormField>
              <VueSwitch v-model="optimize" class="extend-left">
                Partial reactivity
              </VueSwitch>
            </div>
          </div>
        </div>
      </VueDropdown>
      <VueButton
        :loading-secondary="loading"
        class="accent"
        icon-left="play_for_work"
        @click="onClickCommit()"
      >
        Commit items
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
        <template v-if="itemCount <= 1000">
          <FetchItemViewFunctional
            v-for="item of items"
            :key="item.id"
            :item="item"
            @vote="voteItem(item)"
          />
        </template>
        <div v-else class="disabled-list">
          Disabled to prevent crash
        </div>
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
      'generatedCount',
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
      'commitItems',
    ]),

    async onClickGenerate () {
      this.generateItems(this.count)
    },

    onClickCommit () {
      this.commitItems({
        split: this.split,
        splitCount: this.splitCount,
        optimize: this.optimize,
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
.items
  height calc(100vh - 119px)

  &.no-v
    overflow-x hidden
    overflow-y auto

.particles
  height 100%

.vue-ui-loading-indicator.overlay.fixed
  background rgba(black, .3)

.dropdown-content
  padding 12px
  .vue-ui-grid
    align-content start

.disabled-list
  height 100%
  display flex
  align-items center
  justify-content center
  color #e83030
  font-size 24px
</style>
