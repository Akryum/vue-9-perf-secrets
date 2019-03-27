import Vue from 'vue'
import Vuex from 'vuex'
import { generate } from './generate'
import { JobQueue, splitArray } from './utils'

let items = []

function optimizeItem (item) {
  const data = {
    id: uid++,
    vote: 0,
  }
  Object.defineProperty(data, 'data', {
    configurable: false,
    value: item,
  })
  return data
}

Vue.use(Vuex)

let uid = 0

const store = new Vuex.Store({
  state () {
    return {
      items: [],
      loading: false,
      progress: 0,
      generatedCount: 0,
    }
  },
  getters: {
    itemCount: state => state.items.length,
  },
  mutations: {
    clearItems (state) {
      state.items = []
    },
    addItems (state, items) {
      state.items.push(...items)
    },
    loading (state, value) {
      state.loading = value
    },
    progress (state, value) {
      state.progress = value
    },
    voteItem (state, item) {
      item.vote++
    },
    generatedCount (state, value) {
      state.generatedCount = value
    },
  },
  actions: {
    async generateItems ({ commit }, count) {
      items = await generate(count)
      commit('generatedCount', count)
    },

    commitItems ({ commit }, { splitCount, split, optimize }) {
      commit('clearItems')
      commit('loading', true)
      requestAnimationFrame(async resolve => {
        const data = JSON.parse(JSON.stringify(items)).map(
          item => optimize ? optimizeItem(item) : {
            id: uid++,
            data: item,
            vote: 0,
          }
        )
        const timeStart = performance.now()
        if (split) {
          const queue = new JobQueue()
          splitArray(data, splitCount).forEach(
            chunk => queue.addJob(done => requestAnimationFrame(() => {
              commit('addItems', chunk)
              done()
            }))
          )
          await queue.start()
        } else {
          commit('addItems', data)
        }
        const timeEnd = performance.now()
        console.log('time', Math.round(timeEnd - timeStart), 'ms', 'split', split, 'splitCount', splitCount, 'optimize', optimize)
        commit('loading', false)
      })
    },
  },
})

export default store
