import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/bench/static',
      name: 'bench-static',
      component: () => import(/* webpackChunkName: "bench-static" */ './components/benchmarks/static/Static.vue'),
    },
    {
      path: '/bench/child',
      name: 'bench-child',
      component: () => import(/* webpackChunkName: "bench-child" */ './components/benchmarks/child/Child.vue'),
    },
    {
      path: '/bench/local-var',
      name: 'bench-local-var',
      component: () => import(/* webpackChunkName: "bench-local-var" */ './components/benchmarks/local-var/LocalVar.vue'),
    },
    {
      path: '/bench/fetch-items',
      name: 'bench-fetch-items',
      component: () => import(/* webpackChunkName: "bench-fetch-items" */ './components/benchmarks/fetch-items/FetchItems.vue'),
    },
    {
      path: '/bench/deferred',
      name: 'bench-deferred',
      component: () => import(/* webpackChunkName: "bench-deferred" */ './components/benchmarks/deferred/Deferred.vue'),
    },
    {
      path: '/bench/hide',
      name: 'bench-hide',
      component: () => import(/* webpackChunkName: "bench-hide" */ './components/benchmarks/hide/Hide.vue'),
    },
    {
      path: '/bench/keep-alive',
      component: () => import(/* webpackChunkName: "bench-keep-alive" */ './components/benchmarks/keep-alive/KeepAlive.vue'),
      children: [
        {
          path: '',
          name: 'bench-keep-alive',
          component: () => import(/* webpackChunkName: "bench-keep-alive-simple" */ './components/benchmarks/deferred/SimplePage.vue'),
        },
        {
          path: 'heavy',
          name: 'bench-keep-alive-heavy',
          component: () => import(/* webpackChunkName: "bench-keep-alive-heavy" */ './components/benchmarks/deferred/DeferredOff.vue'),
        },
      ],
    },
    {
      path: '/bench/functional',
      name: 'bench-functional',
      component: () => import(/* webpackChunkName: "bench-functional" */ './components/benchmarks/functional/Functional.vue'),
    },
  ],
})
